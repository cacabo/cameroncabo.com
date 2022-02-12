import { Client } from '@notionhq/client'
import { IBook } from '../src/types'
import { Environment } from './utils/environment'
import puppeteer from 'puppeteer'
import { writeJsonFileAsync } from './utils/writeJSONFileAsync'

// TODO parse, link to, and fetch sub-pages (recursively)

/**
 * Replace any of
 *
 * "http://www.notion.so"
 * "https://www.notion.so"
 * "http://.notion.so"
 * "https://.notion.so"
 * "notion.so"
 * "www.notion.so"
 *
 * With the Notion site URL from the environment
 */
const reviseNotionURL = (url: string): string =>
  url.replace(
    /(https?:\/\/)?(www\.)?notion\.so/,
    Environment.notionSiteBaseURL(),
  )

/**
 * Fetch via the URL directly
 *
 * If you fetch via the page ID, if you are logged in, Notion will re-direct
 * you, but if you are not logged in (as is the case with puppeteer) you are
 * shown a button to click to redirect (@cacabo 2022.02.12)
 */
const fetchNotionPageContentsByURL = async (url: string): Promise<string> => {
  // eslint-disable-next-line no-console
  console.log(`Sending request to ${url}...`)

  process.setMaxListeners(0)
  const browser = await puppeteer.launch()

  const page = await browser.newPage()
  await page.goto(url)
  await page.waitForSelector('#notion-app .notion-page-content', {
    timeout: 1000 * 10,
  })

  const result = await page.evaluate(evaluatePageHandler)
  browser.close()

  const { error, content } = result

  if (error != null || content == null) {
    throw new Error(error)
  }

  return content
}

/**
 * Helper functions
 */

const ringBell = (): void => {
  const BELL_CHAR = '\u0007'

  // eslint-disable-next-line no-console
  console.log(BELL_CHAR)
}

/**
 * To be executed by Puppeteer within the headless browser
 */
const evaluatePageHandler = ():
  | Readonly<{ content: string; error?: undefined }>
  | Readonly<{ content?: undefined; error: string }> => {
  const ATTRS_TO_REMOVE = [
    'contenteditable',
    'spellcheck',
    'data-content-editable-leaf',
    'data-content-editable-void',
    // 'placeholder',
    'data-content-editable',
  ]

  /**
   * Remove a subset of styles that Notion applies to elements that we do not
   * want applied in the website
   */
  const sanitizeStyles = (elt: HTMLElement): void => {
    // Customize styling for headings via CSS classes
    // Notion uses the "placeholder" attribute to store what kind of block this
    // is. The HTML element type is always a "div". Regardless of the block
    // type. For example, for what on a normal web page would be an <h3> tag,
    // Notion sets the "placeholder" to be "Heading 3"
    // In this case, we want to add the class "h3"
    const placeholder = elt.getAttribute('placeholder')
    if (placeholder?.startsWith('Heading')) {
      const type = placeholder.split(' ')[1]
      elt.classList.add(`h${type}`)
    }

    ATTRS_TO_REMOVE.forEach((attr): void => elt.removeAttribute(attr))

    const styles = elt.style
    if (!styles) return

    styles.removeProperty('line-height')
    styles.removeProperty('max-width')
    if (styles.whiteSpace != null && styles.whiteSpace !== 'normal') {
      styles.whiteSpace = 'normal'
    }
    if (styles.fontFamily) {
      styles.fontFamily = 'inherit'
    }
    styles.removeProperty('font-size')
  }

  // const node = document.querySelector('#notion-app .notion-page-content')
  const node = document.querySelector('#notion-app .notion-page-content')

  if (node == null) {
    return { error: 'Failed to find node' }
  }

  const elts = (Array.from(
    document.querySelectorAll('*'),
  ) as unknown) as Array<HTMLElement>

  elts.forEach(sanitizeStyles)

  const content = node?.innerHTML ?? ''

  if (!content) {
    return { error: 'Failed to find inner HTML for node' }
  }

  return { content }
}

type IBookWithoutHTMLAndSlug = Omit<IBook, 'html' | 'slug'>

// TODO slug

enum BooksDatabaseProperty {
  END_DATE = 'End Date',
  START_DATE = 'Start Date',
  RATING = 'Rating',
  TAGS = 'Tags',
  FORMAT = 'Format',
  LINK = 'Link',
  AUTHOR = 'Author',
  SUBTITLE = 'Subtitle',
  ORIGINALLY_PUBLISHED = 'Originally Published',
  TITLE = 'Title',
}

const notion = new Client({ auth: Environment.notionAPISecret() })

type INotionDBProperty = {
  id: string
  type: string
} & Record<string, any>

const isString = (value: any): value is string => typeof value === 'string'
const isNumber = (value: any): value is number => typeof value === 'number'

const parseProperty = (
  property: INotionDBProperty,
): string | string[] | number | null => {
  if (typeof property !== 'object') {
    throw new Error(`Expected property to be an object but got ${property}`)
  }

  const type = property.type

  if (type == null) {
    throw new Error(
      `Expected propert to have type, but found none in ${property}`,
    )
  }

  if (type === 'title') {
    // eslint-disable-next-line camelcase
    const title = property.title[0].plain_text
    if (!isString(title)) {
      throw new Error(`Failed to parse title from property ${property}`)
    }
    return title
  }

  if (type === 'url') {
    const url = property.url
    if (url == null) {
      return null
    }

    if (!isString(url)) {
      throw new Error(`Expected URL to be a string but got ${url}`)
    }
    return url
  }

  if (type === 'number') {
    const num = property.number
    if (num == null) {
      return null
    }

    if (!isNumber(num)) {
      throw new Error(`Expected number to be a number but got ${num}`)
    }
    return num
  }

  if (type === 'rich_text') {
    // eslint-disable-next-line camelcase
    const richText = property.rich_text[0]?.plain_text

    if (richText == null) {
      return null
    }

    if (!isString(richText)) {
      throw new Error(`Failed to parse rich_text from property ${property}`)
    }
    return richText
  }

  if (type === 'date') {
    const dateString = property.date?.start
    if (dateString == null) {
      return null
    }

    if (!isString(dateString)) {
      throw new Error(`Failed to parse date from property ${property}`)
    }

    if (/\d{4}-\d{2}-\d{2}/.exec(dateString) == null) {
      throw new Error(
        `Date string "${dateString}" does not match expected yyyy-MM-dd format`,
      )
    }
    // ISO-formatted string
    return dateString
  }

  if (type === 'multi_select') {
    const rawMultiSelectValues = property.multi_select

    if (!Array.isArray(rawMultiSelectValues)) {
      throw new Error(
        `Expected muti_select to be an array, but got ${rawMultiSelectValues}`,
      )
    }

    const mutliSelectValues = rawMultiSelectValues as Readonly<
      Array<{
        id: string
        name: string
        color: string
      }>
    >

    return mutliSelectValues.map((x): string => x.name)
  }

  throw new Error(`Unhandled type "${type}" for property ${property}`)
}

class PropertyParser {
  private properties: Record<BooksDatabaseProperty, INotionDBProperty>

  constructor(properties: Record<BooksDatabaseProperty, INotionDBProperty>) {
    this.properties = properties
  }

  public parse(
    propertyName: BooksDatabaseProperty,
  ): string | string[] | number | null {
    const property: INotionDBProperty = this.properties[propertyName]

    if (property == null) {
      throw new Error(
        `Failed to find property ${propertyName} in ${this.properties}`,
      )
    }

    return parseProperty(property)
  }
}

const parseBookProperties = ({
  id,
  properties,
  url,
}: {
  id: string
  url: string
  properties: Record<BooksDatabaseProperty, INotionDBProperty>
}): IBookWithoutHTMLAndSlug => {
  const parser = new PropertyParser(properties)

  return {
    id,
    notionURL: reviseNotionURL(url),
    title: parser.parse(BooksDatabaseProperty.TITLE) as string,
    subtitle: parser.parse(BooksDatabaseProperty.SUBTITLE) as string,
    author: parser.parse(BooksDatabaseProperty.AUTHOR) as string,
    originallyPublished: parser.parse(
      BooksDatabaseProperty.ORIGINALLY_PUBLISHED,
    ) as string,
    tags: parser.parse(BooksDatabaseProperty.TAGS) as string[],
    startDate: parser.parse(BooksDatabaseProperty.START_DATE) as string,
    endDate: parser.parse(BooksDatabaseProperty.END_DATE) as string,
    link: parser.parse(BooksDatabaseProperty.LINK) as string,
    rating: parser.parse(BooksDatabaseProperty.RATING) as number,
  }
}

const fetchBooksDatabase = async (): Promise<IBookWithoutHTMLAndSlug[]> => {
  const res = await notion.databases.query({
    // eslint-disable-next-line camelcase
    database_id: Environment.notionBooksDatabaseID(),
    sorts: [
      {
        property: BooksDatabaseProperty.END_DATE,
        direction: 'ascending',
      },
      {
        property: BooksDatabaseProperty.START_DATE,
        direction: 'descending',
      },
    ],
  })

  if (res.object !== 'list') {
    throw new Error(
      'Error fetching books database: response object is not a list',
    )
  }

  if (res.has_more) {
    throw new Error(
      'has_more is not false, which is not currently supported by this script',
    )
  }

  return (
    res.results
      .map(
        (row): IBookWithoutHTMLAndSlug => {
          if (row.object !== 'page') {
            throw new Error('Object within books database is not a page')
          }

          const properties = (row as any).properties as Record<
            BooksDatabaseProperty,
            INotionDBProperty
          >

          const url = (row as any).url

          if (!isString(url)) {
            throw new Error(`Failed to find URL for row ${row}`)
          }

          return parseBookProperties({ id: row.id, url, properties })
        },
      )
      // Filter to rows with non-empty titles
      .filter((book): boolean => Boolean(book.title))
  )
}

const main = async (): Promise<void> => {
  // eslint-disable-next-line no-console
  console.log('Sourcing data from Notion!\n')

  // eslint-disable-next-line no-console
  console.log('Fetching database of books...')

  const res = await fetchBooksDatabase()

  if (res.length === 0) {
    throw new Error('Failed to find any books!')
  }

  // eslint-disable-next-line no-console
  console.log('Fetching data for each book...')

  // TODO put everything together

  const url = reviseNotionURL(
    'https://www.notion.so/ccabo/Why-We-Sleep-5b06b5f8305948699f940f9ce7534ea2',
  )

  const contents = await fetchNotionPageContentsByURL(url)

  // eslint-disable-next-line no-console
  console.log(contents)

  // eslint-disable-next-line no-console
  console.log('✨ Done!')
  ringBell()
}

main()
