/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { ReactElement } from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

// TODO
const IMAGE = 'https://ccabo.s3-us-west-1.amazonaws.com/solin-cover.png'

type Meta =
  | { name: string; content: any; property?: undefined }
  | { property: string; content: any; name?: undefined }

export interface ISEOProps {
  description?: string
  lang?: string
  meta?: Meta[]
  title?: string
}

function SEO({
  description = '',
  lang = 'en',
  meta = [],
  title = '',
}: ISEOProps): ReactElement {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `,
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `author`,
          content: `SOLIN Fitness <cameroncabo@gmail.com>`,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:url`,
          content: `solinfitness.com`,
        },
        {
          property: `og:image`,
          content: IMAGE,
        },
        {
          property: `og:image-alt`,
          content: 'SOLIN logo',
        },
        {
          name: `twitter:site`,
          content: `solinfitness.com`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: IMAGE,
        },
        {
          name: `twitter:image-alt`,
          content: 'SOLIN logo',
        },
      ].concat(meta)}
    />
  )
}

export default SEO
