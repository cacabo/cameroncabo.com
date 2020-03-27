import React from 'react'

import { Hero } from './Hero'
import { Education } from './Education'
import { Work } from './Work'
import { Technologies } from './Technologies'
import { RecentProjects } from './RecentProjects'
import { RecentThoughts } from './RecentThoughts'

const HomePage = (): React.ReactElement => (
  <>
    <Hero />
    <Education />
    <Work />
    <Technologies />
    <RecentProjects />
    <RecentThoughts />
  </>
)

export default HomePage
