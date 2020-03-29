import React from 'react'
import s from 'styled-components'
import { Link } from 'gatsby'
import { HOME_ROUTE } from '../../constants/routes'
import { maxWidth, M2, M1, M6, M4, TABLET } from '../../constants/measurements'
import { OUTLINE } from '../../constants/colors'

const SIZE = M6
const MOBILE_SIZE = M4

const StyledLink = s(Link)`
  position: absolute;
  height: ${SIZE};
  left: ${M2};
  top: ${M1};

  ${maxWidth(TABLET)} {
    top: 0;
    left: 0;
    position: relative;
  }

  &:focus {
    outline: 0;

    img {
      box-shadow: 0 0 0 4px ${OUTLINE};
    }
  }

  ${maxWidth(TABLET)} {
    height: ${MOBILE_SIZE};
  }
`

const LogoImg = s.img<{}>`
  height: ${SIZE};
  width: auto;
  margin-bottom: 0;
  border-radius: 50%;

  ${maxWidth(TABLET)} {
    height: ${MOBILE_SIZE};
    position: relative;
    top: ${M1};
  }
`

export const Logo = (): React.ReactElement => (
  <StyledLink to={HOME_ROUTE}>
    <LogoImg src="/images/logo.svg" alt="Cameron Cabo" />
  </StyledLink>
)
