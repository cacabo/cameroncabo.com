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
  font-size: 100% !important;

  &:focus {
    outline: 0;

    img {
      box-shadow: 0 0 0 4px ${OUTLINE};
    }
  }

  ${maxWidth(TABLET)} {
    margin-top: ${M1};
    display: block;
    height: ${MOBILE_SIZE};
    position: relative;
    top: 0;
    left: 0;
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
  }
`

interface ILogoProps {
  tabIndex?: number | undefined
}

export const Logo = ({ tabIndex }: ILogoProps): React.ReactElement => (
  <StyledLink to={HOME_ROUTE} tabIndex={tabIndex} aria-label="Home">
    <LogoImg src="/images/logo.svg" alt="Cameron Cabo" />
  </StyledLink>
)
