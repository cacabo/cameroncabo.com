import { GatsbyCreateSchemaCustomization } from './types'
import { IBook } from '../src/types'

export const createSchemaCustomization: GatsbyCreateSchemaCustomization = ({
  actions,
}) => {
  const { createFieldExtension, createTypes } = actions

  createFieldExtension({
    name: 'slug',
    extend: () => ({
      resolve: (source: IBook): string => {
        const { title } = source
        const slug = title.trim().toLowerCase().split(' ').join('-')
        return slug
      },
    }),
  })

  createTypes(`
    type BooksJson implements Node {
      slug: String @slug
    }
  `)
}
