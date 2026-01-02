import React, { useState } from 'react'
import s, { createGlobalStyle } from 'styled-components'

import { Children } from '../types'
import { Nav } from './Nav'
import { Footer } from './Footer'
import { maxWidth, PHONE, HEADER_HEIGHT, M2 } from '../constants/measurements'
import { WideContainer, ContainerFluid } from './shared'

import './Layout.css'
import { LINK_STYLES } from '../constants/misc'
import { BOLD_FONT_WEIGHT, FONT } from '../constants/fonts'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${FONT};
  }

  h1, h2, h3, h4, h5, h6,
  .h1, .h2, .h3, .h4, .h5, .h6 {
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
      ${LINK_STYLES}
    }
  }

  @media only screen and (max-width: ${PHONE}) {
    html {
      font-size: 100%;
    }
  }

  div {
    line-height: 1.45;
    font-size: 1rem;
  }
`

const Body = s.div<{ mt0: boolean }>`
  padding-top: ${(props): string => (props.mt0 ? '0' : M2)};
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

interface ILayoutProps {
  wide?: boolean
  mt0?: boolean
  children: Children
}

const Layout = ({ wide, mt0, children }: ILayoutProps): React.ReactElement => {
  const [shouldHideBody, setShouldHideBody] = useState<boolean>(false)
  const ContainerComponent = wide ? ContainerFluid : WideContainer

  return (
    <>
      <GlobalStyle />
      <Nav setShouldHideBody={setShouldHideBody} />
      <Nav setShouldHideBody={setShouldHideBody} fixed />
      <Body id="top" aria-hidden={shouldHideBody} mt0={mt0 ?? false}>
        <ContainerComponent>
          <Content>{children}</Content>
          <Footer />
        </ContainerComponent>
      </Body>
    </>
  )
}

export default Layout
