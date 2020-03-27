import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { BR, H1, Button } from './shared'
import { ThoughtPreview } from './ThoughtPreview'
import { HOME_ROUTE } from '../constants/routes'
import { IThoughtPreviewFrontmatter } from '../types'

interface IThoughtPreviewNode {
  node: {
    frontmatter: IThoughtPreviewFrontmatter
    timeToRead?: number
  }
}

export const Thoughts = (): React.ReactElement => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(markdown/thoughts)/" } }
        sort: { order: DESC, fields: [frontmatter___createdAt] }
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
    <>
      <BR />
      <H1>Thoughts</H1>
      {(edges as IThoughtPreviewNode[]).map(
        ({ node: { frontmatter, timeToRead } }) => (
          <ThoughtPreview
            key={frontmatter.title}
            timeToRead={timeToRead}
            {...frontmatter}
          />
        ),
      )}
      <Button to={HOME_ROUTE}>&larr; Back to home</Button>
    </>
  )
}
