import React from 'react'
import { IIconProps } from './types'

export const InstagramIcon = (props: IIconProps): React.ReactElement => (
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
    <title>Instagram</title>
    <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
  </svg>
)
