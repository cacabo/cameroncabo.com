import s, { css } from 'styled-components'

interface IText {
  noMargin?: boolean
  sm?: boolean
  color?: string
  lighter?: boolean
  lightest?: boolean
}

export const Text = s.p(
  ({ noMargin, sm, color, lighter, lightest }: IText) => css`
    ${noMargin && `margin: 0;`}
    ${sm && `font-size: 80%;`}
    ${color && `color: ${color};`}
    ${lighter && `opacity: 0.8;`}
    ${lightest && `opacity: 0.64;`}
  `,
)
