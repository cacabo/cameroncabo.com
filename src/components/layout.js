import React from 'react'
import s from 'styled-components'

import Nav from './Nav'
import './layout.css'

const Body = s.div`
  width: 80vw;
  margin-left: 20vw;
  maxWidth: 960px;
  padding: 0px 1.0875rem 1.45rem;
  paddingTop: 0;
`

const Content = s.main`
  min-height: calc(100vh - 48px);
`

const Layout = ({ children }) => (
  <>
    <Nav />
    <Body>
      <Content>{children}</Content>
      <footer>© {new Date().getFullYear()}, Cameron Cabo</footer>
    </Body>
  </>
)

export default Layout
