import React from 'react'
import { H3, Button, Row, Col } from '../shared'
import { THOUGHTS_ROUTE } from '../../constants/routes'
import { useStaticQuery, graphql } from 'gatsby'
import ThoughtPreview from '../ThoughtPreview'
import { MARGIN } from '../../constants/measurements'

export default () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(markdown/thoughts)/" } }
        sort: { order: DESC, fields: [frontmatter___createdAt] }
        limit: 2
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
    <div>
      <H3 mt4 mb4>
        Recent Thoughts
      </H3>
      <Row margin={MARGIN}>
        {edges.map(({ node: { frontmatter } }) => (
          <Col sm={12} md={6} margin={MARGIN}>
            <ThoughtPreview {...frontmatter} />
          </Col>
        ))}
      </Row>
      <Button to={THOUGHTS_ROUTE}>View thoughts &rarr;</Button>
    </div>
  )
}
