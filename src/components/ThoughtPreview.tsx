import React, { ReactElement } from 'react'
import { Link } from 'gatsby'
import s from 'styled-components'
import BackgroundImage from 'gatsby-background-image'
import Img from 'gatsby-image'

import { IThoughtPreview } from '../types'
import { P, Tag, Tags, Row, Col } from './shared'
import { Timestamp } from './Timestamp'
import {
  M2,
  BORDER_RADIUS_LG,
  maxWidth,
  TABLET,
  minWidth,
  M1,
  PHONE,
  M4,
} from '../constants/measurements'

const Content = s.div<{ hasImage: boolean }>`
  ${(props): string =>
    props.hasImage
      ? `
    padding-top: ${M2};
    padding-bottom: ${M2};
    padding-left: ${M2};

    ${minWidth(TABLET)} {
      padding-left: calc(1.25vw + ${M2});
    }

    ${maxWidth(PHONE)} {
      padding: ${M2} 0 0 0;
    }
  `
      : ''}
`

const StyledLink = s(Link)<{}>`
  width: 100%;
  display: block;
  text-decoration: none;
  margin-bottom: ${M2};

  ${minWidth(TABLET)} {
    margin-bottom: calc(${M2} + 1.25vh);
  }

  ${maxWidth(PHONE)} {
    margin-bottom: ${M4};
  }
`

const StyledBackgroundImg = s(BackgroundImage)`
  width: 12rem;
  max-width: 50%;
  border-radius: ${BORDER_RADIUS_LG};
  overflow: hidden;

  ${maxWidth(TABLET)} {
    display: none;
  }
`

const StyledImg = s(Img)`
  display: none;

  ${maxWidth(TABLET)} {
    border-radius: ${BORDER_RADIUS_LG};
    display: block;
    max-width: none;
    width: 100%;
    height: auto;
    overflow: hidden;
  }
`

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
      <Row>
        {fluid && (
          <>
            <StyledImg fluid={fluid} />
            <StyledBackgroundImg fluid={fluid} />
          </>
        )}
        <Col>
          <Content hasImage={Boolean(fluid)}>
            <P mb1 bold black>
              {title}
            </P>
            <P mb4 lighter>
              {subtitle}
            </P>
            {topics && (
              <div style={{ marginBottom: M1 }}>
                <Tags>
                  {topics.map((t: string) => (
                    <Tag sm key={t}>
                      {t}
                    </Tag>
                  ))}
                </Tags>
              </div>
            )}
            <Timestamp
              updatedAt={updatedAt}
              createdAt={createdAt}
              timeToRead={timeToRead}
              style={{ marginBottom: 0 }}
            />
          </Content>
        </Col>
      </Row>
    </StyledLink>
  )
}
