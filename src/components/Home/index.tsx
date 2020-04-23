import React from 'react'
import s from 'styled-components'

import { Hero } from './Hero'
import { Education } from './Education'
import { Work } from './Work'
import { Technologies } from './Technologies'
import { RecentProjects } from './RecentProjects'
import { RecentThoughts } from './RecentThoughts'
import { M1, minWidth, TABLET } from '../../constants/measurements'

const Section = s.section`
  padding: ${M1} 0;

  ${minWidth(TABLET)} {
    padding: calc(1.25vh + ${M1}) 0;
  }
`

const HomePage = (): React.ReactElement => (
  <>
    <Hero />
    <Section>
      <Education />
    </Section>
    <Section>
      <Work />
    </Section>
    <Section>
      <Technologies />
    </Section>
    <Section>
      <RecentProjects />
    </Section>
    <Section>
      <RecentThoughts />
    </Section>
  </>
)

export default HomePage
