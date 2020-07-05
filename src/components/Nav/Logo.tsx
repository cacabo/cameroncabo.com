import React from 'react'
import s from 'styled-components'
import { Link } from 'gatsby'
import { HOME_ROUTE } from '../../constants/routes'
import { maxWidth, M2, M1, M6, M4, DESKTOP } from '../../constants/measurements'
import { OUTLINE, BLACK } from '../../constants/colors'
import { MEDIUM_FONT_WEIGHT } from '../../constants/fonts'

const SIZE = M6
const MOBILE_SIZE = M4

const StyledLink = s(Link)`
  position: absolute;
  height: ${SIZE};
  line-height: ${SIZE};
  left: ${M2};
  top: ${M1};
  font-size: 100% !important;
  text-decoration: none;
  color: ${BLACK};
  font-weight: ${MEDIUM_FONT_WEIGHT};

  &:focus {
    outline: 0;
    border-radius: 2px;
    box-shadow: 0 0 0 4px ${OUTLINE};
  }

  ${maxWidth(DESKTOP)} {
    margin-top: ${M1};
    display: inline-block;
    width: auto;
    height: ${MOBILE_SIZE};
    line-height: ${MOBILE_SIZE};
    position: relative;
    top: 0;
    left: 0;
  }
`

interface ILogoProps {
  tabIndex?: number | undefined
}

export const Logo = ({ tabIndex }: ILogoProps): React.ReactElement => (
  <StyledLink to={HOME_ROUTE} tabIndex={tabIndex} aria-label="Home">
    Cameron Cabo
  </StyledLink>
)
