import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { IThoughtPreviewFrontmatter } from '../../types'
import { Button } from '../shared'
import { Route } from '../../constants/routes'
import { ThoughtPreview } from '../ThoughtPreview'

interface IThoughtPreviewNode {
  frontmatter: IThoughtPreviewFrontmatter
  timeToRead?: number
}

export const RecentThoughts = (): React.ReactElement => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(markdown/thoughts)/" } }
        sort: { frontmatter: { createdAt: DESC } }
        limit: 2
      ) {
        nodes {
          ...PartialThought
        }
      }
    }
  `)
  const { nodes } = data.allMarkdownRemark

  return (
    <>
      {(nodes as IThoughtPreviewNode[]).map(({ frontmatter, timeToRead }) => (
        <ThoughtPreview
          {...frontmatter}
          timeToRead={timeToRead}
          key={frontmatter.title}
        />
      ))}

      <Button to={Route.THOUGHTS}>View thoughts &rarr;</Button>
    </>
  )
}
