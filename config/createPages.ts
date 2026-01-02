import * as path from 'path'
import { GatsbyCreatePages } from './types'
import { IBook, IThought, IProject } from '../src/types'

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
    query {
      allThoughtsMarkdown: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(markdown/thoughts)/" } }
        sort: { frontmatter: { createdAt: DESC } }
      ) {
        nodes {
          timeToRead
          frontmatter {
            title
            createdAt(formatString: "MMM D, YYYY")
            updatedAt(formatString: "MMM D, YYYY")
            path
            topics
            subtitle
            image {
              childImageSharp {
                gatsbyImageData(width: 848)
              }
            }
          }
        }
      }
      allProjectsMarkdown: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(markdown/projects)/" } }
        sort: { frontmatter: { order: DESC } }
      ) {
        nodes {
          frontmatter {
            title
            description
            path
            tags
            technologies
            color
            image {
              childImageSharp {
                gatsbyImageData(width: 720)
              }
            }
          }
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
      context: { pagePath, prev, next },
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
      context: { pagePath, prev, next },
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
