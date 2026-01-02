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

export const WIDESCREEN_WIDTH = 1440
export const WIDESCREEN: TScreenWidth = `${WIDESCREEN_WIDTH}px`

export const DESKTOP_WIDTH = 1024
export const DESKTOP: TScreenWidth = `${DESKTOP_WIDTH}px`

export const TABLET_WIDTH = 848
export const TABLET: TScreenWidth = `${TABLET_WIDTH}px`

export const PHONE_WIDTH = 584
export const PHONE: TScreenWidth = `${PHONE_WIDTH}px`

export const MOBILE_HEADER_HEIGHT = '61.43px'
export const HEADER_HEIGHT = '3.2rem'
export const HEADER_Z_INDEX = 1000

type TMediaQuery = string

export const minWidth = (w: TScreenWidth): TMediaQuery => `@media screen and (min-width: ${w})`
export const maxWidth = (w: TScreenWidth): TMediaQuery => `@media screen and (max-width: ${w})`
