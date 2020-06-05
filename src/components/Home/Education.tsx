import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { H3, InfoCard, HR } from '../shared'
import { FluidObject } from 'gatsby-image'

interface IEducationNode {
  html: string
  frontmatter: {
    start: string
    end: string
    title: string
    gpa: number
    location: string
    image: {
      childImageSharp: {
        fluid: FluidObject
      }
      publicURL?: string
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
        nodes {
          html
          frontmatter {
            start
            end
            title
            gpa
            location
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
  `)

  const { nodes } = data.allMarkdownRemark
  return (
    <>
      <H3 mb4 mt4>
        Education
      </H3>
      <HR />
      {(nodes as IEducationNode[]).map(
        ({
          html,
          frontmatter: { start, end, title, gpa, image, location },
        }) => {
          const { childImageSharp, publicURL } = image || {}
          const fluid = (childImageSharp && childImageSharp.fluid) || undefined

          // Allow certain fields to be missing
          const subtitle = [
            start && end && `${start} - ${end}`,
            location,
            gpa && `${gpa} GPA`,
          ]
            .filter(Boolean)
            .join(' • ')

          return (
            <InfoCard
              key={title}
              title={title}
              subtitle={subtitle}
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
