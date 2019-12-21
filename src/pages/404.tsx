import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { HOME_ROUTE } from '../constants/routes'

const NotFoundPage = () => (
  <Layout>
    <SEO title="404 Not found" />
    <h1>404: Not Found</h1>
    <p>The page you are looking for was moved or does not exist.</p>
    <Link to={HOME_ROUTE}>Back to home</Link>
  </Layout>
)

export default NotFoundPage
