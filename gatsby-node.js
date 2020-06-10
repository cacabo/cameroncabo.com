const path = require('path')

// TODO use typescript here
// TODO add slug field to books

const projectTemplate = path.resolve(`src/templates/ProjectTemplate.tsx`)
const thoughtTemplate = path.resolve(`src/templates/ThoughtTemplate.tsx`)
const bookTemplate = path.resolve(`src/templates/BookTemplate.tsx`)

const getPrev = (arr, idx) => (idx === 0 ? undefined : arr[idx - 1])
const getNext = (arr, idx) =>
  idx === arr.length - 1 ? undefined : arr[idx + 1]

exports.createSchemaCustomization = ({ actions }) => {
  const { createFieldExtension, createTypes } = actions

  createFieldExtension({
    name: 'slug',
    extend: () => ({
      resolve: (source) => {
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

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  // NOTE this has duplicate code: https://github.com/gatsbyjs/gatsby/issues/12155
  const {
    data: {
      allMarkdownRemark: { nodes: thoughtNodes },
    },
    errors: thoughtErrors,
  } = await graphql(`
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

    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(markdown/thoughts)/" } }
        sort: { order: DESC, fields: [frontmatter___createdAt] }
      ) {
        nodes {
          ...PartialThought
        }
      }
    }
  `)

  const {
    data: {
      allMarkdownRemark: { nodes: projectNodes },
    },
    errors: projectErrors,
  } = await graphql(`
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
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(markdown/projects)/" } }
        sort: { order: DESC, fields: [frontmatter___order] }
      ) {
        nodes {
          ...PartialProject
        }
      }
    }
  `)

  const {
    data: {
      allBooksJson: { nodes: bookNodes },
      errors: bookErrors,
    },
  } = await graphql(`
    query {
      allBooksJson {
        nodes {
          id
          slug
        }
      }
    }
  `)

  if (thoughtErrors) {
    reporter.panicOnBuild('Error while running thoughts GraphQL query.')
    return
  } else if (projectErrors) {
    reporter.panicOnBuild('Error while running projects GraphQL query.')
    return
  } else if (bookErrors) {
    reporter.panicOnBuild('Error while running books GraphQL query.')
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
    const path = `/books/${slug}`

    createPage({
      path,
      component: bookTemplate,
      context: { id },
    })
  })
}
