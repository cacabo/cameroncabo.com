import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { IThoughtPreviewFrontmatter } from '../../types'
import { H3, Button } from '../shared'
import { THOUGHTS_ROUTE } from '../../constants/routes'
import { ThoughtPreview } from '../ThoughtPreview'

interface IThoughtPreviewNode {
  node: {
    frontmatter: IThoughtPreviewFrontmatter
    timeToRead?: number
  }
}

export const RecentThoughts = (): React.ReactElement => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(markdown/thoughts)/" } }
        sort: { order: DESC, fields: [frontmatter___createdAt] }
        limit: 2
      ) {
        edges {
          node {
            ...PartialThought
          }
        }
      }
    }
  `)
  const { edges } = data.allMarkdownRemark

  return (
    <div>
      <H3 mt4 mb4>
        Recent Thoughts
      </H3>

      {(edges as IThoughtPreviewNode[]).map(
        ({ node: { frontmatter, timeToRead } }) => (
          <ThoughtPreview
            {...frontmatter}
            timeToRead={timeToRead}
            key={frontmatter.title}
          />
        ),
      )}

      <Button to={THOUGHTS_ROUTE}>View thoughts &rarr;</Button>
    </div>
  )
}
