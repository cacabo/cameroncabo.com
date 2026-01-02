import React from 'react'
import { Card, P, H2, Masonry, H1, BR, Button, Callout } from '../components/shared'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { graphql, useStaticQuery } from 'gatsby'
import { Route } from '../constants/routes'

interface IArtNode {
  title: string
  medium: string
  date: string
  image: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
}

interface IArt {
  title: string
  medium: string
  date: string
  gatsbyImageData: IGatsbyImageData
}

interface IDesignNode {
  title: string
  description: string
  date: string
  image: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
}

interface IDesign {
  title: string
  description: string
  date: string
  gatsbyImageData: IGatsbyImageData
}

const DesignPage = (): React.ReactElement => {
  const { allArtJson, allDesignJson } = useStaticQuery(graphql`
    {
      allArtJson {
        nodes {
          medium
          title
          date
          image {
            childImageSharp {
              gatsbyImageData(width: 848)
            }
          }
        }
      }
      allDesignJson {
        nodes {
          description
          title
          date
          image {
            childImageSharp {
              gatsbyImageData(width: 848)
            }
          }
        }
      }
    }
  `)

  const artData: IArt[] = (allArtJson.nodes as IArtNode[]).map(
    ({ image, ...rest }): IArt => ({
      gatsbyImageData: image.childImageSharp.gatsbyImageData,
      ...rest,
    }),
  )

  const designData: IDesign[] = (allDesignJson.nodes as IDesignNode[]).map(
    ({ image, ...rest }): IDesign => ({
      gatsbyImageData: image.childImageSharp.gatsbyImageData,
      ...rest,
    }),
  )

  return (
    <Layout>
      <SEO title="Design" />

      <Callout backgroundImage="/images/art-backing.svg">
        <BR />
        <H1 mb4>Design and creativity are in everything</H1>
        <P mb0>
          I have always loved to make things. Though I don&apos;t draw and paint as much as I used
          to, I try to bring a creative and design-driven mindset to all the work I do.
        </P>
        <BR />
      </Callout>

      <BR />

      <H2>Artwork</H2>
      <Masonry>
        {artData.map(({ title, medium, gatsbyImageData, date }) => (
          <Card key={title} fluid={gatsbyImageData}>
            <P black bold mb1>
              {title}
            </P>
            <P sm mb0 lightest>
              {medium}, {date}
            </P>
          </Card>
        ))}
      </Masonry>

      <BR />

      <H2>Design</H2>
      <Masonry>
        {designData.map(({ title, description, gatsbyImageData, date }) => (
          <Card key={title} fluid={gatsbyImageData}>
            <P bold black mb1>
              {title}
            </P>
            <P sm mb4 lighter dangerouslySetInnerHTML={{ __html: description }} />
            <P mb0 sm lightest>
              {date}
            </P>
          </Card>
        ))}
      </Masonry>

      <BR />

      <Button to={Route.HOME}>&larr; Back to home</Button>
    </Layout>
  )
}

export default DesignPage
