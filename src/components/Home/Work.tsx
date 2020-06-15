import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { InfoCard, Button } from '../shared'
import { RESUME_ROUTE } from '../../constants/routes'
import { IWorkFrontmatter } from '../../types'

interface IWorkNode {
  frontmatter: IWorkFrontmatter
  html: string
}

export const Work = (): React.ReactElement => {
  const data = useStaticQuery(
    graphql`
      query WorkQuery {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/(work/)/" } }
          sort: { order: ASC, fields: [frontmatter___order] }
        ) {
          nodes {
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
    `,
  )

  const { nodes } = data.allMarkdownRemark

  return (
    <>
      {(nodes as IWorkNode[]).map(
        ({
          html,
          frontmatter: { company, title, location, start, end, image },
        }) => {
          const { childImageSharp, publicURL } = image || {}
          const fluid = (childImageSharp && childImageSharp.fluid) || undefined
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
}
