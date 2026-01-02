import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { Route } from '../constants/routes'
import { IProjectPreview } from '../types'
import { ProjectPreview } from './ProjectPreview'
import { BR, Button, HR } from './shared'

export const Projects: React.FC = (): React.ReactElement => {
  const data = useStaticQuery<{
    allMarkdownRemark: {
      nodes: { frontmatter: IProjectPreview }[]
    }
  }>(graphql`
    query AllProjectsQuery {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(markdown/projects)/" } }
        sort: { frontmatter: { order: ASC } }
      ) {
        nodes {
          ...PartialProject
        }
      }
    }
  `)

  return (
    <>
      <BR />
      {data.allMarkdownRemark.nodes.map(({ frontmatter }) => {
        const { title } = frontmatter
        return <ProjectPreview key={title} {...frontmatter} />
      })}
      <HR />
      <Button to={Route.HOME}>&larr; Back to home</Button>
    </>
  )
}
