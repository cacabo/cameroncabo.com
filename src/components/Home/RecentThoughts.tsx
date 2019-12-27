import React from 'react'
import { H3, Text, Button } from '../shared'
import { THOUGHTS_ROUTE } from '../../constants/routes'

export default () => (
  <div>
    <H3 mt4 mb4>
      Recent Thoughts
    </H3>
    <Text>TODO</Text>
    <Button to={THOUGHTS_ROUTE}>View thoughts</Button>
  </div>
)
