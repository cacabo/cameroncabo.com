import React from 'react'
import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Thoughts } from '../components/Thoughts'

const ThoughtsPage = (): React.ReactElement => (
  <Layout>
    <SEO title="Thoughts" />
    <Thoughts />
  </Layout>
)

export default ThoughtsPage
