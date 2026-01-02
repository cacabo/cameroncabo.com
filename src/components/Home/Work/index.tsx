import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { Route } from '../../../constants/routes'
import { IWorkFrontmatter } from '../../../types'
import { Button, InfoCard } from '../../shared'
import { HoneySvg } from './svg/Honey'
import { RiploSvg } from './svg/Riplo'
import { ZestSvg } from './svg/Zest'

const svgs: Record<string, React.FC> = {
  Honey: HoneySvg,
  Riplo: RiploSvg,
  Zest: ZestSvg,
} as const

interface IWorkNode {
  frontmatter: IWorkFrontmatter
  html: string
}

export const Work = (): React.ReactElement => {
  const data = useStaticQuery<{
    allMarkdownRemark: {
      nodes: IWorkNode[]
    }
  }>(graphql`
    query WorkQuery {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(work/)/" } }
        sort: { frontmatter: { order: ASC } }
      ) {
        nodes {
          html
          frontmatter {
            company
            title
            location
            start
            end
            svg
            image {
              childImageSharp {
                gatsbyImageData(height: 96)
              }
            }
          }
        }
      }
    }
  `)

  return (
    <>
      {data.allMarkdownRemark.nodes.map(
        ({ html, frontmatter: { company, title, location, start, end, image, svg } }) => {
          const gatsbyImageData = image?.childImageSharp?.gatsbyImageData
          return (
            <InfoCard
              key={`${title}-${company}`}
              title={`${title}, ${company}`}
              subtitle={`${start} - ${end} • ${location}`}
              fluidImage={gatsbyImageData}
              Svg={svgs[svg || '']}
              body={html}
            />
          )
        },
      )}
      <Button as="a" href={Route.RESUME} target="_BLANK">
        View my resume &rarr;
      </Button>
    </>
  )
}
