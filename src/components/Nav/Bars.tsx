import React, { ReactElement } from 'react'
import s from 'styled-components'

import {
  minWidth,
  TABLET,
  M1,
  MOBILE_HEADER_HEIGHT,
} from '../../constants/measurements'
import { BLACK } from '../../constants/colors'

const Wrapper = s.div`
  padding: 10px 1rem;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: calc(${MOBILE_HEADER_HEIGHT} / 2);
  transform: translateY(-50%);

  &:hover {
    opacity: 0.5;
  }

  ${minWidth(TABLET)} {
    display: none;
  }
`

const Bar = s.span`
  width: 16px;
  height: 2px;
  margin-bottom: 3px;
  display: block;
  background: ${BLACK};
`

interface IBars {
  handleClick: () => void
}

export default ({ handleClick }: IBars): ReactElement => (
  <Wrapper onClick={handleClick}>
    <Bar />
    <Bar />
    <Bar />
  </Wrapper>
)
