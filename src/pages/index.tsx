import React from 'react'
import { Home } from '../components/Home'
import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'

const IndexPage = (): React.ReactElement => (
  <Layout>
    <SEO />
    <Home />
  </Layout>
)

export default IndexPage
