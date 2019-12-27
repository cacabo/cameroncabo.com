import s from 'styled-components'
import { BLUE, SKY } from '../../constants/colors'
import { BORDER_RADIUS } from '../../constants/measurements'
import { MEDIUM_FONT_WEIGHT } from '../../constants/fonts'

interface ITag {
  color?: string
  background?: string
}

export const Tag = s.span<ITag>`
  color: ${props => props.color || BLUE};
  background: ${props => props.background || SKY};
  border-radius: ${BORDER_RADIUS};
  padding: 2px 6px;
  margin-right: 8px;
  font-weight: ${MEDIUM_FONT_WEIGHT};
`
