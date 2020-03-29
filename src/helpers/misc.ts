import { TABLET_WIDTH } from '../constants/measurements'

/**
 * Check if the current screen "is on mobile"...that is merits hamburger menu
 */
export const isOnMobile = (): boolean =>
  window && window.innerWidth < TABLET_WIDTH

/**
 * Fix current body position so it can't scroll
 */
export const disableBodyScroll = (): void => {
  const scrollY = window.scrollY
  document.body.style.position = 'fixed'
  document.body.style.top = `-${scrollY}px`
}

/**
 * Reset body styling to allow scrolling
 */
export const enableBodyScroll = (): void => {
  const scrollY = document.body.style.top
  document.body.style.position = ''
  document.body.style.top = ''
  window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
}
