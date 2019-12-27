import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import { H3, Button } from '../shared'
import { PROJECTS_ROUTE } from '../../constants/routes'
import ProjectPreview from '../ProjectPreview'

export default () => {
  const data = useStaticQuery(
    graphql`
      query ProjectsQuery {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/(markdown/projects)/" } }
          sort: { order: ASC, fields: [frontmatter___order] }
          limit: 2
        ) {
          edges {
            node {
              html
              frontmatter {
                title
                description
                path
                technologies
                color
                image {
                  childImageSharp {
                    fluid(maxWidth: 484) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
  )

  const { edges } = data.allMarkdownRemark
  return (
    <>
      <H3 mb4 mt4>
        Recent Projects
      </H3>
      {edges.map(({ node: { frontmatter } }) => {
        const {
          title,
          image: {
            childImageSharp: { fluid },
          },
        } = frontmatter
        return <ProjectPreview key={title} fluid={fluid} {...frontmatter} />
      })}
      <Button to={PROJECTS_ROUTE}>View all projects &rarr;</Button>
    </>
  )
}
