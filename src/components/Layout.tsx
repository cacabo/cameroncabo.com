import React from 'react'
import s from 'styled-components'

import { Children } from '../types'
import { Nav } from './Nav'
import { Footer } from './Footer'
import { BLACK, TEAL } from '../constants/colors'
import { maxWidth, PHONE, HEADER_HEIGHT } from '../constants/measurements'
import { WideContainer } from './shared'

import './Layout.css'

const Body = s.div`
  padding-top: 1rem;

  ${maxWidth(PHONE)} {
    margin-left: 0;
    margin-right: 0;
  }

  p,
  li,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    a {
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
  }
`

const Content = s.main`
  min-height: calc(100vh - ${HEADER_HEIGHT});
`

const Layout = ({ children }: { children: Children }): React.ReactElement => (
  <>
    <Nav />
    <Nav fixed />
    <Body id="top">
      <WideContainer>
        <Content>{children}</Content>
        <Footer />
      </WideContainer>
    </Body>
  </>
)

export default Layout
