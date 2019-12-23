import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import { H2, Button } from '../shared'
import { PROJECTS_ROUTE } from '../../constants/routes'
import ProjectPreview from '../ProjectPreview'

export default () => (
  <StaticQuery
    query={graphql`
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
    `}
    render={data => {
      const { edges } = data.allMarkdownRemark
      return (
        <>
          <H2 mb4 mt4>
            Recent Projects
          </H2>
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
    }}
  />
)
