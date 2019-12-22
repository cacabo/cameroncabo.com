import React from 'react'

import { H1, Text, Button, Buttons } from '../shared'
import {
  GITHUB_ROUTE,
  INSTAGRAM_ROUTE,
  PROJECTS_ROUTE,
  THOUGHTS_ROUTE,
} from '../../constants/routes'
import Education from './Education'

export default () => (
  <>
    <H1>Hi, I'm Cameron</H1>
    <Text>
      I want to leverage tech to help people learn more and live better. I study
      computer science and management in the{' '}
      <a href="https://fisher.wharton.upenn.edu/" target="_BLANK">
        M&T program at UPenn
      </a>
      , and spend my free time{' '}
      <a href="https://www.riplo.io" target="_BLANK">
        developing websites
      </a>
      ,{' '}
      <a href={GITHUB_ROUTE} target="_BLANK">
        learning new things
      </a>
      ,{' '}
      <a href={INSTAGRAM_ROUTE} target="_BLANK">
        and going to new places.
      </a>
    </Text>

    <Buttons>
      <Button to={PROJECTS_ROUTE}>View my projects</Button>
      <Button to={THOUGHTS_ROUTE}>Read some thoughts</Button>
    </Buttons>

    <Education />
  </>
)
