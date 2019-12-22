import React from 'react'
import { H2, Text, Button } from '../shared'
import { PROJECTS_ROUTE } from '../../constants/routes'

export default () => (
  <div>
    <H2 mt4 mb4>
      Recent Projects
    </H2>
    <Text>TODO</Text>
    <Button to={PROJECTS_ROUTE}>View projects</Button>
  </div>
)
