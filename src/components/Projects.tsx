import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import { Button, HR, BR } from './shared'
import { HOME_ROUTE } from '../constants/routes'
import { ProjectPreview } from './ProjectPreview'
import { IProjectPreview } from '../types'

interface IProjectNode {
  frontmatter: IProjectPreview
}

const Projects = (): React.ReactElement => {
  const data = useStaticQuery(graphql`
    query AllProjectsQuery {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(markdown/projects)/" } }
        sort: { order: ASC, fields: [frontmatter___order] }
      ) {
        nodes {
          ...PartialProject
        }
      }
    }
  `)

  const { nodes } = data.allMarkdownRemark
  return (
    <>
      <BR />
      {(nodes as IProjectNode[]).map(({ frontmatter }) => {
        const { title } = frontmatter
        return <ProjectPreview key={title} {...frontmatter} />
      })}
      <HR />
      <Button to={HOME_ROUTE}>&larr; Back to home</Button>
    </>
  )
}

export default Projects
