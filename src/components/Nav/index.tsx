import React from 'react'
import s from 'styled-components'

import { BORDER } from '../../constants/colors'
import Logo from './Logo'
import Links from './Links'
import Social from './Social'

const Wrapper = s.header`
  position: fixed;
  height: 100vh;
  width: 20vw;
  left: 0;
  top: 0;
  border-right: 1px solid ${BORDER};
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Header = () => (
  <Wrapper>
    <Logo />
    <Links />
    <Social />
  </Wrapper>
)

export default Header
