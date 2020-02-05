import s from 'styled-components'
import {
  minWidth,
  PHONE,
  BORDER_RADIUS,
  DESKTOP,
  M2,
} from '../../constants/measurements'

const OFFSET = M2

export const Callout = s.div<{ backgroundImage?: string }>`
  ${({ backgroundImage }) =>
    backgroundImage && `background-image: url("${backgroundImage}");`}
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding: ${OFFSET};
  margin: 0 -${OFFSET};
  width: calc(100% + ${OFFSET} + ${OFFSET});

  ${minWidth(PHONE)} {
    border-radius: ${BORDER_RADIUS};
  }

  ${minWidth(DESKTOP)} {
    width: calc(100% + 2rem);
    padding: 1rem;
    margin: 0 -1rem;
  }
`
