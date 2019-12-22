import React from 'react'
import s from 'styled-components'
import Img, { FluidObject } from 'gatsby-image'
import { H4, Text } from './Typography'
import { FlexRow, Flex } from './Grid'
import { BORDER } from '../../constants/colors'
import { BORDER_RADIUS, PHONE, maxWidth } from '../../constants/measurements'

export const Card = s.div<{}>`
  border: 1px solid ${BORDER};
  border-radius: ${BORDER_RADIUS};
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: ${BORDER} 0px 1px 2px;

  ${maxWidth(PHONE)} {
    padding: 0.5rem;
  }
`

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
        <H4 mb1>{title}</H4>
        <Text lighter mb2 sm>
          {subtitle}
        </Text>
      </Flex>
      {(fluidImage || imageUrl) && (
        <div
          style={{
            minWidth: '48px',
            height: '48px',
            marginLeft: '0.5rem',
          }}
        >
          {fluidImage ? (
            <Img fluid={fluidImage} />
          ) : (
            <img
              style={{ width: '48px', maxHeight: '48px' }}
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
