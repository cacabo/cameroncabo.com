import Notion from 'get-notion-contents'
import { JSDOM } from 'jsdom'
import moment = require('moment')
import fs = require('fs')
import { IBook } from '../src/types'

type NotionID = string
type RawTableRow = Record<string, string | string[]> & { id: NotionID }
type TableRow = Record<string, string | string[] | number> & { id: NotionID }
type ColType = 'String' | 'String[]' | 'Number' | 'Date'
type TableRowInterface = Record<string, ColType>

// TODO document better

const BELL = '\u0007'
const BOOKS_NOTION_ID: NotionID = '92ece565f3fb4c78ac32c7e9af7fc281'

// This is the same as you would get in the browser, but we need to mimic it
// since we are in a node context here
const Node = {
  TEXT_NODE: 3,
  ELEMENT_NODE: 1,
  DOCUMENT_NODE: 9,
  DOCUMENT_FRAGMENT_NODE: 11,
}

const writeJsonFile = (name: string, obj: object): Promise<void> =>
  new Promise((resolve, reject) => {
    fs.writeFile(
      `./src/json/${name}/${name}.json`,
      JSON.stringify(obj),
      (err): void => {
        if (err) {
          return reject(err)
        }

        return resolve()
      },
    )
  })

const getTextNodesIn = (elem: Element | ChildNode): string[] => {
  let textNodes: string[] = []

  if (elem) {
    const { childNodes } = elem
    childNodes.forEach((node): void => {
      const { nodeType } = node

      if (nodeType === Node.TEXT_NODE) {
        const text = (node.textContent || '').trim()
        if (text) {
          textNodes.push(text)
        }
      } else if (
        nodeType === Node.ELEMENT_NODE ||
        nodeType === Node.DOCUMENT_NODE ||
        nodeType === Node.DOCUMENT_FRAGMENT_NODE
      ) {
        textNodes = textNodes.concat(getTextNodesIn(node))
      }
    })
  }

  return textNodes
}

const getPageHTML = async (notionPageID: NotionID): Promise<string> => {
  const notion = new Notion('', {
    prefix: '',
    removeStyle: false,
  })

  const page = await notion.getPageById(notionPageID)
  const html: string = page.content
  const { document } = new JSDOM(html).window
  const elts = (Array.from(document.querySelectorAll('*')) as unknown) as Array<
    HTMLElement
  >
  elts.forEach((elt): void => {
    if (!elt.style) {
      return
    }
    if (elt.style.maxWidth) {
      elt.style.maxWidth = 'none'
    }
    if (elt.style.whiteSpace !== 'nowrap') {
      elt.style.whiteSpace = 'nowrap'
    }
    if (elt.style.fontFamily) {
      elt.style.fontFamily = 'inherit'
    }
  })

  return document.body.innerHTML
}

const getColNames = (document: Document): string[] => {
  const colnames: string[] = []

  const headers = document.querySelectorAll('.notion-table-view-header-cell')
  headers.forEach((elt): void => {
    const colname = elt.textContent || ''
    colnames.push(colname)
  })

  const camelCaseColNames = colnames.map((name): string =>
    name
      .toLowerCase()
      .split(' ')
      .map((word, idx) => {
        if (idx === 0) {
          return word
        }
        return word.substring(0, 1).toUpperCase() + word.substring(1)
      })
      .join('')
      .replace(/\s/g, ''),
  )

  return camelCaseColNames
}

const getRawTableContents = async (
  notionPageID: NotionID,
): Promise<RawTableRow[]> => {
  const notion = new Notion('', {
    prefix: '',
    removeStyle: true,
  })

  const page = await notion.getPageById(notionPageID)
  const resource: string = page.resource as string
  const { document } = new JSDOM(resource).window
  const colNames = getColNames(document)
  const objList: RawTableRow[] = []

  const items = document.querySelectorAll('.notion-collection-item')
  items.forEach((item): void => {
    const id = item.getAttribute('data-block-id')
    if (!id) {
      throw Error('Missing ID')
    }

    const { childNodes } = item
    const coltexts: string[][] = []
    childNodes.forEach((childNode): void => {
      const textNodes: string[] = getTextNodesIn(childNode)
      coltexts.push(textNodes)
    })

    const obj: RawTableRow = { id }
    colNames.forEach((colName, idx): void => {
      const text: string[] = coltexts[idx] || []
      obj[colName] = text
    })

    objList.push(obj)
  })

  return objList
}

const getTableContents = (
  rawTableContents: RawTableRow[],
  rowInterface: TableRowInterface,
): TableRow[] =>
  rawTableContents.map(
    (tableEntry): TableRow => {
      const obj: Record<string, any> = {}
      Object.keys(tableEntry).forEach((key): void => {
        const data: string | string[] = tableEntry[key]
        const type: ColType = rowInterface[key] || 'String'

        if (type === 'String[]') {
          if (Array.isArray(data)) {
            obj[key] = data
          } else {
            obj[key] = [data]
          }
        } else if (type === 'String') {
          if (Array.isArray(data)) {
            obj[key] = data.join(', ')
          } else {
            obj[key] = data
          }
        } else if (type === 'Number') {
          const dataStr: string = Array.isArray(data) ? data.join('') : data
          obj[key] = Number.parseFloat(dataStr)
        } else if (type === 'Date') {
          try {
            const dataStr: string = Array.isArray(data) ? data.join('') : data
            const momentObj = moment(dataStr, 'MMM DD, YYYY')
            obj[key] = momentObj.toDate().toISOString()
          } catch (e) {
            obj[key] = undefined
          }
        }
      })
      return obj as TableRow
    },
  )

const bookRowInterface: TableRowInterface = {
  id: 'String',
  title: 'String',
  subtitle: 'String',
  author: 'String',
  originallyPublished: 'Date',
  tags: 'String[]',
  startDate: 'Date',
  endDate: 'Date',
  link: 'String',
  rating: 'Number',
}

// eslint-disable-next-line no-console
console.log('Sourcing data from Notion...')

// eslint-disable-next-line no-console
console.log('Fetching books...')

getRawTableContents(BOOKS_NOTION_ID).then(
  async (rawTableContents): Promise<void> => {
    const books: IBook[] = ((getTableContents(
      rawTableContents,
      bookRowInterface,
    ) as unknown) as IBook[]).filter(({ title }) => Boolean(title))

    // eslint-disable-next-line no-console
    console.log('Fetching notes for each book...')

    const htmlPromises: Promise<string>[] = books.map(
      async (book): Promise<string> => {
        const html = await getPageHTML(book.id)
        return html
      },
    )

    const htmls: string[] = await Promise.all(htmlPromises)
    htmls.forEach((html, idx) => {
      books[idx].html = html
    })

    writeJsonFile('books', books)

    // eslint-disable-next-line no-console
    console.log('Done.')

    // eslint-disable-next-line no-console
    console.log(BELL)
  },
)
