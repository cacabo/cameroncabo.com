import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { ReactElement } from 'react'
import s from 'styled-components'
import {
  BORDER_RADIUS_LG,
  M1,
  M2,
  M4,
  maxWidth,
  minWidth,
  PHONE,
  TABLET,
} from '../constants/measurements'
import { IThoughtPreview } from '../types'
import { Col, P, Row, Tag, Tags } from './shared'
import { Timestamp } from './Timestamp'

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

const StyledLink = s(Link)`
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

const StyledBackgroundDiv = s.div<{ backgroundImage?: string }>`
  width: 12rem;
  max-width: 50%;
  height: 8rem;
  border-radius: ${BORDER_RADIUS_LG};
  overflow: hidden;
  background-image: ${(props) =>
    props.backgroundImage ? `url(${props.backgroundImage})` : 'none'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  ${maxWidth(TABLET)} {
    display: none;
  }
`

const StyledImg = s(GatsbyImage)`
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
  const gatsbyImage = image ? getImage(image) : null
  const imageSrc = gatsbyImage?.images?.fallback?.src

  return (
    <StyledLink to={path}>
      <Row>
        {gatsbyImage && (
          <>
            <StyledImg image={gatsbyImage} alt={title} />
            <StyledBackgroundDiv backgroundImage={imageSrc} />
          </>
        )}
        <Col>
          <Content hasImage={Boolean(gatsbyImage)}>
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
