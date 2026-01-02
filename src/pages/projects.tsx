import React from 'react'
import { Layout } from '../components/Layout'
import { Projects } from '../components/Projects'
import { SEO } from '../components/SEO'

const ProjectsPage = (): React.ReactElement => (
  <Layout>
    <SEO title="Projects" />
    <Projects />
  </Layout>
)

export default ProjectsPage
