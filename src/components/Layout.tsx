import React from 'react'
import s from 'styled-components'

import { Children } from '../types'
import Nav from './Nav'
import './Layout.css'
import Footer from './Footer'
import { BLACK, TEAL } from '../constants/colors'
import { SIDEBAR_WIDTH, minWidth, DESKTOP } from '../constants/measurements'
import { Container } from './shared'

const Body = s.div`
  margin-left: ${SIDEBAR_WIDTH};
  padding-top: 1rem;

  ${minWidth(DESKTOP)} {
    margin-right: ${SIDEBAR_WIDTH};
  }

  p a,
  li a {
    color: ${BLACK};
    text-decoration: none !important;
    -o-transition: background 0.15s cubic-bezier(0.33, 0.66, 0.66, 1);
    -webkit-box-shadow: inset 0 -4px 0 $teal;
    -webkit-transition: background 0.15s cubic-bezier(0.33, 0.66, 0.66, 1);
    border-bottom: 2px solid ${TEAL};
    box-shadow: inset 0 -4px 0 ${TEAL};
    color: $black !important;
    overflow-wrap: break-word;
    transition: background 0.15s cubic-bezier(0.33, 0.66, 0.66, 1);
    word-break: break-word;
    word-wrap: break-word;

    &:active,
    &:focus,
    &:hover {
      background-color: ${TEAL};
    }
  }
`

const Content = s.main`
  min-height: calc(100vh - 64px);
`

// TODO spacing
// TODO mobile responsiveness
const Layout = ({ children }: { children: Children }): React.ReactElement => (
  <>
    <Nav />
    <Body id="top">
      <Container>
        <Content>{children}</Content>
        <Footer />
      </Container>
    </Body>
  </>
)

export default Layout
