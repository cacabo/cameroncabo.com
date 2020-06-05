import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { BR, Button, HR, P } from './shared'
import { ThoughtPreview } from './ThoughtPreview'
import { HOME_ROUTE, RSS_ROUTE } from '../constants/routes'
import { IThoughtPreviewFrontmatter } from '../types'

interface IThoughtPreviewNode {
  frontmatter: IThoughtPreviewFrontmatter
  timeToRead?: number
}

export const Thoughts = (): React.ReactElement => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(markdown/thoughts)/" } }
        sort: { order: DESC, fields: [frontmatter___createdAt] }
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
      <BR />
      {(nodes as IThoughtPreviewNode[]).map(({ frontmatter, timeToRead }) => (
        <ThoughtPreview
          key={frontmatter.title}
          timeToRead={timeToRead}
          {...frontmatter}
        />
      ))}
      <HR />
      <P>
        Subscribe via <a href={RSS_ROUTE}>RSS.</a>
      </P>
      <Button to={HOME_ROUTE}>&larr; Back to home</Button>
    </>
  )
}
