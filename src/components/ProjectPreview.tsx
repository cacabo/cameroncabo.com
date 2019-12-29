import React from 'react'
import { Link } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'
import s from 'styled-components'

import { Row, Col, Card, H3, P, Button, Tag } from './shared'
import {
  MARGIN,
  BORDER_RADIUS_LG,
  PHONE,
  maxWidth,
} from '../constants/measurements'
import ColorGenerator from '../helpers/ColorGenerator'

const Wrapper = s.div<{ background: string }>`
  background: ${props => props.background};
  width: calc(100% + 1rem);
  padding: 0.5rem;
  margin-left: -0.5rem;
  margin-bottom: 1.5rem;
  border-radius: ${BORDER_RADIUS_LG};

  ${maxWidth(PHONE)} {
    border-radius: 0;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
`

const Image = s.img<{}>`
  margin: 0;
  padding: 0;
  display: block;
  width: 100%;
`

interface IProjectPreivew {
  path: string
  src?: string
  image?: {
    childImageSharp: {
      fluid: FluidObject
    }
  }
  color: string
  title: string
  description: string
  tags?: string[]
  technologies: string[]
  start: string
  end: string
}

export default ({
  path,
  image,
  color,
  title,
  tags,
  description,
  technologies,
  start,
  end,
}: IProjectPreivew) => {
  const cg = new ColorGenerator(color)
  const colorProps = cg.getColorProps()
  const colorBg = cg.getBackgroundColor()

  return (
    <Wrapper background={colorBg}>
      <Row margin={MARGIN}>
        <Col sm={12} lg={5} margin={MARGIN}>
          <Card pad0 shade3 style={{ borderColor: color, borderWidth: 4 }}>
            <Link to={path}>
              {image && <Img fluid={image.childImageSharp.fluid} />}
            </Link>
          </Card>
        </Col>
        <Col sm={12} lg={7} margin={MARGIN}>
          <H3 key={title} mb2>
            <Link to={path}>{title}</Link>
          </H3>
          <P sm mb4 lighter>
            {start === end ? start : `${start} - ${end}`}
          </P>
          <P mb2>{description}</P>
          <P mb2>
            <strong>Tech:</strong> {technologies.join(', ')}
          </P>
          {tags && (
            <div style={{ marginBottom: '1rem' }}>
              {tags.map((t: string) => (
                <Tag key={t} {...colorProps}>
                  {t}
                </Tag>
              ))}
            </div>
          )}
          <Button {...colorProps} to={path} style={{ marginBottom: 0 }}>
            Read more
          </Button>
        </Col>
      </Row>
    </Wrapper>
  )
}
