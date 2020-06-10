/* eslint-disable max-len */
import React from 'react'
import { IIconProps } from './types'
import { GOLD, LIGHT_GRAY_4 } from '../../../constants/colors'

const StarIcon = (props: IIconProps): React.ReactElement => (
  <svg
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <title>Star</title>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

export const FullStarIcon = (props: IIconProps): React.ReactElement => (
  <StarIcon fill={GOLD} stroke="none" {...props} />
)

export const EmptyStarIcon = (props: IIconProps): React.ReactElement => (
  <StarIcon fill={LIGHT_GRAY_4} stroke="none" {...props} />
)

export const HalfStarIcon = (props: IIconProps): React.ReactElement => (
  <svg
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <title>Half Star</title>
    <polygon
      stroke="none"
      fill={LIGHT_GRAY_4}
      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
    />
    <path
      fill={GOLD}
      stroke="none"
      style={{ transform: 'translateX(-5px)' }}
      d="M10.82 21.02L17 17.77V2l-3.09 6.26L7 9.27l5 4.87-1.18 6.88z"
    />
  </svg>
)

export const Stars = ({ rating }: { rating: number }): React.ReactElement => {
  const starsAsNums: number[] = Array.from({ length: 5 }).map((_, idx) => {
    if (idx + 1 <= rating) {
      return 1
    }
    if (idx + 0.5 === rating) {
      return 0.5
    }
    return 0
  })
  return (
    <div style={{ width: 120, height: 24 }}>
      {starsAsNums.map((num, idx) => {
        const StarComponent =
          num === 1 ? FullStarIcon : num === 0.5 ? HalfStarIcon : EmptyStarIcon
        return <StarComponent key={idx} />
      })}
    </div>
  )
}
