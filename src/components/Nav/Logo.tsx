import React from 'react'
import s from 'styled-components'
import { Link } from 'gatsby'
import { HOME_ROUTE } from '../../constants/routes'
import { BLACK } from '../../constants/colors'
import { MEDIUM_FONT_WEIGHT } from '../../constants/fonts'

const SIZE = '2rem'

const CircleLink = s(Link)<{}>`
  text-decoration: none !important;
  border-radius: 50%;
  border: 2px solid ${BLACK};
  margin: 0;
  padding: 0;
  color: ${BLACK};
  line-height: ${SIZE};
  font-weight: ${MEDIUM_FONT_WEIGHT};
	display: table;
	width: calc(${SIZE} + 4px);
`

const LogoText = s.span<{}>`
	display: table-cell;
	vertical-align: middle;
  text-align: center;
  width: ${SIZE};
  height: ${SIZE};
`

export default (): React.ReactElement => (
  <CircleLink to={HOME_ROUTE}>
    <LogoText>C</LogoText>
  </CircleLink>
)
