import React from 'react'
import { Link } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'

import { Row, Col, Card, H3, P, Button } from './shared'
import { MARGIN } from '../constants/measurements'

interface IProjectPreivew {
  path: string
  fluid: FluidObject
  color: string
  title: string
  description: string
  technologies: string
  start: string
  end: string
}

export default ({
  path,
  fluid,
  color,
  title,
  description,
  technologies,
  start,
  end,
}: IProjectPreivew) => (
  <Row margin={MARGIN} style={{ marginBottom: '1rem' }}>
    <Col sm={12} md={5} margin={MARGIN}>
      <Card pad0 shade3 style={{ borderColor: color, borderWidth: 4 }}>
        <Link to={path}>
          <Img fluid={fluid} />
        </Link>
      </Card>
    </Col>
    <Col sm={12} md={7} margin={MARGIN}>
      <H3 key={title} mb2>
        <Link to={path}>{title}</Link>
      </H3>
      <P sm mb4 lighter>
        {start === end ? start : `${start} - ${end}`}
      </P>
      <P mb2>{description}</P>
      <P mb2>
        <strong>Technologies:</strong> {technologies}
      </P>
      <Button to={path}>Read more</Button>
    </Col>
  </Row>
)
