import React, { ReactElement } from 'react'
import s from 'styled-components'

import { MenuIcon } from '../shared'
import {
  minWidth,
  TABLET,
  MOBILE_HEADER_HEIGHT,
  SHORT_ANIMATION_DURATION,
} from '../../constants/measurements'
import { OUTLINE } from '../../constants/colors'
import {
  SPACE_KEY_CODE,
  ENTER_KEY_CODE,
  OUTLINE_STYLES,
} from '../../constants/misc'

const Wrapper = s.div`
  margin-right: 1rem;
  height: 24px;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: calc(${MOBILE_HEADER_HEIGHT} / 2);
  transform: translateY(-50%);
  transition: opacity ${SHORT_ANIMATION_DURATION}ms ease;

  &:hover {
    opacity: 0.5;
  }

  ${minWidth(TABLET)} {
    display: none;
  }

  svg {
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
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.keyCode === SPACE_KEY_CODE || event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault()
      handleClick()
    }
  }

  return (
    <Wrapper
      tabIndex={tabIndex || 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <MenuIcon />
    </Wrapper>
  )
}
