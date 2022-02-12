import { Client } from '@notionhq/client'
import { IBook } from '../src/types'
import { Environment } from './utils/environment'

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

const parseBookProperties = (
  id: string,
  properties: Record<BooksDatabaseProperty, INotionDBProperty>,
): IBookWithoutHTMLAndSlug => {
  const parser = new PropertyParser(properties)

  return {
    id,
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

          return parseBookProperties(row.id, properties)
        },
      )
      // Filter to rows with non-empty titles
      .filter((book): boolean => Boolean(book.title))
  )
}

const main = async (): Promise<void> => {
  const res = await fetchBooksDatabase()

  if (res.length === 0) {
    throw new Error('Failed to find any books!')
  }

  // eslint-disable-next-line no-console
  console.log(res)
}

main()
