import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import { H3, Button, HR } from '../shared'
import { PROJECTS_ROUTE } from '../../constants/routes'
import { ProjectPreview } from '../ProjectPreview'

export const RecentProjects = (): React.ReactElement => {
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
              ...PartialProject
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
      <HR />

      {edges.map(({ node: { frontmatter } }) => {
        const { title } = frontmatter
        return <ProjectPreview key={title} {...frontmatter} />
      })}
      <Button to={PROJECTS_ROUTE}>View all projects &rarr;</Button>
    </>
  )
}
