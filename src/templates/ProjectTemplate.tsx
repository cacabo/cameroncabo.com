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
import { Tag } from '../components/shared/Tag'

class ColorGenerator {
  private static isHex = (c: string): boolean => c[0] === '#'

  private static hexToDecimal = (hex: string): number =>
    Number.parseInt(hex, 16)

  private static hexStrToRgb = (c: string): number[] => {
    const cleaned = c.toLowerCase().trim()
    const r = cleaned.substring(1, 3)
    const g = cleaned.substring(3, 5)
    const b = cleaned.substring(5, 7)
    return [r, g, b].map(ColorGenerator.hexToDecimal)
  }

  private static rgbStrToRgb = (c: string): number[] => {
    const cleaned = c.toLowerCase().trim()
    const contents = cleaned.split('(')[1].split(')')[0]
    const components = contents
      .split(',')
      .map((component: string) => component.trim())
    return components.map(numString => Number.parseInt(numString, 10))
  }

  private static colorToString = (
    r: number,
    g: number,
    b: number,
    a?: number,
  ) => {
    if (!a) {
      return `rgb(${r}, ${g}, ${b})`
    }

    return `rgba(${r}, ${g}, ${b}, ${a})`
  }

  private static darken = (color: number) => Math.min(color - 64, 255)

  private static parseRgb = (color: string): number[] =>
    ColorGenerator.isHex(color)
      ? ColorGenerator.hexStrToRgb(color)
      : ColorGenerator.rgbStrToRgb(color)

  private r: number
  private g: number
  private b: number

  constructor(color: string) {
    const [r, g, b] = ColorGenerator.parseRgb(color)
    this.r = r
    this.g = g
    this.b = b
  }

  public getDarker = (alpha?: number): string => {
    return ColorGenerator.colorToString(
      ColorGenerator.darken(this.r),
      ColorGenerator.darken(this.g),
      ColorGenerator.darken(this.b),
      alpha,
    )
  }

  public getWithAlpha = (alpha: number): string => {
    return ColorGenerator.colorToString(this.r, this.g, this.b, alpha)
  }
}

const Overview = s.div<{ background: string }>`
  background: ${props => props.background};
  width: calc(100% + 1rem);
  padding: 0.5rem;
  margin-top: -0.5rem;
  margin-left: -0.5rem;
  margin-bottom: 1.5rem;
  border-radius: ${BORDER_RADIUS_LG};
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
    tags,
    image: {
      childImageSharp: { fluid },
    },
  } = frontmatter

  const generator = new ColorGenerator(color)
  const colorProps = {
    border: generator.getWithAlpha(0.375),
    background: generator.getWithAlpha(0.125),
    hoverBackground: generator.getWithAlpha(0.1875),
    color: generator.getDarker(),
  }

  return (
    <Layout>
      <SEO title={title} />
      <Overview background={generator.getWithAlpha(0.15)}>
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
        start
        end
        color
        tags
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
