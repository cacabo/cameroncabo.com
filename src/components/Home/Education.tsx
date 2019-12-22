import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { H2, InfoCard } from '../shared'

export default () => (
  <StaticQuery
    query={graphql`
      query EducationQuery {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/(education)/" } }
          sort: { order: DESC, fields: [frontmatter___start] }
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
          <H2>Education</H2>
          {edus.map(
            ({
              node: {
                html,
                frontmatter: {
                  start,
                  end,
                  title,
                  gpa,
                  image: {
                    childImageSharp: { fluid },
                  },
                },
              },
            }) => (
              <InfoCard
                key={title}
                title={title}
                subtitle={`${start} - ${end} • ${gpa} GPA`}
                fluidImage={fluid}
                body={html}
              />
            ),
          )}
        </>
      )
    }}
  />
)
