import React, { useState, useEffect } from 'react'
import s, { css } from 'styled-components'

import { BORDER, WHITE, BLACK_ALPHA } from '../../constants/colors'
import { Logo } from './Logo'
import { Links } from './Links'
import { Social } from './Social'
import {
  maxWidth,
  SHORT_ANIMATION_DURATION,
  HEADER_HEIGHT,
  HEADER_Z_INDEX,
  M1,
  M2,
  TABLET,
} from '../../constants/measurements'
import { Bars } from './Bars'
import { Shade } from '../shared'
import { isOnMobile } from '../../helpers/misc'

const getScrollTop = (): number =>
  window.pageYOffset !== undefined
    ? window.pageYOffset
    : (((document.documentElement ||
        document.body.parentNode ||
        document.body) as unknown) as { scrollTop: number }).scrollTop || 0

interface IWrapperProps {
  active?: boolean
  fixed?: boolean
  shouldShowFixed?: boolean
}

const Wrapper = s.header<IWrapperProps>(
  ({ fixed, shouldShowFixed, active }) => css`
    position: ${fixed ? 'fixed' : 'absolute'};
    width: 100%;
    left: 0;
    top: ${fixed ? (shouldShowFixed ? '0' : '-4rem') : '0'};
    transition: all ${SHORT_ANIMATION_DURATION}ms ease;
    padding: ${M1} ${M2};
    display: flex;
    flex-direction: row;
    justify-content: center;
    z-index: ${HEADER_Z_INDEX};
    background: ${WHITE};
    box-shadow: 0 0 4px ${BLACK_ALPHA(0.25)};
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

      ${!active && `max-height: ${HEADER_HEIGHT};`}
    }
  `,
)

const NavSpace = s.div`
  width: 100%;
  display: block;
  height: ${HEADER_HEIGHT};
`

interface IHeaderProps {
  fixed?: boolean
}

interface IFixedState {
  prevScrollTop: number
  shouldShowFixed: boolean
}

interface IActiveState {
  isNewlyMounted: boolean
  isActive: boolean
}

export const Nav = ({ fixed }: IHeaderProps): React.ReactElement => {
  const [{ prevScrollTop, shouldShowFixed }, setFixedState] = useState<
    IFixedState
  >({
    prevScrollTop: 0,
    shouldShowFixed: false,
  })
  const [{ isActive, isNewlyMounted }, setActiveState] = useState<IActiveState>(
    {
      isNewlyMounted: true,
      isActive: false,
    },
  )

  useEffect(() => {
    if (!fixed) {
      return
    }

    const handleScroll = (): void => {
      if (isActive) {
        return
      }

      const scrollTop = getScrollTop()
      const diff = scrollTop - prevScrollTop

      if (shouldShowFixed && scrollTop < 200 && diff < -50) {
        return setFixedState({
          prevScrollTop: scrollTop,
          shouldShowFixed: false,
        })
      }

      if (!shouldShowFixed && diff < -50 && scrollTop > 200) {
        return setFixedState({
          prevScrollTop: scrollTop,
          shouldShowFixed: true,
        })
      }

      if (shouldShowFixed && diff > 10) {
        return setFixedState({
          prevScrollTop: scrollTop,
          shouldShowFixed: false,
        })
      }

      if (diff > 50 || diff < -50) {
        return setFixedState({
          prevScrollTop: scrollTop,
          shouldShowFixed,
        })
      }
    }

    window.addEventListener('scroll', handleScroll)

    return (): void => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  const toggle = (): void => {
    if (isNewlyMounted) {
      return setActiveState({ isNewlyMounted: false, isActive: !isActive })
    }

    return setActiveState({
      isNewlyMounted,
      isActive: !isActive,
    })
  }

  const isMobile = isOnMobile()
  const logoTabIndex: number | undefined = fixed ? -1 : undefined
  const barsTabIndex: number | undefined = fixed
    ? -1
    : !isMobile
    ? -1
    : undefined
  const tabIndex: number | undefined = fixed
    ? -1
    : isMobile && !isActive
    ? -1
    : undefined

  return (
    <>
      <Wrapper
        active={isActive}
        fixed={fixed}
        shouldShowFixed={shouldShowFixed}
        tabIndex={tabIndex}
      >
        <Logo tabIndex={logoTabIndex} />
        <Bars handleClick={toggle} tabIndex={barsTabIndex} />
        <Links active={isActive} tabIndex={tabIndex} />
        <Social active={isActive} tabIndex={tabIndex} />
      </Wrapper>
      {!fixed && <NavSpace tabIndex={-1} />}
      <Shade
        onClick={toggle}
        show={isActive}
        zIndex={HEADER_Z_INDEX - 1}
        isNewlyMounted={isNewlyMounted}
      />
    </>
  )
}
