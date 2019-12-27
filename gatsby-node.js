const path = require('path')

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const projectTemplate = path.resolve(`src/templates/ProjectTemplate.tsx`)
  const thoughtTemplate = path.resolve(`src/templates/ThoughtTemplate.tsx`)
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___order] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const { frontmatter } = node
    const { path: mdPath } = frontmatter
    if (!mdPath) return

    let template = thoughtTemplate
    if (mdPath.startsWith('/projects/')) {
      template = projectTemplate
    }

    createPage({
      path: mdPath,
      component: template,
      context: {}, // additional data can be passed via context
    })
  })
}
