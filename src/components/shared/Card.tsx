import React from 'react'
import s from 'styled-components'
import Img, { FluidObject } from 'gatsby-image'
import { H4, Text } from './Typography'
import { BORDER } from '../../constants/colors'

export const Card = s.div<{}>`
  border: 1px solid ${BORDER};
  border-radius: 3px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: ${BORDER} 0px 1px 2px;
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

export const Row = s.div<{}>`
  width: 100%;
  display: flex;
`

export const Flex = s.div<{}>`
  flex: 1;
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
    <Row>
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
    </Row>
    <Content dangerouslySetInnerHTML={{ __html: body }} />
  </Card>
)
