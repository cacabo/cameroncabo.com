import React, { ReactElement } from 'react'
import s from 'styled-components'

import { MenuIcon } from '../shared'
import {
  MOBILE_HEADER_HEIGHT,
  SHORT_ANIMATION_DURATION,
  maxWidth,
  DESKTOP,
} from '../../constants/measurements'
import { SPACE_KEY_CODE, ENTER_KEY_CODE, OUTLINE_STYLES } from '../../constants/misc'

const ICON_HEIGHT = 24
const PADDING = 8

const Wrapper = s.button`
  margin-right: 0.8rem;
  cursor: pointer;
  position: absolute;
  right: -${PADDING}px;
  top: calc(${MOBILE_HEADER_HEIGHT} / 2);
  transform: translateY(-50%);
  transition: opacity ${SHORT_ANIMATION_DURATION}ms ease;
  display: none;
  color: inherit;
  background-color: transparent;
  border: 0;
  box-shadow: none;
  padding: ${PADDING}px;
  height: ${ICON_HEIGHT + PADDING * 2}px;

  &:hover {
    opacity: 0.5;
  }

  ${maxWidth(DESKTOP)} {
    display: block;
    top: calc(${MOBILE_HEADER_HEIGHT} / 2 - 1px);
  }

  svg {
    height: ${ICON_HEIGHT}px;
    padding: 0;
    margin: 0;
    display: inline-block;
  }

  &:focus {
    ${OUTLINE_STYLES}
    border-radius: 2px;
  }
`

interface IBars {
  tabIndex?: number
  handleClick: () => void
}

export const Bars = ({ tabIndex, handleClick }: IBars): ReactElement => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>): void => {
    if (event.keyCode === SPACE_KEY_CODE || event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault()
      handleClick()
    }
  }

  return (
    <Wrapper tabIndex={tabIndex || 0} onClick={handleClick} onKeyDown={handleKeyDown} role="button">
      <MenuIcon />
    </Wrapper>
  )
}
