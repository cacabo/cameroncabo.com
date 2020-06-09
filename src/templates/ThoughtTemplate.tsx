import React from 'react'
import { graphql } from 'gatsby'
import s from 'styled-components'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Button, H1, HR, P, Callout, Tag, BR, Tags } from '../components/shared'
import { THOUGHTS_ROUTE } from '../constants/routes'
import { Timestamp } from '../components/Timestamp'
import { ThoughtPreview } from '../components/ThoughtPreview'
import {
  M1,
  M3,
  minWidth,
  PHONE,
  TABLET,
  DESKTOP,
  M2,
} from '../constants/measurements'
import { IThoughtPreviewFrontmatter, IThought } from '../types'
import { GRAY_2 } from '../constants/colors'

const Wrapper = s.div<{}>`
  width: 100%;
  overflow-x: hidden !important;

  ${minWidth(PHONE)} {
    padding: 0 5%;
  }

  ${minWidth(TABLET)} {
    padding: 0 10%;
  }

  ${minWidth(DESKTOP)} {
    padding: 0 12.5%;
  }
`

const Content = s.div<{}>`
  .caption {
    font-size: 80%;
    margin-top: -1.05rem;
    color: ${GRAY_2};
  }

  .bibliography {
    margin-bottom: 1.5rem;

    p {
      line-height: 1.25;
      font-size: 80%;
      margin-bottom: ${M1};
    }
  }
`

interface IThoughtTemplateProps {
  data: {
    markdownRemark: IThought
  }
  pageContext: {
    prev: {
      node: {
        frontmatter: IThoughtPreviewFrontmatter
        timeToRead: number
      }
    }
    next: {
      node: {
        frontmatter: IThoughtPreviewFrontmatter
        timeToRead: number
      }
    }
  }
}

const ThoughtTemplate = ({
  data,
  pageContext,
}: IThoughtTemplateProps): React.ReactElement => {
  const { markdownRemark } = data
  const { frontmatter, html, timeToRead } = markdownRemark
  const {
    createdAt,
    updatedAt,
    title,
    subtitle,
    topics,
    caption,
    image,
  } = frontmatter

  // Use default params in case there is no prev or next post
  const {
    prev: {
      node: { frontmatter: prevData, timeToRead: prevTimeToRead } = {},
    } = {},
    next: {
      node: { frontmatter: nextData, timeToRead: nextTimeToRead } = {},
    } = {},
  } = pageContext

  const { fluid } = (image && image.childImageSharp) || {}
  const src: string | undefined = (fluid && fluid.src) || undefined

  return (
    <Layout>
      <SEO title={title} image={src} showSiteTitle={false} />
      <BR hiddenOnMobile />
      <Wrapper>
        <H1 mb2>{title}</H1>
        {subtitle && (
          <P style={{ fontSize: '120%' }} lighter mb4>
            {subtitle}
          </P>
        )}

        {topics && (
          <div style={{ marginBottom: M2 }}>
            <Tags>
              {topics.map((t: string) => (
                <Tag sm key={t}>
                  {t}
                </Tag>
              ))}
            </Tags>
          </div>
        )}

        <Timestamp
          createdAt={createdAt}
          updatedAt={updatedAt}
          timeToRead={timeToRead}
        />
      </Wrapper>

      {fluid && (
        <Callout style={{ padding: 0 }}>
          <Img style={{ marginBottom: caption ? M1 : M3 }} fluid={fluid} />
        </Callout>
      )}

      <Wrapper>
        {caption && (
          <P lightest sm>
            {caption}
          </P>
        )}
        <Content
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Wrapper>

      <BR />

      {(prevData || nextData) && (
        <>
          <HR />

          {prevData && (
            <ThoughtPreview {...prevData} timeToRead={prevTimeToRead} />
          )}
          {nextData && (
            <ThoughtPreview {...nextData} timeToRead={nextTimeToRead} />
          )}

          <BR />
        </>
      )}

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

export default ThoughtTemplate
