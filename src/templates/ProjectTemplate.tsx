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
} from '../components/shared'
import { PROJECTS_ROUTE } from '../constants/routes'
import { BORDER, BLACK } from '../constants/colors'
import { BORDER_RADIUS_LG, PHONE, maxWidth } from '../constants/measurements'
import ColorGenerator from '../helpers/ColorGenerator'

const Overview = s.div<{ background: string }>`
  background: ${props => props.background};
  width: calc(100% + 1rem);
  padding: 0.5rem;
  margin-left: -0.5rem;
  margin-bottom: 1.5rem;
  border-radius: ${BORDER_RADIUS_LG};

  ${maxWidth(PHONE)} {
    border-radius: 0;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
`

const ImgWrapper = s.div<{ color: string }>`
  border-width: 6px;
  border-style: solid;
  border-color: ${props => props.color};
  border-radius: ${BORDER_RADIUS_LG};

  img,
  figure,
  svg,
  picture {
    margin-bottom: 0;
    width: 100%;
  }
`

export default function Template({ data }) {
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
    image: {
      childImageSharp: { fluid },
    },
  } = frontmatter

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
            fontSize: '80%',
            borderTop: `1px solid ${BORDER}`,
            marginBottom: '1rem',
          }}
        >
          <tbody>
            <tr>
              <td>
                <strong>Timespan</strong>
              </td>
              <td>{start === end ? start : `${start} - ${end}`}</td>
            </tr>
            {technologies && (
              <tr>
                <td>
                  <strong>Technologies</strong>
                </td>
                <td>{technologies.join(', ')}</td>
              </tr>
            )}
            {collaborators && (
              <tr>
                <td>
                  <strong>Collaborators</strong>
                </td>
                <td>
                  <P style={{ margin: 0, color: BLACK }}>
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
                  <strong>Tags</strong>
                </td>
                <td>
                  {tags.map((t: string) => (
                    <Tag key={t} {...colorProps}>
                      {t}
                    </Tag>
                  ))}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Buttons>
          {link && (
            <Button as="a" href={link} target="_BLANK" {...colorProps}>
              View project{' '}
              <ExternalLinkIcon style={{ transform: 'scale(0.8)' }} />
            </Button>
          )}
          {repo && (
            <Button as="a" href={repo} target="_BLANK" {...colorProps}>
              View repo <ExternalLinkIcon style={{ transform: 'scale(0.8)' }} />
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
      <HR />
      <Button {...colorProps} to={PROJECTS_ROUTE}>
        &larr; Back to all projects
      </Button>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        repo
        description
        path
        link
        technologies
        collaborators
        start
        end
        color
        tags
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
