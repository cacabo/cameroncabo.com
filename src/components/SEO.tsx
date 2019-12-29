import React, { ReactElement } from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

// TODO metadata image
const URL = 'https://www.cameroncabo.com'
const IMAGE = '/images/cover.png'

type Meta =
  | { name: string; content: any; property?: undefined }
  | { property: string; content: any; name?: undefined }

export interface ISEOProps {
  description?: string
  lang?: string
  meta?: Meta[]
  title?: string
  caption?: string
  image?: string
}

function SEO({
  description = '',
  lang = 'en',
  meta = [],
  image,
  caption = '',
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
  const { title: siteTitle } = site.siteMetadata
  const metaTitle = title || siteTitle
  const metaImage = `${URL}${image || IMAGE}`

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title ? `${title} | ${siteTitle}` : siteTitle}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `author`,
          content: `Cameron Cabo <cameroncabo@gmail.com>`,
        },
        {
          property: `og:title`,
          content: metaTitle,
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
          content: `cameroncabo.com`,
        },
        {
          property: `og:image`,
          content: metaImage,
        },
        {
          property: `og:image-alt`,
          content: caption,
        },
        {
          name: `twitter:site`,
          content: `cameroncabo.com`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: `cameroncabo`,
        },
        {
          name: `twitter:title`,
          content: metaTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: metaImage,
        },
        {
          name: `twitter:image-alt`,
          content: caption,
        },
      ].concat(meta)}
    />
  )
}

export default SEO
