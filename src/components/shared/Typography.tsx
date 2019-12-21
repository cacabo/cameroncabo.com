import React from 'react'
import s, { css } from 'styled-components'
import { Children } from '../../types'
import { TEAL, BLACK } from '../../constants/colors'

interface IText {
  noMargin?: boolean
  sm?: boolean
  color?: string
  lighter?: boolean
  lightest?: boolean
  children?: Children
}

export const Text = s.p(
  ({ noMargin, sm, color, lighter, lightest }: IText) => css`
    ${noMargin && `margin: 0;`}
    ${sm && `font-size: 80%;`}
    ${color && `color: ${color};`}
    ${lighter && `opacity: 0.8;`}
    ${lightest && `opacity: 0.64;`}

    a {
      color: ${color || BLACK};
      text-decoration: none !important;
      -o-transition: background 0.15s cubic-bezier(0.33, 0.66, 0.66, 1);
      -webkit-box-shadow: inset 0 -4px 0 $teal;
      -webkit-transition: background 0.15s cubic-bezier(0.33, 0.66, 0.66, 1);
      border-bottom: 2px solid ${TEAL};
      box-shadow: inset 0 -4px 0 ${TEAL};
      color: $black !important;
      overflow-wrap: break-word;
      transition: background 0.15s cubic-bezier(0.33, 0.66, 0.66, 1);
      word-break: break-word;
      word-wrap: break-word;

      &:active,
      &:focus,
      &:hover {
        background-color: ${TEAL};
      }
    }
  `,
)

export const Title = ({ children, ...props }: IText) => (
  <Text as="h1" {...props}>
    {children}
  </Text>
)
