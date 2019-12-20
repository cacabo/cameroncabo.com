import { Link } from 'gatsby'
import React from 'react'
import s from 'styled-components'
import { HOME_ROUTE } from '../../constants/routes'
import Social from './Social'

const Wrapper = s.header`
  margin-bottom: 1.45rem;
  position: fixed;
  height: 100vh;
  width: 20vw;
  left: 0;
  top: 0;
`

const Header = ({ siteTitle }) => (
  <Wrapper>
    <h1 style={{ margin: 0 }}>
      <Link
        to={HOME_ROUTE}
        style={{
          textDecoration: `none`,
        }}
      >
        Cameron Cabo
      </Link>
    </h1>

    <Social />
  </Wrapper>
)

export default Header
