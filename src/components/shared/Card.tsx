import React, { CSSProperties } from 'react'
import s, { css } from 'styled-components'
import Img, { FluidObject } from 'gatsby-image'
import { H4, Text } from './Typography'
import { FlexRow, Flex } from './Grid'
import { BORDER, BLACK_ALPHA } from '../../constants/colors'
import {
  BORDER_RADIUS,
  PHONE,
  maxWidth,
  SHORT_ANIMATION_DURATION,
  LONG_ANIMATION_DURATION,
} from '../../constants/measurements'
import { Children } from '../../types'

interface ICard {
  shade0?: boolean
  shade1?: boolean
  shade2?: boolean
  shade3?: boolean
  shade4?: boolean
  hoverable?: boolean
  pad0?: boolean
  mb0?: boolean
  backgroundImage?: string
  style?: CSSProperties
}

const getBoxShadow = ({
  shade0,
  shade1,
  shade2,
  shade3,
  shade4,
}: Partial<ICard>) =>
  shade0
    ? `${BLACK_ALPHA(0)} 0 0 0`
    : shade1
    ? `${BLACK_ALPHA(0.1)} 0 1px 2px;`
    : shade2
    ? `${BLACK_ALPHA(0.2)} 0 1px 4px`
    : shade3
    ? `${BLACK_ALPHA(0.3)} 0 2px 6px`
    : shade4
    ? `${BLACK_ALPHA(0.4)} 0 3px 8px`
    : `${BLACK_ALPHA(0)} 0 0 0`

const CardWrapper = s.div<ICard>(
  ({ backgroundImage, hoverable, mb0, ...shades }) => css`
    border: 1px solid ${BORDER};
    border-radius: ${BORDER_RADIUS};
    margin-bottom: ${mb0 ? '0' : '1rem'};
    ${backgroundImage &&
      `
      background-image: ${backgroundImage};
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    `}
    box-shadow: ${getBoxShadow({ ...shades })};

    ${hoverable &&
      `
      transition: box-shadow ${SHORT_ANIMATION_DURATION}ms ease,
                  transform ${LONG_ANIMATION_DURATION}ms ease;

      :hover {
        box-shadow: ${BLACK_ALPHA(0.4)} 0 2px 24px;
        transform: translateY(-2px);
      }
    `}
  `,
)

const CardBody = s.div<{ pad0?: boolean }>`
  padding: 1rem;

  ${maxWidth(PHONE)} {
    padding: 0.5rem;
  }

  ${props => props.pad0 && 'padding: 0 !important;'}
`

interface ICardContent {
  children: Children
  src?: string
  fluid?: FluidObject
}

export const Card = ({
  fluid,
  src,
  children,
  pad0,
  mb0,
  ...rest
}: ICardContent & ICard) => (
  <CardWrapper {...rest} mb0={mb0}>
    {fluid && <CardImg fluid={fluid} />}
    {src && <CardImg as="img" src={src} />}
    <CardBody pad0={pad0}>{children}</CardBody>
  </CardWrapper>
)

const Content = s.div`
  li {
    margin-bottom: 0.25rem;
  }

  p:last-child,
  ul:last-child {
    margin-bottom: 0;

    li:last-child {
      margin-bottom: 0;
    }
  }
`

const CardImg = s(Img)<{}>`
  border-radius: ${BORDER_RADIUS} ${BORDER_RADIUS} 0 0;
`

const SIZE = '48px'

interface IInfoCard {
  title: string
  subtitle?: string
  fluidImage?: FluidObject
  body: string
  imageUrl?: string
}

export const InfoCard = ({
  title,
  fluidImage,
  subtitle,
  body,
  imageUrl,
}: IInfoCard) => (
  <Card>
    <FlexRow>
      <Flex>
        <H4 mb2>{title}</H4>
        <Text lighter mb2 sm>
          {subtitle}
        </Text>
      </Flex>
      {(fluidImage || imageUrl) && (
        <div
          style={{
            minWidth: SIZE,
            height: SIZE,
            marginLeft: '0.5rem',
          }}
        >
          {fluidImage ? (
            <Img fluid={fluidImage} />
          ) : (
            <img
              style={{ width: SIZE, maxHeight: SIZE }}
              src={imageUrl}
              alt={title}
            />
          )}
        </div>
      )}
    </FlexRow>
    <Content dangerouslySetInnerHTML={{ __html: body }} />
  </Card>
)
