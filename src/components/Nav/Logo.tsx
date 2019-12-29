import React from 'react'
import s from 'styled-components'
import { Link } from 'gatsby'
import { HOME_ROUTE } from '../../constants/routes'
import { maxWidth, PHONE } from '../../constants/measurements'

const SIZE = '2.5rem'
const MOBILE_SIZE = '2rem'

const Logo = s.img<{}>`
  width: ${SIZE};
  margin-bottom: 0;

  ${maxWidth(PHONE)} {
    width: ${MOBILE_SIZE};
  }
`

export default (): React.ReactElement => (
  <Link to={HOME_ROUTE}>
    <Logo src="/images/logo.svg" />
  </Link>
)
