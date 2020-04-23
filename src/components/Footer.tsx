import React from 'react'
import s from 'styled-components'
import { Text } from './shared'
import { M1, minWidth, TABLET, M2 } from '../constants/measurements'

const FooterTag = s.footer`
  width: 100%;
  margin-top: ${M1};
  margin-bottom: ${M1};
  display: flex;
  justify-content: space-between;

  ${minWidth(TABLET)} {
    margin-top: ${M2};
    margin-bottom: ${M2};
  }
`

// Scroll to the top of the page
const handleClick = (event: React.MouseEvent): void => {
  if (typeof window === 'undefined') return
  event.preventDefault()
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })
}

export const Footer = (): React.ReactElement => (
  <FooterTag>
    <Text sm mb0 lightest>
      <a href="#top" onClick={handleClick}>
        Back to top &uarr;
      </a>
    </Text>
    <Text sm mb0 lightest>
      Cameron Cabo &copy; {new Date().getFullYear()}
    </Text>
  </FooterTag>
)
