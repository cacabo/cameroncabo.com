import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { HOME_ROUTE, CONTACT_ROUTE } from '../constants/routes'
import { Button, H1, P } from '../components/shared'

const NotFoundPage = () => (
  <Layout>
    <SEO title="404 Not found" />
    <H1 mb4>404: Not Found</H1>
    <P mb2>The page you are looking for was either moved or does not exist.</P>
    <P>
      If you think this is a mistake, please{' '}
      <a href={CONTACT_ROUTE}>contact me.</a>
    </P>
    <Button to={HOME_ROUTE}>Back to home</Button>
  </Layout>
)

export default NotFoundPage
