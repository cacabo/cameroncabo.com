import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { Route } from '../constants/routes'
import { IThoughtPreviewFrontmatter } from '../types'
import { BR, Button, HR, P } from './shared'
import { ThoughtPreview } from './ThoughtPreview'

interface IThoughtPreviewNode {
  frontmatter: IThoughtPreviewFrontmatter
  timeToRead?: number
}

export const Thoughts = (): React.ReactElement => {
  const data = useStaticQuery<{
    allMarkdownRemark: {
      nodes: IThoughtPreviewNode[]
    }
  }>(graphql`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(markdown/thoughts)/" } }
        sort: { frontmatter: { createdAt: DESC } }
      ) {
        nodes {
          ...PartialThought
        }
      }
    }
  `)

  return (
    <>
      <BR />
      {data.allMarkdownRemark.nodes.map(({ frontmatter, timeToRead }) => (
        <ThoughtPreview
          key={frontmatter.title}
          timeToRead={timeToRead}
          {...frontmatter}
        />
      ))}
      <HR />
      <P>
        Subscribe via <a href={Route.RSS}>RSS.</a>
      </P>
      <Button to={Route.HOME}>&larr; Back to home</Button>
    </>
  )
}
