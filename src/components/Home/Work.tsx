import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { H2, InfoCard, Button } from '../shared'
import { RESUME_ROUTE } from '../../constants/routes'

export default () => (
  <StaticQuery
    query={graphql`
      query WorkQuery {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/(work)/" } }
          sort: { order: ASC, fields: [frontmatter___order] }
        ) {
          edges {
            node {
              html
              frontmatter {
                company
                title
                location
                start
                end
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
      const { edges: work } = data.allMarkdownRemark
      return (
        <>
          <H2 mb4 mt4>
            Work
          </H2>
          {work.map(
            ({
              node: {
                html,
                frontmatter: { company, title, location, start, end, image },
              },
            }) => {
              const { childImageSharp, publicURL } = image
              const fluid =
                (childImageSharp && childImageSharp.fluid) || undefined
              return (
                <InfoCard
                  key={`${title}-${company}`}
                  title={`${title}, ${company}`}
                  subtitle={`${start} - ${end} • ${location}`}
                  fluidImage={fluid}
                  imageUrl={publicURL}
                  body={html}
                />
              )
            },
          )}
          <Button as="a" href={RESUME_ROUTE} target="_BLANK">
            View my resume &rarr;
          </Button>
        </>
      )
    }}
  />
)
