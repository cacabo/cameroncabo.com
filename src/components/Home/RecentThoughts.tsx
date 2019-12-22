import React from 'react'
import { H2, Text, Button } from '../shared'
import { THOUGHTS_ROUTE } from '../../constants/routes'

export default () => (
  <div>
    <H2 mt4 mb4>
      Recent Thoughts
    </H2>
    <Text>TODO</Text>
    <Button to={THOUGHTS_ROUTE}>View thoughts</Button>
  </div>
)
