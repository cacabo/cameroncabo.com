import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { HOME_ROUTE } from '../constants/routes'
import { Button, H1, Text } from '../components/shared'

const NotFoundPage = () => (
  <Layout>
    <SEO title="404 Not found" />
    <H1>404: Not Found</H1>
    <Text>The page you are looking for was moved or does not exist.</Text>
    <Button to={HOME_ROUTE}>Back to home</Button>
  </Layout>
)

export default NotFoundPage
