import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import { H1, Button, HR } from './shared'
import { HOME_ROUTE } from '../constants/routes'
import ProjectPreview from './ProjectPreview'

export default () => (
  <StaticQuery
    query={graphql`
      query RecentProjectsQuery {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/(markdown/projects)/" } }
          sort: { order: ASC, fields: [frontmatter___order] }
        ) {
          edges {
            node {
              html
              frontmatter {
                title
                description
                path
                technologies
                start
                end
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
          <H1>Projects</H1>
          {edges.map(({ node: { frontmatter } }) => {
            const {
              title,
              image: {
                childImageSharp: { fluid },
              },
            } = frontmatter
            return <ProjectPreview key={title} fluid={fluid} {...frontmatter} />
          })}
          <HR />
          <Button to={HOME_ROUTE}>&larr; Back to home</Button>
        </>
      )
    }}
  />
)
