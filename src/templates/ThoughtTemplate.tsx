import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import s from 'styled-components'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { BR, Button, Callout, H1, HR, P, Tag, Tags } from '../components/shared'
import { ThoughtPreview } from '../components/ThoughtPreview'
import { Timestamp } from '../components/Timestamp'
import { GRAY_2 } from '../constants/colors'
import { DESKTOP, M1, M2, M3, minWidth, PHONE, TABLET } from '../constants/measurements'
import { Route } from '../constants/routes'
import { IThought, IThoughtPreviewFrontmatter } from '../types'

const Wrapper = s.div`
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

const Content = s.div`
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

const ThoughtTemplate = ({ data, pageContext }: IThoughtTemplateProps): React.ReactElement => {
  const { markdownRemark } = data
  const { frontmatter, html, timeToRead } = markdownRemark
  const { createdAt, updatedAt, title, subtitle, topics, caption, image } = frontmatter

  // Use default params in case there is no prev or next post
  const {
    prev: { node: { frontmatter: prevData, timeToRead: prevTimeToRead } = {} } = {},
    next: { node: { frontmatter: nextData, timeToRead: nextTimeToRead } = {} } = {},
  } = pageContext

  const imageData = image?.childImageSharp?.gatsbyImageData
  const gatsbyImage = image ? getImage(image) : null
  const src = imageData?.images?.fallback?.src

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

        <Timestamp createdAt={createdAt} updatedAt={updatedAt} timeToRead={timeToRead} />
      </Wrapper>

      {gatsbyImage && (
        <Callout style={{ padding: 0 }}>
          <GatsbyImage
            style={{ marginBottom: caption ? M1 : M3 }}
            image={gatsbyImage}
            alt={title}
          />
        </Callout>
      )}

      <Wrapper>
        {caption && (
          <P lightest sm>
            {caption}
          </P>
        )}
        <Content className="blog-post-content" dangerouslySetInnerHTML={{ __html: html }} />
      </Wrapper>

      <BR />

      {(prevData || nextData) && (
        <>
          <HR />

          {prevData && <ThoughtPreview {...prevData} timeToRead={prevTimeToRead} />}
          {nextData && <ThoughtPreview {...nextData} timeToRead={nextTimeToRead} />}

          <BR />
        </>
      )}

      <Button to={Route.THOUGHTS}>&larr; Back to all thoughts</Button>
    </Layout>
  )
}

export const pageQuery = graphql`
  query ($pagePath: String!) {
    markdownRemark(frontmatter: { path: { eq: $pagePath } }) {
      ...Thought
    }
  }
`

export default ThoughtTemplate
