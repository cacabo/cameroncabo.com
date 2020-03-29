import { TABLET_WIDTH } from '../constants/measurements'

export const isOnMobile = (): boolean =>
  window && window.innerWidth < TABLET_WIDTH
