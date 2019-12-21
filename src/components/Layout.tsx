import React from 'react'
import s from 'styled-components'

import { Children } from '../types'
import Nav from './Nav'
import './Layout.css'
import Footer from './Footer'

const Body = s.div`
  width: 80vw;
  margin-left: 20vw;
  maxWidth: 960px;
  padding: 1rem 1rem 0 1rem;
  paddingTop: 0;
`

const Content = s.main`
  min-height: calc(100vh - 64px);
`

const Layout = ({ children }: { children: Children }): React.ReactElement => (
  <>
    <Nav />
    <Body>
      <Content>{children}</Content>
      <Footer />
    </Body>
  </>
)

export default Layout
