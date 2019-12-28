import React, { useState } from 'react'
import s from 'styled-components'

import { BORDER, WHITE, BLACK_ALPHA } from '../../constants/colors'
import Logo from './Logo'
import Links from './Links'
import Social from './Social'
import {
  SIDEBAR_WIDTH,
  maxWidth,
  PHONE,
  SHORT_ANIMATION_DURATION,
  HEADER_HEIGHT,
  HEADER_Z_INDEX,
  MARGIN,
} from '../../constants/measurements'
import Bars from './Bars'
import { Shade } from '../shared'

const Wrapper = s.header<{ active?: boolean }>`
  position: fixed;
  height: 100vh;
  width: ${SIDEBAR_WIDTH};
  left: 0;
  top: 0;
  border-right: 1px solid ${BORDER};
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: ${HEADER_Z_INDEX};

  ${maxWidth(PHONE)} {
    height: auto;
    max-height: 100vh;
    width: 100vw;
    border-right: 0;
    padding: 0.4rem ${MARGIN};
    background: ${WHITE};
    border-bottom: 1px solid ${BORDER};
    display: block;
    overflow: hidden;
    transition: max-height ${SHORT_ANIMATION_DURATION}ms ease;
    box-shadow: 0 1px 3px ${BLACK_ALPHA(0.15)};

    ${props => !props.active && `max-height: ${HEADER_HEIGHT};`}
  }
`

const Header = () => {
  const [active, setActive] = useState<boolean>(false)
  const [isNewlyMounted, setIsNewlyMounted] = useState<boolean>(true)

  const toggle = () => {
    if (isNewlyMounted) setIsNewlyMounted(false)
    setActive(!active)
  }

  return (
    <>
      <Wrapper active={active}>
        <Logo />
        <Bars handleClick={toggle} />
        <Links active={active} />
        <Social active={active} />
      </Wrapper>
      <Shade
        onClick={toggle}
        show={active}
        zIndex={HEADER_Z_INDEX - 1}
        isNewlyMounted={isNewlyMounted}
      />
    </>
  )
}

export default Header
