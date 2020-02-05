export const SIDEBAR_WIDTH = '198px'

export const HEADER_HEIGHT = '49px'
export const HEADER_Z_INDEX = 1000

export const MARGIN = '0.5rem'
export const MARGIN_LG = '1rem'

export const BORDER_RADIUS = '3px'
export const BORDER_RADIUS_LG = '6px'

export const SHORT_ANIMATION_DURATION = 200
export const LONG_ANIMATION_DURATION = 400

export const M0 = '0'
export const M1 = '0.4rem'
export const M2 = '0.8rem'
export const M3 = '1.2rem'
export const M4 = '1.6rem'
export const M5 = '2.0rem'
export const M6 = '2.4rem'

type TScreenWidth = string

export const WIDESCREEN: TScreenWidth = '1440px'
export const DESKTOP: TScreenWidth = '1024px'
export const TABLET: TScreenWidth = '848px'
export const PHONE: TScreenWidth = '584px'

type TMediaQuery = string

export const minWidth = (w: TScreenWidth): TMediaQuery =>
  `@media screen and (min-width: ${w})`
export const maxWidth = (w: TScreenWidth): TMediaQuery =>
  `@media screen and (max-width: ${w})`
