module.exports = {
  siteMetadata: {
    title: `Cameron Cabo`,
    description: `Driven learner, developer, and product builder`,
    author: `Cameron Cabo <cameroncabo@gmail.com>`,
    siteUrl: 'https://www.cameroncabo.com',
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `cameroncabo.com`,
        short_name: `cameroncabo.com`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#17718f`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown`,
        path: `${__dirname}/src/markdown`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1024,
            },
          },
        ],
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `json`,
        path: `${__dirname}/src/json`,
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-105075968-1',
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.edges.map(({ node: { frontmatter, html } }) =>
                Object.assign({}, frontmatter, {
                  description: frontmatter.subtitle,
                  date: frontmatter.createdAt,
                  url: site.siteMetadata.siteUrl + frontmatter.path,
                  guid: site.siteMetadata.siteUrl + frontmatter.path,
                  custom_elements: [{ 'content:encoded': html }],
                }),
              ),
            // TODO what is fields?
            query: `
              {
                allMarkdownRemark(
                  filter: { fileAbsolutePath: { regex: "/(markdown/thoughts)/" } }
                  sort: { order: DESC, fields: [frontmatter___createdAt] }
                ) {
                  edges {
                    node {
                      html
                      frontmatter {
                        title
                        createdAt
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
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: "Cameron Cabo's Thoughts",
          },
        ],
      },
    },
  ],
}
