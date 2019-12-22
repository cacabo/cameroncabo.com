import React from 'react'
import { Card, H2, H4, Row, Col, Text, Button } from '../shared'
import { MARGIN } from '../../constants/measurements'
import { PROJECTS_ROUTE } from '../../constants/routes'

export default () => (
  <div>
    <H2 mb4 mt4>
      Technologies
    </H2>

    <Row margin={MARGIN}>
      <Col margin={MARGIN} sm={12} md={6}>
        <Card>
          <H4 mb2>General Purpose</H4>
          <Text>JavaScript, TypeScript, Python, Java, Ruby, C, Haskell.</Text>
          <H4 mb2>Web</H4>
          <Text>
            React (Gatsby, Next), Redux, HTML, CSS (SCSS, styled-components),
            ERB, Handlebars, Angular, EJS, jQuery.
          </Text>
          <H4 mb2>Mobile</H4>
          <Text mb0>React Native, Android.</Text>
        </Card>
      </Col>

      <Col margin={MARGIN} sm={12} md={6}>
        <Card>
          <H4 mb2>APIs</H4>
          <Text>
            Node, Express, Passport, Ruby on Rails, GraphQL, Java Spark,
            Serverless.
          </Text>
          <H4 mb2>Databases & Deployment</H4>
          <Text>
            Postgres, MongoDB, AWS (DynamoDB), Google Cloud Platform, Firebase,
            Heroku, Netlify.
          </Text>
          <H4 mb2>Data</H4>
          <Text mb0>
            Map Reduce, SQL, Spark, Jupyter Notebook, Pandas, Numpy, Storm.
          </Text>
        </Card>
      </Col>
    </Row>
    <Button to={PROJECTS_ROUTE}>See my projects &rarr;</Button>
  </div>
)
