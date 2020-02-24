import React, { ReactElement } from 'react'
import s from 'styled-components'

import { MenuIcon } from '../shared'
import {
  minWidth,
  TABLET,
  MOBILE_HEADER_HEIGHT,
  SHORT_ANIMATION_DURATION,
} from '../../constants/measurements'

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
`

interface IBars {
  handleClick: () => void
}

export const Bars = ({ handleClick }: IBars): ReactElement => (
  <Wrapper onClick={handleClick}>
    <MenuIcon />
  </Wrapper>
)
