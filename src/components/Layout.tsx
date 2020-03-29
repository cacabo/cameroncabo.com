import React from 'react'
import s from 'styled-components'

import { Children } from '../types'
import { Nav } from './Nav'
import { Footer } from './Footer'
import { BLACK, BLUE, SKY, TEAL } from '../constants/colors'
import {
  maxWidth,
  PHONE,
  HEADER_HEIGHT,
  SHORT_ANIMATION_DURATION,
} from '../constants/measurements'
import { WideContainer } from './shared'

import './Layout.css'
import { OUTLINE_STYLES } from '../constants/misc'

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
      overflow-wrap: break-word;
      word-break: break-word;
      word-wrap: break-word;

      background: ${SKY};
      border-bottom: 1px solid ${BLUE};
      transition: background ${SHORT_ANIMATION_DURATION}ms ease;
  
      &:active,
      &:focus,
      &:hover {
        background: ${TEAL};
      }

      &:focus {
        ${OUTLINE_STYLES}
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
