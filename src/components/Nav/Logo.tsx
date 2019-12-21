import React from 'react'
import s from 'styled-components'
import { Link } from 'gatsby'
import { HOME_ROUTE } from '../../constants/routes'
import { BLACK, SKY } from '../../constants/colors'
import { MEDIUM_FONT_WEIGHT } from '../../constants/fonts'

const SIZE = '2rem'

const CircleLink = s(Link)<{}>`
  text-decoration: none !important;
  background: ${SKY};
  display: inline-block;
  border-radius: 50%;
  height: ${SIZE};
  width: ${SIZE};
  text-align: center;
`

const LogoText = s.span<{}>`
  color: ${BLACK};
  line-height: ${SIZE};
  margin-bottom: 0;
  font-weight: ${MEDIUM_FONT_WEIGHT};
`

export default (): React.ReactElement => (
  <CircleLink to={HOME_ROUTE}>
    <LogoText>C</LogoText>
  </CircleLink>
)
