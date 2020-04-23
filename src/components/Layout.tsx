import React, { useState } from 'react'
import s, { createGlobalStyle } from 'styled-components'

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
import { BOLD_FONT_WEIGHT, FONT } from '../constants/fonts'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${FONT};
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${BOLD_FONT_WEIGHT};
    text-rendering: optimizeLegibility;
  }
  
  p,
  li,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    color: inherit;

    font-family: ${FONT};

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

  @media only screen and (max-width: ${PHONE}) {
    html {
      font-size: 100%;
    }
  }
`

const Body = s.div`
  padding-top: 1rem;
  width: 100vw;
  overflow-x: hidden;

  ${maxWidth(PHONE)} {
    margin-left: 0;
    margin-right: 0;
  }
`

const Content = s.main`
  min-height: calc(100vh - ${HEADER_HEIGHT});
`

const Layout = ({ children }: { children: Children }): React.ReactElement => {
  const [shouldHideBody, setShouldHideBody] = useState<boolean>(false)

  return (
    <>
      <GlobalStyle />
      <Nav setShouldHideBody={setShouldHideBody} />
      <Nav setShouldHideBody={setShouldHideBody} fixed />
      <Body id="top" aria-hidden={shouldHideBody}>
        <WideContainer>
          <Content>{children}</Content>
          <Footer />
        </WideContainer>
      </Body>
    </>
  )
}

export default Layout
