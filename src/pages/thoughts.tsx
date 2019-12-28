import React from 'react'
import { Card, H3, P, H1, Row, Col, Masonry, Tag } from '../components/shared'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { BLACK } from '../constants/colors'

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
      <H1>Thoughts</H1>
      <Masonry>
        {edges.map(
          ({
            node: {
              frontmatter: { title, path, subtitle, image, topics },
            },
          }) => (
            <Link
              to={path}
              style={{
                textDecoration: 'none',
                display: 'inline-block',
                width: '100%',
                cursor: 'pointer',
              }}
            >
              <Card
                key={title}
                fluid={image && image.childImageSharp.fluid}
                hoverable
              >
                <H3 mb2 style={{ color: BLACK }}>
                  {title}
                </H3>
                <P mb2 style={{ color: BLACK }} lighter>
                  {subtitle}
                </P>
                {topics &&
                  topics.map((t: string) => (
                    <Tag sm key={t}>
                      {t}
                    </Tag>
                  ))}
              </Card>
            </Link>
          ),
        )}
      </Masonry>
    </Layout>
  )
}
