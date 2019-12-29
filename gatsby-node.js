const path = require('path')

const getPrev = (arr, idx) => (idx === 0 ? arr[arr.length - 1] : arr[idx - 1])
const getNext = (arr, idx) => (idx === arr.length - 1 ? arr[0] : arr[idx + 1])

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const projectTemplate = path.resolve(`src/templates/ProjectTemplate.tsx`)
  const thoughtTemplate = path.resolve(`src/templates/ThoughtTemplate.tsx`)

  // NOTE this has duplicate code: https://github.com/gatsbyjs/gatsby/issues/12155
  const thoughts = await graphql(`
    fragment PartialThought on MarkdownRemark {
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
        edges {
          node {
            ...PartialThought
          }
        }
      }
    }
  `)

  const projects = await graphql(`
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
        edges {
          node {
            ...PartialProject
          }
        }
      }
    }
  `)

  // Handle errors
  if (thoughts.errors) {
    reporter.panicOnBuild('Error while running thoughts GraphQL query.')
    return
  } else if (projects.errors) {
    reporter.panicOnBuild('Error while running projects GraphQL query.')
    return
  }

  const { edges: thoughtsEdges } = thoughts.data.allMarkdownRemark
  thoughtsEdges.forEach(({ node }, idx) => {
    const { frontmatter } = node
    const { path: pagePath } = frontmatter
    if (!pagePath) return

    const prev = getPrev(thoughtsEdges, idx)
    const next = getNext(thoughtsEdges, idx)

    createPage({
      path: pagePath,
      component: thoughtTemplate,
      context: { prev, next },
    })
  })

  const { edges: projectEdges } = projects.data.allMarkdownRemark
  projectEdges.forEach(({ node }, idx) => {
    const { frontmatter } = node
    const { path: pagePath } = frontmatter
    if (!pagePath) return

    const prev = getPrev(projectEdges, idx)
    const next = getNext(projectEdges, idx)

    createPage({
      path: pagePath,
      component: projectTemplate,
      context: { prev, next },
    })
  })
}
