import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import s from 'styled-components'

import { Row, Col, Card, H3, P, Button, Tag, UnstyledLink, Tags } from './shared'
import {
  M1,
  M2,
  BORDER_RADIUS_LG,
  PHONE,
  maxWidth,
  minWidth,
  DESKTOP,
  TABLET,
} from '../constants/measurements'
import ColorGenerator from '../helpers/ColorGenerator'
import { IProjectPreview } from '../types'

const StyledImg = s(GatsbyImage)`
  img {
    margin-bottom: 0;
  }
`

const ImgCard = s(Card)<{ color: string }>`
  border-color: ${(props): string => props.color};
  border-width: 4px;

  ${maxWidth(TABLET)} {
    margin-bottom: ${M2};
  }
`

const Wrapper = s.div<{ background: string }>`
  background: ${(props): string => props.background};
  width: calc(100% + 1rem);
  padding: 0.5rem;
  margin-left: -0.5rem;
  margin-bottom: 1.5rem;
  border-radius: ${BORDER_RADIUS_LG};

  ${minWidth(DESKTOP)} {
    width: calc(100% + ${M2} + ${M2});
    padding: ${M2};
    margin-left: -${M2};
  }

  ${maxWidth(PHONE)} {
    border-radius: 0;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
`

export const ProjectPreview = ({
  path,
  image,
  color,
  title,
  tags,
  description,
  technologies,
  start,
  end,
}: IProjectPreview): React.ReactElement => {
  const cg = new ColorGenerator(color)
  const colorProps = cg.getColorProps()
  const colorBg = cg.getBackgroundColor()

  return (
    <Wrapper background={colorBg}>
      <Row margin={M1}>
        <Col sm={12} lg={5} margin={M1}>
          <ImgCard pad0 shade3 color={color} mb0>
            <Link to={path} aria-label={`View ${title} project`}>
              {(() => {
                const gatsbyImage = image && getImage(image)
                return gatsbyImage ? <StyledImg image={gatsbyImage} alt={title} /> : null
              })()}
            </Link>
          </ImgCard>
        </Col>
        <Col sm={12} lg={7} margin={M1}>
          <H3 key={title} mb2>
            <UnstyledLink to={path}>{title}</UnstyledLink>
          </H3>
          <P mb4 lightest>
            {start === end ? start : `${start} - ${end}`}
          </P>
          <P mb2 lighter>
            {description}
          </P>
          <P mb2 lighter>
            <strong>Tech:</strong> {technologies.join(', ')}
          </P>
          {tags && (
            <div style={{ marginBottom: M2 }}>
              <Tags>
                {tags.map((t: string) => (
                  <Tag sm key={t} {...colorProps}>
                    {t}
                  </Tag>
                ))}
              </Tags>
            </div>
          )}
          <Button {...colorProps} to={path} style={{ marginBottom: 0 }}>
            Read more &rarr;
          </Button>
        </Col>
      </Row>
    </Wrapper>
  )
}
