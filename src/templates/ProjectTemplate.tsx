import React from 'react'
import s from 'styled-components'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import {
  Button,
  P,
  H1,
  ExternalLinkIcon,
  Tag,
  HR,
  Buttons,
  H3,
  BR,
} from '../components/shared'
import { PROJECTS_ROUTE } from '../constants/routes'
import { BORDER } from '../constants/colors'
import {
  BORDER_RADIUS_LG,
  PHONE,
  maxWidth,
  minWidth,
  DESKTOP,
  M2,
  WIDESCREEN,
} from '../constants/measurements'
import ColorGenerator from '../helpers/ColorGenerator'
import { ProjectPreview } from '../components/ProjectPreview'
import { IProjectPreview, IProjectFrontmatter } from '../types'

const Overview = s.div<{ background: string }>`
  background: ${(props): string => props.background};
  width: calc(100% + 1rem);
  padding: 0.5rem;
  margin-left: -0.5rem;
  margin-bottom: 1.5rem;
  border-radius: ${BORDER_RADIUS_LG};

  ${minWidth(DESKTOP)} {
    padding: ${M2};
    margin-left: -${M2};
    width: calc(100% + ${M2} + ${M2});
  }

  ${minWidth(WIDESCREEN)} {
    padding: calc(${M2} + 1.25vw);
    margin-left: calc(-${M2} - 1.25vw);
    width: calc(100% + ${M2} + ${M2} + 2.5vw);
  }

  ${maxWidth(PHONE)} {
    border-radius: 0;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
`

const ImgWrapper = s.div<{ color: string }>`
  border-width: 6px;
  border-style: solid;
  border-color: ${(props): string => props.color};
  border-radius: ${BORDER_RADIUS_LG};

  img,
  figure,
  svg,
  picture {
    margin-bottom: 0;
    width: 100%;
  }
`

interface IProjectTemplateProps {
  data: {
    markdownRemark: {
      frontmatter: IProjectFrontmatter
      html: string
    }
  }
  pageContext: {
    prev: {
      node: {
        frontmatter: IProjectPreview
      }
    }
    next: {
      node: {
        frontmatter: IProjectPreview
      }
    }
  }
}

const ProjectTemplate = ({
  data,
  pageContext,
}: IProjectTemplateProps): React.ReactElement => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const {
    title,
    description,
    link,
    technologies,
    collaborators,
    start,
    end,
    color,
    repo,
    tags,
    status,
    image: {
      childImageSharp: { fluid },
    },
  } = frontmatter
  const {
    prev: { node: { frontmatter: prevData } = {} } = {},
    next: { node: { frontmatter: nextData } = {} } = {},
  } = pageContext

  const { src } = fluid

  const cg = new ColorGenerator(color)
  const colorProps = cg.getColorProps()
  const colorBg = cg.getBackgroundColor()

  return (
    <Layout>
      <SEO title={title} image={src} />
      <Overview background={colorBg}>
        <H1 mb4>{title}</H1>
        <P mb4>{description}</P>
        <table
          style={{
            borderTop: `1px solid ${BORDER}`,
            marginBottom: '1rem',
          }}
        >
          <tbody>
            <tr>
              <td>
                <P sm bold mb0>
                  Timespan
                </P>
              </td>
              <td>
                <P sm mb0>
                  {start === end ? start : `${start} - ${end}`}
                </P>
              </td>
            </tr>
            {status && (
              <tr>
                <td>
                  <P sm bold mb0>
                    Status
                  </P>
                </td>
                <td>
                  <P sm mb0>
                    {status}
                  </P>
                </td>
              </tr>
            )}
            {technologies && technologies.length && (
              <tr>
                <td>
                  <P sm bold mb0>
                    Technologies
                  </P>
                </td>
                <td>
                  <P sm mb0>
                    {technologies.join(', ')}
                  </P>
                </td>
              </tr>
            )}
            {collaborators && (
              <tr>
                <td>
                  <P sm bold mb0>
                    Collaborators
                  </P>
                </td>
                <td>
                  <P mb0 sm>
                    {collaborators.map((c: string, idx: number) => (
                      <React.Fragment key={c}>
                        <span dangerouslySetInnerHTML={{ __html: c }} />
                        {idx !== collaborators.length - 1 && ', '}
                      </React.Fragment>
                    ))}
                  </P>
                </td>
              </tr>
            )}
            {tags && (
              <tr>
                <td>
                  <P sm bold mb0>
                    Tags
                  </P>
                </td>
                <td>
                  {tags.map(
                    (t: string): React.ReactElement => (
                      <Tag key={t} {...colorProps} sm>
                        {t}
                      </Tag>
                    ),
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Buttons>
          {link && (
            <Button as="a" href={link} target="_BLANK" {...colorProps}>
              View project
              <ExternalLinkIcon
                style={{ marginLeft: '6px', transform: 'scale(0.8)' }}
              />
            </Button>
          )}
          {repo && (
            <Button as="a" href={repo} target="_BLANK" {...colorProps}>
              View repo
              <ExternalLinkIcon
                style={{ marginLeft: '6px', transform: 'scale(0.8)' }}
              />
            </Button>
          )}
        </Buttons>

        <ImgWrapper color={color}>
          <Img fluid={fluid} />
        </ImgWrapper>
      </Overview>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <BR />
      <HR />

      {prevData && <ProjectPreview {...prevData} />}
      {nextData && <ProjectPreview {...nextData} />}

      <BR />
      <Button {...colorProps} to={PROJECTS_ROUTE}>
        &larr; Back to all projects
      </Button>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      ...Project
    }
  }
`

export default ProjectTemplate
