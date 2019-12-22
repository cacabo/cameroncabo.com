import React from 'react'
import s from 'styled-components'
import Img, { FluidObject } from 'gatsby-image'
import { H4, Text } from './Typography'

export const Card = s.div<{}>``

interface IInfoCard {
  title: string
  subtitle?: string
  fluidImage?: FluidObject
  body: string
}

export const InfoCard = ({ title, fluidImage, subtitle, body }: IInfoCard) => (
  <div>
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <H4 mb1>{title}</H4>
        <Text lighter mb2 sm>
          {subtitle}
        </Text>
      </div>
      {fluidImage && (
        <div
          style={{
            minWidth: '48px',
            height: '48px',
            marginLeft: '0.5rem',
          }}
        >
          <Img fluid={fluidImage} />
        </div>
      )}
    </div>
    <div dangerouslySetInnerHTML={{ __html: body }} />
  </div>
)
