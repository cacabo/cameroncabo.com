import React from 'react'
import { graphql } from 'gatsby'
import s from 'styled-components'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Button, H1, HR, P, Callout, Tag, BR, H3 } from '../components/shared'
import { THOUGHTS_ROUTE } from '../constants/routes'
import Timestamp from '../components/Timestamp'
import ThoughtPreview from '../components/ThoughtPreview'
import {
  M1,
  M3,
  minWidth,
  PHONE,
  TABLET,
  DESKTOP,
} from '../constants/measurements'

const Wrapper = s.div<{}>`
  ${minWidth(PHONE)} {
    padding: 0 5%;
  }

  ${minWidth(TABLET)} {
    padding: 0 10%;
  }

  ${minWidth(DESKTOP)} {
    padding: 0 15%;
  }
`

const Content = s.div<{}>`
  .bibliography {
    font-size: 80%;
    margin-bottom: 1.5rem;

    p {
      line-height: 1.25;
      margin-bottom: 0.5rem;
    }
  }
`

export default function Template({ data, pageContext }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const {
    createdAt,
    updatedAt,
    title,
    subtitle,
    topics,
    caption,
    image,
  } = frontmatter
  const {
    prev: {
      node: { frontmatter: prevData },
    },
    next: {
      node: { frontmatter: nextData },
    },
  } = pageContext

  const { fluid } = (image && image.childImageSharp) || {}
  const src: string | undefined = (fluid && fluid.src) || undefined

  return (
    <Layout>
      <SEO title={title} image={src} />
      <BR />

      <Wrapper>
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
      </Wrapper>

      {fluid && (
        <Callout style={{ padding: 0 }}>
          <Img style={{ marginBottom: caption ? M1 : M3 }} fluid={fluid} />
        </Callout>
      )}
      {caption && (
        <P lightest sm>
          {caption}
        </P>
      )}

      <Wrapper>
        <Content
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Wrapper>

      <HR />
      <H3>More Thoughts</H3>

      <ThoughtPreview {...prevData} />
      <ThoughtPreview {...nextData} />

      <HR />

      <Button to={THOUGHTS_ROUTE}>&larr; Back to all thoughts</Button>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      ...Thought
    }
  }
`
