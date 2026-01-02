import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import React, { CSSProperties } from 'react'
import s, { css } from 'styled-components'
import { BLACK_ALPHA, BORDER } from '../../constants/colors'
import {
  BORDER_RADIUS,
  LONG_ANIMATION_DURATION,
  M2,
  M4,
  maxWidth,
  minWidth,
  PHONE,
  SHORT_ANIMATION_DURATION,
  TABLET,
} from '../../constants/measurements'
import { Children } from '../../types'
import { Flex, FlexRow } from './Grid'
import { P } from './Typography'

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

const getBoxShadow = ({ shade0, shade1, shade2, shade3, shade4 }: Partial<ICard>): string =>
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

  ${(props): string => (props.pad0 ? 'padding: 0 !important;' : '')}
`

interface ICardContent {
  children: Children
  src?: string
  fluid?: IGatsbyImageData
}

export const Card = ({
  fluid,
  src,
  children,
  pad0,
  mb0,
  ...rest
}: ICardContent & ICard): React.ReactElement => (
  <CardWrapper {...rest} mb0={mb0}>
    {fluid && <CardImg image={fluid} alt="" />}
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

const CardImg = s(GatsbyImage)`
  border-radius: ${BORDER_RADIUS} ${BORDER_RADIUS} 0 0;
`

const SIZE = '52px'
const MOBILE_SIZE = '42px'

interface IInfoCard {
  title: string
  subtitle?: string
  fluidImage?: IGatsbyImageData
  body: string
  Svg?: React.FC<{ style?: React.CSSProperties }>
}

const InfoCardWrapper = s.div`
  margin-bottom: ${M4};

  ${minWidth(TABLET)} {
    margin-bottom: calc(${M4} + 1.25vh);
  }
`

const InfoCardImageWrapper = s.div`
  width: ${SIZE};
  height: auto;
  margin-right: ${M4};

  ${maxWidth(TABLET)} {
    margin-right: ${M2};
  }

  ${maxWidth(PHONE)} {
    width: ${MOBILE_SIZE};
  }
`

const InfoCardImage = s.img`
  width: ${SIZE};
  height: auto;
  margin-bottom: 0;

  ${maxWidth(PHONE)} {
    width: ${MOBILE_SIZE};
  }
`

export const InfoCard = ({
  title,
  fluidImage,
  subtitle,
  body,
  Svg,
}: IInfoCard): React.ReactElement => (
  <InfoCardWrapper>
    <FlexRow>
      {(fluidImage || Svg) && (
        <InfoCardImageWrapper>
          {fluidImage ? (
            <InfoCardImage as={GatsbyImage} image={fluidImage} alt={title} />
          ) : Svg ? (
            <Svg style={{ width: '100%', height: 'auto' }} />
          ) : null}
        </InfoCardImageWrapper>
      )}
      <Flex>
        <P mb1 bold>
          {title}
        </P>
        <P lightest mb4 sm>
          {subtitle}
        </P>
        {body && <Content dangerouslySetInnerHTML={{ __html: body }} />}
      </Flex>
    </FlexRow>
  </InfoCardWrapper>
)
