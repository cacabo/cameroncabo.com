import React, { useEffect } from 'react'
import { navigate } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Route } from '../constants/routes'
import { Button, H1, P, BR, Center } from '../components/shared'

const NotFoundPage = (): React.ReactElement => {
  useEffect(() => {
    // Redirect from `/posts/...` to `/thoughts/...` to accommodate legacy links
    if (typeof window === 'undefined') return
    const { pathname } = window.location
    if (!pathname || !pathname.startsWith('/posts/')) return
    navigate(`/thoughts/${pathname.substring(7)}`)
  })

  return (
    <Layout>
      <SEO title="404 Not found" />

      <BR />
      <Center>
        <H1 mb4>404: Not Found</H1>
        <P mb2>
          The page you are looking for was either moved or does not exist.
        </P>
        <P>
          If you think this is a mistake, please{' '}
          <a href={Route.CONTACT}>contact me.</a>
        </P>
        <Button to={Route.HOME}>Back to home</Button>
      </Center>
    </Layout>
  )
}

export default NotFoundPage
