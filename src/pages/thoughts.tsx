import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { H1, Masonry, Button, BR } from '../components/shared'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import ThoughtPreview from '../components/ThoughtPreview'
import { HOME_ROUTE } from '../constants/routes'

export default () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(markdown/thoughts)/" } }
        sort: { order: DESC, fields: [frontmatter___createdAt] }
      ) {
        edges {
          node {
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
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const { edges } = data.allMarkdownRemark
  return (
    <Layout>
      <SEO title="Thoughts" />

      <BR />
      <H1>Thoughts</H1>
      <Masonry>
        {edges.map(({ node: { frontmatter } }) => (
          <ThoughtPreview {...frontmatter} />
        ))}
      </Masonry>
      <Button to={HOME_ROUTE}>&larr; Back to home</Button>
    </Layout>
  )
}
