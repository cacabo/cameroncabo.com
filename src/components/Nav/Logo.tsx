import React from 'react'
import s from 'styled-components'
import { Link } from 'gatsby'
import { HOME_ROUTE } from '../../constants/routes'
import { maxWidth, M2, M1, M6, M4, TABLET } from '../../constants/measurements'

const SIZE = M6
const MOBILE_SIZE = M4

const StyledLink = s(Link)`
  position: absolute;
  left: ${M2};
  top: ${M1};

  ${maxWidth(TABLET)} {
    top: 0;
    left: 0;
    position: relative;
  }
`

const Logo = s.img<{}>`
  width: ${SIZE};
  margin-bottom: 0;

  ${maxWidth(TABLET)} {
    width: ${MOBILE_SIZE};
    position: relative;
    top: ${M1};
  }
`

export default (): React.ReactElement => (
  <StyledLink to={HOME_ROUTE}>
    <Logo src="/images/logo.svg" />
  </StyledLink>
)
