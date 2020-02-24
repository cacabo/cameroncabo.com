import React, { useState } from 'react'
import s from 'styled-components'

import { BORDER, WHITE, BLACK_ALPHA } from '../../constants/colors'
import Logo from './Logo'
import Links from './Links'
import Social from './Social'
import {
  maxWidth,
  SHORT_ANIMATION_DURATION,
  HEADER_HEIGHT,
  HEADER_Z_INDEX,
  M1,
  M2,
  TABLET,
  MOBILE_HEADER_HEIGHT,
} from '../../constants/measurements'
import { Bars } from './Bars'
import { Shade } from '../shared'

const Space = s.div`
  display: block;
  width: 100%;
  height: ${HEADER_HEIGHT};

  ${maxWidth(TABLET)} {
    height: ${MOBILE_HEADER_HEIGHT};
  }
`

const Wrapper = s.header<{ active?: boolean }>`
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  border-bottom: 1px solid ${BORDER};
  padding: ${M1} ${M2};
  display: flex;
  flex-direction: row;
  justify-content: center;
  z-index: ${HEADER_Z_INDEX};
  background: ${WHITE};
  box-shadow: 0 1px 3px ${BLACK_ALPHA(0.15)};
  align-items: center;
  height: ${HEADER_HEIGHT};

  ${maxWidth(TABLET)} {
    height: auto;
    max-height: 100vh;
    width: 100vw;
    border-right: 0;
    border-bottom: 1px solid ${BORDER};
    display: block;
    overflow: hidden;
    transition: max-height ${SHORT_ANIMATION_DURATION}ms ease;

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
      <Space />
    </>
  )
}

export default Header
