import React, { ReactNode } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Button, H1, HR, P, Callout, Tag, BR } from '../components/shared'
import { THOUGHTS_ROUTE } from '../constants/routes'
import Timestamp from '../components/Timestamp'

export default function Template({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const {
    createdAt,
    updatedAt,
    title,
    subtitle,
    topics,
    caption,
    image = {},
  } = frontmatter

  const { fluid } = image.childImageSharp
  const src: string | undefined = (fluid && fluid.src) || undefined

  return (
    <Layout>
      <SEO title={title} image={src} />
      <BR />
      <H1 mb2>{title}</H1>
      {subtitle && <P style={{ fontSize: '120%' }}>{subtitle}</P>}

      {topics && (
        <P>
          {topics.map((t: string) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </P>
      )}

      <Timestamp createdAt={createdAt} updatedAt={updatedAt} />

      {fluid && (
        <Callout style={{ padding: 0 }}>
          <Img
            style={{ marginBottom: caption ? '0.5rem' : '1.5rem' }}
            fluid={fluid}
          />
        </Callout>
      )}
      {caption && (
        <P lighter sm>
          {caption}
        </P>
      )}

      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <HR />
      <Button to={THOUGHTS_ROUTE}>&larr; Back to all thoughts</Button>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        createdAt(fromNow: true)
        updatedAt(fromNow: true)
        title
        subtitle
        topics
        caption
        image {
          childImageSharp {
            fluid(maxWidth: 1248) {
              src
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
