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
  HR,
  Buttons,
} from '../components/shared'
import { PROJECTS_ROUTE } from '../constants/routes'
import { BORDER } from '../constants/colors'
import { BORDER_RADIUS_LG } from '../constants/measurements'

const ImgWrapper = s.div<{ color: string }>`
  border-width: 6px;
  border-style: solid;
  border-color: ${props => props.color};
  border-radius: ${BORDER_RADIUS_LG};
  margin-bottom: 1.5rem;

  img {
    margin-bottom: 0;
  }
`

// TODO other links like GitHub
export default function Template({ data }) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  const {
    title,
    description,
    link,
    technologies,
    start,
    end,
    color,
    repo,
    image: {
      childImageSharp: { fluid },
    },
  } = frontmatter

  return (
    <Layout>
      <SEO title={title} />
      <div className="blog-post-container">
        <div className="blog-post">
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
              <tr>
                <td>
                  <strong>Technologies</strong>
                </td>
                <td>{technologies}</td>
              </tr>
            </tbody>
          </table>
          <Buttons>
            {link && (
              <Button as="a" href={link} target="_BLANK">
                View project{' '}
                <ExternalLinkIcon style={{ transform: 'scale(0.8)' }} />
              </Button>
            )}
            {repo && (
              <Button as="a" href={repo} target="_BLANK">
                View repo{' '}
                <ExternalLinkIcon style={{ transform: 'scale(0.8)' }} />
              </Button>
            )}
          </Buttons>

          <ImgWrapper color={color}>
            <Img fluid={fluid} />
          </ImgWrapper>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
      <HR />
      <Button to={PROJECTS_ROUTE}>&larr; Back to all projects</Button>
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
        start
        end
        color
        image {
          childImageSharp {
            fluid(maxWidth: 1248) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
