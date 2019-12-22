import React from 'react'
import s, { css } from 'styled-components'
import { Children } from '../../types'

interface IText {
  mb0?: boolean
  mb1?: boolean
  mb2?: boolean
  mb3?: boolean
  mb4?: boolean
  mt0?: boolean
  mt1?: boolean
  mt2?: boolean
  mt3?: boolean
  mt4?: boolean
  sm?: boolean
  color?: string
  lighter?: boolean
  lightest?: boolean
  children?: Children
}

export const Text = s.p<IText>(
  ({
    sm,
    color,
    lighter,
    lightest,
    mb0,
    mb1,
    mb2,
    mb3,
    mb4,
    mt0,
    mt1,
    mt2,
    mt3,
    mt4,
  }: IText) => css`
    ${mb0 && `margin-bottom: 0;`}
    ${mb1 && `margin-bottom: 0.25rem;`}
    ${mb2 && `margin-bottom: 0.5rem;`}
    ${mb3 && `margin-bottom: 0.75rem;`}
    ${mb4 && `margin-bottom: 1rem;`}
    ${mt0 && `padding-top: 0;`}
    ${mt1 && `padding-top: 0.25rem;`}
    ${mt2 && `padding-top: 0.5rem;`}
    ${mt3 && `padding-top: 0.75rem;`}
    ${mt4 && `padding-top: 1rem;`}
    ${sm && `font-size: 80%;`}
    ${color && `color: ${color};`}
    ${lighter && `opacity: 0.8;`}
    ${lightest && `opacity: 0.64;`}
  `,
)

type TextType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'

const textGenerator = (type: TextType) => ({ children, ...props }: IText) => (
  <Text as={type} {...props}>
    {children}
  </Text>
)

export const H1 = textGenerator('h1')
export const H2 = textGenerator('h2')
export const H3 = textGenerator('h3')
export const H4 = textGenerator('h4')
export const H5 = textGenerator('h5')
export const H6 = textGenerator('h6')
