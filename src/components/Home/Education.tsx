import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import { InfoCard } from '../shared'

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
        gatsbyImageData: IGatsbyImageData
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
        sort: { frontmatter: { order: ASC } }
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
                gatsbyImageData(height: 96)
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
      {(nodes as IEducationNode[]).map(
        ({ html, frontmatter: { start, end, title, gpa, image, location } }) => {
          const gatsbyImageData = image?.childImageSharp?.gatsbyImageData

          // Allow certain fields to be missing
          const subtitle = [start && end && `${start} - ${end}`, location, gpa && `${gpa} GPA`]
            .filter(Boolean)
            .join(' • ')

          return (
            <InfoCard
              key={title}
              title={title}
              subtitle={subtitle}
              fluidImage={gatsbyImageData}
              body={html}
            />
          )
        },
      )}
    </>
  )
}
