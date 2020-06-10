import { OUTLINE, BLACK, SKY, BLUE, TEAL } from './colors'
import { SHORT_ANIMATION_DURATION } from './measurements'

export const SPACE_KEY_CODE = 32
export const ENTER_KEY_CODE = 13

export const OUTLINE_STYLES = `outline: 0; box-shadow: 0 0 0 3px ${OUTLINE};`

export const LINK_STYLES = `
  color: ${BLACK};
  text-decoration: none !important;
  overflow-wrap: break-word;
  word-break: break-word;
  word-wrap: break-word;

  background: ${SKY};
  border-bottom: 1px solid ${BLUE};
  transition: background ${SHORT_ANIMATION_DURATION}ms ease;

  &:active,
  &:focus,
  &:hover {
    background: ${TEAL};
  }

  &:focus {
    ${OUTLINE_STYLES}
  }
`
