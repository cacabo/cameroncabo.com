import s, { css } from 'styled-components'
import { fadeIn, fadeOut } from './animations'
import { SHORT_ANIMATION_DURATION } from '../../constants/measurements'
import { BLACK_ALPHA } from '../../constants/colors'

interface IShadeProps {
  show: boolean
  isNewlyMounted: boolean
  zIndex: number
}

export const Shade = s.div<IShadeProps>(
  ({ zIndex, show, isNewlyMounted }) => css`
    position: fixed;
    width: 100vw;
    height: 100vh;

    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    overflow-x: hidden;
    overflow-y: hidden;
    background: ${BLACK_ALPHA(0.75)};
    z-index: ${zIndex};
    text-align: center;

    animation-name: ${isNewlyMounted ? '' : show ? fadeIn : fadeOut};

    animation-duration: ${SHORT_ANIMATION_DURATION}ms;
    max-height: ${show ? '100vh' : '0vh'};
    opacity: ${show ? '1' : '0'};
  `,
)
