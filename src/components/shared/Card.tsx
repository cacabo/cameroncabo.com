import React, { CSSProperties } from 'react'
import s, { css } from 'styled-components'
import Img, { FluidObject } from 'gatsby-image'
import { H4, Text } from './Typography'
import { FlexRow, Flex } from './Grid'
import { BORDER, BLACK_ALPHA, TRANSPARENT } from '../../constants/colors'
import { BORDER_RADIUS, PHONE, maxWidth } from '../../constants/measurements'
import { Children } from '../../types'

interface ICard {
  shade0?: boolean
  shade1?: boolean
  shade2?: boolean
  shade3?: boolean
  shade4?: boolean
  pad0?: boolean
  backgroundImage?: string
  style?: CSSProperties
}

const CardWrapper = s.div<ICard>(
  ({ shade0, shade2, shade3, shade4, backgroundImage }) => css`
    border: 1px solid ${BORDER};
    border-radius: ${BORDER_RADIUS};
    margin-bottom: 1rem;
    ${backgroundImage &&
      `
      background-image: ${backgroundImage};
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    `}
    box-shadow: ${
      shade0
        ? 'none'
        : shade2
        ? `${BLACK_ALPHA(0.2)} 0px 1px 4px`
        : shade3
        ? `${BLACK_ALPHA(0.3)} 0px 2px 6px`
        : shade4
        ? `${BLACK_ALPHA(0.4)} 0px 3px 8px`
        : `${BLACK_ALPHA(0.1)} 0px 1px 2px;`
    };
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
  fluid?: FluidObject
}

export const Card = ({
  fluid,
  children,
  pad0,
  ...rest
}: ICardContent & ICard) => (
  <CardWrapper {...rest}>
    {fluid && <Img fluid={fluid} />}
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
