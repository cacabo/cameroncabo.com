import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { H3, InfoCard } from '../shared'
import { FluidObject } from 'gatsby-image'

interface IEducationNode {
  node: {
    html: string
    frontmatter: {
      start: string
      end: string
      title: string
      gpa: number
      image: {
        childImageSharp: {
          fluid: FluidObject
        }
        publicURL?: string
      }
    }
  }
}

export const Education = (): React.ReactElement => {
  const data = useStaticQuery(graphql`
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
  `)

  const edges = data.allMarkdownRemark.edges as IEducationNode[]
  return (
    <>
      <H3 mb4 mt4>
        Education
      </H3>
      {edges.map(
        ({
          node: {
            html,
            frontmatter: { start, end, title, gpa, image },
          },
        }) => {
          const { childImageSharp, publicURL } = image
          const fluid = (childImageSharp && childImageSharp.fluid) || undefined
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
}
