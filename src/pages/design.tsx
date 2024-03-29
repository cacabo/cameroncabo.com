import React from 'react'
import {
  Card,
  P,
  H2,
  Masonry,
  H1,
  BR,
  Button,
  Callout,
} from '../components/shared'
import { FluidObject } from 'gatsby-image'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { graphql, useStaticQuery } from 'gatsby'
import { Route } from '../constants/routes'

interface IArtNode {
  title: string
  medium: string
  date: string
  image: {
    childImageSharp: {
      fluid: FluidObject
    }
  }
}

interface IArt {
  title: string
  medium: string
  date: string
  fluid: FluidObject
}

interface IDesignNode {
  title: string
  description: string
  date: string
  image: {
    childImageSharp: {
      fluid: FluidObject
    }
  }
}

interface IDesign {
  title: string
  description: string
  date: string
  fluid: FluidObject
}

const DesignPage = (): React.ReactElement => {
  const { allArtJson, allDesignJson } = useStaticQuery(
    graphql`
      {
        allArtJson {
          nodes {
            medium
            title
            date
            image {
              childImageSharp {
                fluid(maxWidth: 848) {
                  ...GatsbyImageSharpFluid
                }
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
                fluid(maxWidth: 848) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `,
  )

  const artData: IArt[] = (allArtJson.nodes as IArtNode[]).map(
    ({ image, ...rest }): IArt => ({
      fluid: image.childImageSharp.fluid,
      ...rest,
    }),
  )

  const designData: IDesign[] = (allDesignJson.nodes as IDesignNode[]).map(
    ({ image, ...rest }): IDesign => ({
      fluid: image.childImageSharp.fluid,
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
          I have always loved to make things. Though I don&apos;t draw and paint
          as much as I used to, I try to bring a creative and design-driven
          mindset to all the work I do.
        </P>
        <BR />
      </Callout>

      <BR />

      <H2>Artwork</H2>
      <Masonry>
        {artData.map(({ title, medium, fluid, date }) => (
          <Card key={title} fluid={fluid}>
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
        {designData.map(({ title, description, fluid, date }) => (
          <Card key={title} fluid={fluid}>
            <P bold black mb1>
              {title}
            </P>
            <P
              sm
              mb4
              lighter
              dangerouslySetInnerHTML={{ __html: description }}
            />
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
