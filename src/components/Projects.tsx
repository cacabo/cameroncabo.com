import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import { H1, Button, HR, BR } from './shared'
import { HOME_ROUTE } from '../constants/routes'
import ProjectPreview from './ProjectPreview'

export default () => {
  const data = useStaticQuery(graphql`
    query AllProjectsQuery {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(markdown/projects)/" } }
        sort: { order: ASC, fields: [frontmatter___order] }
      ) {
        edges {
          node {
            ...PartialProject
          }
        }
      }
    }
  `)

  const { edges } = data.allMarkdownRemark
  return (
    <>
      <BR />
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
}
