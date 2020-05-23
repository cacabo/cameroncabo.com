import s from 'styled-components'
import {
  minWidth,
  PHONE,
  BORDER_RADIUS,
  DESKTOP,
  M2,
  WIDESCREEN,
} from '../../constants/measurements'

const OFFSET = M2

interface ICalloutProps {
  backgroundImage?: string
}

export const Callout = s.div<ICalloutProps>`
  ${({ backgroundImage }): string =>
    backgroundImage ? `background-image: url("${backgroundImage}");` : ''}
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding: ${OFFSET};
  margin-left: -${OFFSET};
  width: calc(100% + ${OFFSET} + ${OFFSET});

  ${minWidth(PHONE)} {
    border-radius: ${BORDER_RADIUS};
  }

  ${minWidth(DESKTOP)} {
    width: calc(100% + 2rem);
    padding: 1rem;
    margin-left: -1rem;
  }

  ${minWidth(WIDESCREEN)} {
    width: calc(100% + ${M2} + ${M2} + 2.5vw);
    padding: ${M2} calc(${M2} + 1.25vw);
    margin-left: calc(-${M2} - 1.25vw);
  }
`
