import * as path from 'path'
import { GatsbyCreatePages } from './types'
import { IBook, IThought, IProject } from '../src/types'

// TODO add slug field to books which doesn't assume unique titles

const projectTemplate = path.resolve('./src/templates/ProjectTemplate.tsx')
const thoughtTemplate = path.resolve('./src/templates/ThoughtTemplate.tsx')
const bookTemplate = path.resolve('./src/templates/BookTemplate.tsx')

const getPrev = (arr: any[], idx: number): any =>
  idx === 0 ? undefined : arr[idx - 1]
const getNext = (arr: any[], idx: number): any =>
  idx === arr.length - 1 ? undefined : arr[idx + 1]

interface ICreatePagesData {
  data: {
    allThoughtsMarkdown: {
      nodes: IThought[]
    }
    allProjectsMarkdown: {
      nodes: IProject[]
    }
    allBooksJson: {
      nodes: IBook[]
    }
  }
  errors: any
}

export const createPages: GatsbyCreatePages = async ({
  actions,
  graphql,
  reporter,
}) => {
  const { createPage } = actions

  // NOTE this has duplicate graphql code: https://github.com/gatsbyjs/gatsby/issues/12155
  const {
    data: {
      allThoughtsMarkdown: { nodes: thoughtNodes },
      allProjectsMarkdown: { nodes: projectNodes },
      allBooksJson: { nodes: bookNodes },
    },
    errors,
  }: ICreatePagesData = await graphql(`
    fragment PartialThought on MarkdownRemark {
      timeToRead
      frontmatter {
        title
        createdAt(fromNow: true)
        updatedAt(fromNow: true)
        path
        topics
        subtitle
        image {
          childImageSharp {
            fluid(maxWidth: 848) {
              base64
              aspectRatio
              src
              srcSet
              sizes
            }
          }
        }
      }
    }

    fragment PartialProject on MarkdownRemark {
      frontmatter {
        title
        description
        path
        tags
        technologies
        color
        image {
          childImageSharp {
            fluid(maxWidth: 720) {
              base64
              aspectRatio
              src
              srcSet
              sizes
            }
          }
        }
      }
    }

    query {
      allThoughtsMarkdown: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(markdown/thoughts)/" } }
        sort: { order: DESC, fields: [frontmatter___createdAt] }
      ) {
        nodes {
          ...PartialThought
        }
      }
      allProjectsMarkdown: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(markdown/projects)/" } }
        sort: { order: DESC, fields: [frontmatter___order] }
      ) {
        nodes {
          ...PartialProject
        }
      }
      allBooksJson {
        nodes {
          id
          slug
        }
      }
    }
  `)

  if (errors) {
    reporter.panicOnBuild('Error while running createPages GraphQL query.')
    return
  }

  thoughtNodes.forEach(({ frontmatter }, idx) => {
    const { path: pagePath } = frontmatter
    if (!pagePath) return

    const prev = getPrev(thoughtNodes, idx)
    const next = getNext(thoughtNodes, idx)

    createPage({
      path: pagePath,
      component: thoughtTemplate,
      context: { prev, next },
    })
  })

  projectNodes.forEach(({ frontmatter }, idx) => {
    const { path: pagePath } = frontmatter
    if (!pagePath) return

    const prev = getPrev(projectNodes, idx)
    const next = getNext(projectNodes, idx)

    createPage({
      path: pagePath,
      component: projectTemplate,
      context: { prev, next },
    })
  })

  bookNodes.forEach(({ id, slug }) => {
    const bookPath = `/books/${slug}`

    createPage({
      path: bookPath,
      component: bookTemplate,
      context: { id },
    })
  })
}
