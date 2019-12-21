import s from 'styled-components'
import { Link } from 'gatsby'
import { BLUE, BLACK, SNOW, SKY, TEAL } from '../../constants/colors'
import { MEDIUM_FONT_WEIGHT } from '../../constants/fonts'

export const Buttons = s.div`
  width: 100%;

  a,
  button {
    margin-right: 0.5rem;
  }
`

export const Button = s(Link)`
  text-decoration: none;
  user-select: none;
  transition: background 120ms ease-in 0s;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  height: 36px;
  border-radius: 3px;
  color: ${BLUE};
  line-height: 1;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  background: ${SNOW} none repeat scroll 0% 0%;
  font-weight: ${MEDIUM_FONT_WEIGHT};
  box-shadow: rgba(15, 15, 15, 0.1) 0px 1px 2px, ${TEAL} 0px 0px 0px 1px inset;

  &:hover,
  &:focus,
  &:active {
    background: ${SKY};
  }
`
