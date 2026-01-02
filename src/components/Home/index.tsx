import React from 'react'
import s from 'styled-components'
import { M1, minWidth, TABLET } from '../../constants/measurements'
import { H3, HR } from '../shared'
import { Education } from './Education'
import { Hero } from './Hero'
import { Reading } from './Reading'
import { RecentProjects } from './RecentProjects'
import { RecentThoughts } from './RecentThoughts'
import { Technologies } from './Technologies'
import { Work } from './Work'

const SectionWrapper = s.section`
  padding: ${M1} 0;

  ${minWidth(TABLET)} {
    padding: calc(1.25vh + ${M1}) 0;
  }
`

const Section: React.FC<
  React.PropsWithChildren<{
    title: string
  }>
> = ({ title, children }) => (
  <SectionWrapper>
    <H3 mb4 mt4>
      {title}
    </H3>
    <HR />
    {children}
  </SectionWrapper>
)

export const Home: React.FC = () => (
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
