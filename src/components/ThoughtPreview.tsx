import React, { ReactElement } from 'react'
import { Link } from 'gatsby'
import { Card, H3, P, Tag } from './shared'
import { BLACK } from '../constants/colors'
import { FluidObject } from 'gatsby-image'
import Timestamp from './Timestamp'

interface IThoughtPreview {
  path: string
  title: string
  subtitle?: string
  topics?: string[]
  updatedAt?: string
  createdAt?: string
  image?: {
    childImageSharp: {
      fluid: FluidObject
    }
  }
}

export default ({
  path,
  title,
  subtitle,
  topics,
  image,
  updatedAt,
  createdAt,
}: IThoughtPreview): ReactElement => {
  const fluid = image && image.childImageSharp.fluid
  return (
    <Link
      to={path}
      style={{
        textDecoration: 'none',
        display: 'inline-block',
        width: '100%',
        cursor: 'pointer',
      }}
    >
      <Card key={title} fluid={fluid} hoverable>
        <H3 mb2 style={{ color: BLACK }}>
          {title}
        </H3>
        <P mb2 style={{ color: BLACK }} lighter>
          {subtitle}
        </P>
        <div style={{ marginBottom: '1rem' }}>
          {topics &&
            topics.map((t: string) => (
              <Tag sm key={t}>
                {t}
              </Tag>
            ))}
        </div>
        <Timestamp
          {...{ updatedAt, createdAt }}
          style={{ color: BLACK, marginBottom: 0 }}
        />
      </Card>
    </Link>
  )
}
