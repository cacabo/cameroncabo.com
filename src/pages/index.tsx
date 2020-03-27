import React from 'react'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Home from '../components/Home'

const IndexPage = (): React.ReactElement => (
  <Layout>
    <SEO />
    <Home />
  </Layout>
)

export default IndexPage
