import s from 'styled-components'
import { BLUE, SKY } from '../../constants/colors'
import { BORDER_RADIUS } from '../../constants/measurements'
import { MEDIUM_FONT_WEIGHT } from '../../constants/fonts'

interface ITag {
  color?: string
  background?: string
  sm?: boolean
}

export const Tag = s.div<ITag>`
  display: inline-block;
  color: ${(props): string => props.color || BLUE};
  background: ${(props): string => props.background || SKY};
  border-radius: ${BORDER_RADIUS};
  padding: 2px 6px;
  margin-right: 6px;
  margin-bottom: 6px;
  font-weight: ${MEDIUM_FONT_WEIGHT};
  ${(props): string => (props.sm ? 'font-size: 80%;' : '')}
`

export const Tags = s.div`
  margin-bottom: -6px;
`
