const path = require('path')

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/ProjectTemplate.tsx`)
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

    createPage({
      path: mdPath,
      component: blogPostTemplate,
      context: {}, // additional data can be passed via context
    })
  })
}
