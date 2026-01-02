import React from 'react'
import s from 'styled-components'
import { M2 } from '../constants/measurements'
import { P } from './shared'

const FooterTag = s.footer`
  width: 100%;
  margin-top: ${M2};
  margin-bottom: ${M2};
  display: flex;
  justify-content: space-between;
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
    <P sm mb0 lightest>
      <a href="#top" onClick={handleClick}>
        Back to top &uarr;
      </a>
    </P>
    <P sm mb0 lightest>
      Cameron Cabo &copy; {new Date().getFullYear()}
    </P>
  </FooterTag>
)
