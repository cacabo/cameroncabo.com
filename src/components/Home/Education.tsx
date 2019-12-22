import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { H2, InfoCard } from '../shared'

export default () => (
  <StaticQuery
    query={graphql`
      query EducationQuery {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/(education)/" } }
          sort: { order: ASC, fields: [frontmatter___order] }
        ) {
          edges {
            node {
              html
              frontmatter {
                start
                end
                title
                gpa
                image {
                  childImageSharp {
                    fluid(maxHeight: 96) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                  publicURL
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const { edges: edus } = data.allMarkdownRemark
      return (
        <>
          <H2 mb4 mt4>
            Education
          </H2>
          {edus.map(
            ({
              node: {
                html,
                frontmatter: { start, end, title, gpa, image },
              },
            }) => {
              const { childImageSharp, publicURL } = image
              const fluid =
                (childImageSharp && childImageSharp.fluid) || undefined
              return (
                <InfoCard
                  key={title}
                  title={title}
                  subtitle={`${start} - ${end} • ${gpa} GPA`}
                  fluidImage={fluid}
                  imageUrl={publicURL}
                  body={html}
                />
              )
            },
          )}
        </>
      )
    }}
  />
)
