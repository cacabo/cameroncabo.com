import s from 'styled-components'
import { Link } from 'gatsby'
import { BLUE, SNOW, SKY, TEAL, BORDER } from '../../constants/colors'
import { MEDIUM_FONT_WEIGHT } from '../../constants/fonts'
import { BORDER_RADIUS } from '../../constants/measurements'

export const Buttons = s.div`
  width: 100%;

  a,
  button {
    margin-right: 0.5rem;
  }
`

interface IButton {
  color?: string
  background?: string
  hoverBackground?: string
  border?: string
}

export const Button = s(Link)<IButton>`
  text-decoration: none;
  user-select: none;
  transition: background 120ms ease-in 0s;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  height: 36px;
  border-radius: ${BORDER_RADIUS};
  color: ${props => props.color || BLUE};
  line-height: 1;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  background: ${props => props.background || SNOW} none repeat scroll 0% 0%;
  font-weight: ${MEDIUM_FONT_WEIGHT};
  box-shadow: ${BORDER} 0px 1px 2px, ${props =>
  props.border || TEAL} 0px 0px 0px 1px inset;
  margin-bottom: 1rem;

  &:hover,
  &:focus,
  &:active {
    background: ${props => props.hoverBackground || props.background || SKY};
  }
`
