import React, { ReactElement } from 'react'
import { Link } from 'gatsby'
import s from 'styled-components'
import Img, { FluidObject } from 'gatsby-image'
import { Card, H3, P, Tag, Row, Col } from './shared'
import { BLACK } from '../constants/colors'
import Timestamp from './Timestamp'
import { M2, BORDER_RADIUS, maxWidth, TABLET } from '../constants/measurements'

const StyledImg = s(Img)`
  width: 12rem;
  max-width: 50%;
  object-fit: cover;
  border-radius: ${BORDER_RADIUS} 0 0 ${BORDER_RADIUS};

  ${maxWidth(TABLET)} {
    max-width: none;
    width: 100%;
    height: auto;
  }
`

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
      <Card key={title} hoverable shade1 pad0>
        <Row>
          {fluid && <StyledImg fluid={fluid} />}
          <Col>
            <div style={{ padding: M2 }}>
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
            </div>
          </Col>
        </Row>
      </Card>
    </Link>
  )
}
