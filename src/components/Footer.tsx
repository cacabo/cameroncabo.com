import React from 'react'
import s from 'styled-components'
import { Text } from './shared'

const Footer = s.footer`
  width: 100%;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
`

// Scroll to the top of the page
const handleClick = (event: React.MouseEvent) => {
  if (typeof window === 'undefined') return
  event.preventDefault()
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })
}

export default (): React.ReactElement => (
  <Footer>
    <Text sm mb0 lightest>
      <a href="#top" onClick={handleClick}>
        Back to top &uarr;
      </a>
    </Text>
    <Text sm mb0 lightest>
      Cameron Cabo &copy; {new Date().getFullYear()}
    </Text>
  </Footer>
)
