import React from 'react'
import s from 'styled-components'
import { Text } from './shared'

const Footer = s.footer`
  width: 100%;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`

export default (): React.ReactElement => (
  <Footer>
    <Text sm noMargin lightest>
      Cameron Cabo &copy; {new Date().getFullYear()}
    </Text>
  </Footer>
)
