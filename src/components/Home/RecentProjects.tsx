import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Button } from '../shared'
import { PROJECTS_ROUTE } from '../../constants/routes'
import { ProjectPreview } from '../ProjectPreview'
import { IProjectPreview } from '../../types'

interface IProjectNode {
  frontmatter: IProjectPreview
}

export const RecentProjects = (): React.ReactElement => {
  const data = useStaticQuery(
    graphql`
      query ProjectsQuery {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/(markdown/projects)/" } }
          sort: { order: ASC, fields: [frontmatter___order] }
          limit: 2
        ) {
          nodes {
            ...PartialProject
          }
        }
      }
    `,
  )

  const { nodes } = data.allMarkdownRemark
  return (
    <>
      {(nodes as IProjectNode[]).map(({ frontmatter }) => {
        const { title } = frontmatter
        return <ProjectPreview key={title} {...frontmatter} />
      })}
      <Button to={PROJECTS_ROUTE}>View all projects &rarr;</Button>
    </>
  )
}
