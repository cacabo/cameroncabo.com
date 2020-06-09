import React, { CSSProperties } from 'react'
import s, { css } from 'styled-components'
import { Children } from '../../types'
import { BORDER, GRAY_1, GRAY_2, WHITE, BLACK } from '../../constants/colors'
import { BOLD_FONT_WEIGHT, MEDIUM_FONT_WEIGHT } from '../../constants/fonts'

/**
 * NOTE these are generic styles for ALL text
 *
 * To add specific styles to a specific text field (for example, `h1` tags, that
 * should be done in the `Layout.css` file)
 */

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
  bold?: boolean
  medium?: boolean
  color?: string
  lighter?: boolean
  lightest?: boolean
  dangerouslySetInnerHTML?: any
  children?: Children
  style?: CSSProperties
  black?: boolean
  white?: boolean
}

const Text = s.p<IText>(
  ({
    sm,
    white,
    black,
    color,
    lighter,
    lightest,
    bold,
    medium,
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
    ${mb0 && 'margin-bottom: 0;'}
    ${mb1 && 'margin-bottom: 0.25rem;'}
    ${mb2 && 'margin-bottom: 0.5rem;'}
    ${mb3 && 'margin-bottom: 0.75rem;'}
    ${mb4 && 'margin-bottom: 1rem;'}

    ${mt0 && 'padding-top: 0;'}
    ${mt1 && 'padding-top: 0.25rem;'}
    ${mt2 && 'padding-top: 0.5rem;'}
    ${mt3 && 'padding-top: 0.75rem;'}
    ${mt4 && 'padding-top: 1rem;'}

    ${lighter && `color: ${GRAY_1};`}
    ${lightest && `color: ${GRAY_2};`}

    ${color && `color: ${color};`}
    ${white && `color: ${WHITE};`}
    ${black && `color: ${BLACK};`}

    ${sm && 'font-size: 80%;'}
    ${medium && `font-weight: ${MEDIUM_FONT_WEIGHT};`}
    ${bold && `font-weight: ${BOLD_FONT_WEIGHT};`}
  `,
)

type TextType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'

const textGenerator = (type: TextType) => ({
  children,
  ...props
}: IText): React.ReactElement => (
  <Text as={type} {...props}>
    {children}
  </Text>
)

export const P = textGenerator('p')
export const H1 = textGenerator('h1')
export const H2 = textGenerator('h2')
export const H3 = textGenerator('h3')
export const H4 = textGenerator('h4')
export const H5 = textGenerator('h5')
export const H6 = textGenerator('h6')

export const HR = s.hr`
  background: ${BORDER};
  height: 2px;
`
