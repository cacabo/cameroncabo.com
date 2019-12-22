import React from 'react'
import s from 'styled-components'

import { BORDER } from '../../constants/colors'
import Logo from './Logo'
import Links from './Links'
import Social from './Social'
import { SIDEBAR_WIDTH } from '../../constants/measurements'

const Wrapper = s.header`
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
`

// TODO mobile responsiveness
const Header = () => (
  <Wrapper>
    <Logo />
    <Links />
    <Social />
  </Wrapper>
)

export default Header
