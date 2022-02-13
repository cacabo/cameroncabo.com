import React from 'react'
import s from 'styled-components'

import { Hero } from './Hero'
import { Education } from './Education'
import { Work } from './Work'
import { Technologies } from './Technologies'
import { RecentProjects } from './RecentProjects'
import { RecentThoughts } from './RecentThoughts'
import { M1, minWidth, TABLET } from '../../constants/measurements'
import { Children } from '../../types'
import { H3, HR } from '../shared'
import { Reading } from './Reading'

const SectionWrapper = s.section`
  padding: ${M1} 0;

  ${minWidth(TABLET)} {
    padding: calc(1.25vh + ${M1}) 0;
  }
`

const Section = ({
  title,
  children,
}: {
  title: string
  children: Children
}): React.ReactElement => (
  <SectionWrapper>
    <H3 mb4 mt4>
      {title}
    </H3>
    <HR />
    {children}
  </SectionWrapper>
)

const HomePage = (): React.ReactElement => (
  <>
    <Hero />
    <Section title="Work">
      <Work />
    </Section>
    <Section title="Education">
      <Education />
    </Section>
    <Section title="Technologies">
      <Technologies />
    </Section>
    <Section title="Recent Projects">
      <RecentProjects />
    </Section>
    <Section title="Recent Thoughts">
      <RecentThoughts />
    </Section>
    <Section title="Reading">
      <Reading />
    </Section>
  </>
)

export default HomePage
