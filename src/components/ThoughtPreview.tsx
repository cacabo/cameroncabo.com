import React, { ReactElement } from 'react'
import { Link } from 'gatsby'
import s from 'styled-components'
import Img, { FluidObject } from 'gatsby-image'

import { Card, H3, P, Tag, Row, Col } from './shared'
import { BLACK } from '../constants/colors'
import { Timestamp } from './Timestamp'
import {
  M2,
  BORDER_RADIUS,
  maxWidth,
  TABLET,
  minWidth,
  M1,
} from '../constants/measurements'

const StyledLink = s(Link)`
  text-decoration: none;
  display: inline-block;
  width: 100%;
  cursor: pointer;
  margin-bottom: 1rem;

  ${minWidth(TABLET)} {
    margin-bottom: calc(1rem + 1.25vh);
  }
`

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
  timeToRead?: number
  image?: {
    childImageSharp: {
      fluid: FluidObject
    }
  }
}

export const ThoughtPreview = ({
  path,
  title,
  subtitle,
  topics,
  image,
  timeToRead,
  updatedAt,
  createdAt,
}: IThoughtPreview): ReactElement => {
  const fluid = image && image.childImageSharp.fluid
  return (
    <StyledLink to={path}>
      <Card key={title} hoverable shade1 pad0 mb0>
        <Row>
          {fluid && <StyledImg fluid={fluid} />}
          <Col>
            <div style={{ padding: M2 }}>
              <H3 mb1 style={{ color: BLACK }}>
                {title}
              </H3>
              <P mb4 style={{ color: BLACK }} lighter>
                {subtitle}
              </P>
              <div style={{ marginBottom: M1 }}>
                {topics &&
                  topics.map((t: string) => (
                    <Tag sm key={t}>
                      {t}
                    </Tag>
                  ))}
              </div>
              <Timestamp
                updatedAt={updatedAt}
                createdAt={createdAt}
                timeToRead={timeToRead}
                style={{ color: BLACK, marginBottom: 0 }}
              />
            </div>
          </Col>
        </Row>
      </Card>
    </StyledLink>
  )
}
