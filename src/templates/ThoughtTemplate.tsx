import React from 'react'
import { graphql } from 'gatsby'
import s from 'styled-components'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import {
  Button,
  H1,
  HR,
  P,
  Callout,
  Tag,
  BR,
  Row,
  Col,
  H3,
} from '../components/shared'
import { THOUGHTS_ROUTE } from '../constants/routes'
import Timestamp from '../components/Timestamp'
import ThoughtPreview from '../components/ThoughtPreview'
import { MARGIN } from '../constants/measurements'

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

      <Content
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <HR />
      <H3>More Thoughts</H3>
      <Row margin={MARGIN}>
        <Col sm={12} md={6} margin={MARGIN}>
          <ThoughtPreview {...prevData} />
        </Col>
        <Col sm={12} md={6} margin={MARGIN}>
          <ThoughtPreview {...nextData} />
        </Col>
      </Row>
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
