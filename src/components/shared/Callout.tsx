import s from 'styled-components'
import {
  minWidth,
  PHONE,
  BORDER_RADIUS,
  DESKTOP,
} from '../../constants/measurements'

export const Callout = s.div<{ backgroundImage?: string }>`
  ${props =>
    props.backgroundImage &&
    `background-image: url("${props.backgroundImage}");`}
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 0.5rem;
  margin: 0 -0.5rem;
  width: calc(100% + 1rem);

  ${minWidth(PHONE)} {
    border-radius: ${BORDER_RADIUS};
  }

  ${minWidth(DESKTOP)} {
    width: calc(100% + 2rem);
    padding: 1rem;
    margin: 0 -1rem;
  }
`
