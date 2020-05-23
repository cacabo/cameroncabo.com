import React from 'react'
import { P, H3, Row, Col, Text, Button, HR } from '../shared'
import { M1 } from '../../constants/measurements'
import { PROJECTS_ROUTE } from '../../constants/routes'

export const Technologies = (): React.ReactElement => (
  <div>
    <H3 mb4 mt4>
      Technologies
    </H3>
    <HR />

    <Row margin={M1}>
      <Col margin={M1} sm={12} md={6}>
        <P bold mb2>
          General Purpose
        </P>
        <Text>JavaScript, TypeScript, Python, Java, Ruby, C, Haskell.</Text>
        <P bold mb2>
          Web
        </P>
        <Text>
          React (Gatsby, Next), Redux, HTML, CSS (SCSS, styled-components), ERB,
          Handlebars, Angular, EJS, jQuery.
        </Text>
        <P bold mb2>
          Mobile
        </P>
        <Text>React Native, Android.</Text>
      </Col>

      <Col margin={M1} sm={12} md={6}>
        <P bold mb2>
          APIs
        </P>
        <Text>
          Node, Express, Passport, Ruby on Rails, GraphQL, Java Spark,
          Serverless.
        </Text>
        <P bold mb2>
          Databases & Deployment
        </P>
        <Text>
          Postgres, MongoDB, AWS (DynamoDB), Google Cloud Platform, Firebase,
          Heroku, Netlify.
        </Text>
        <P bold mb2>
          Data
        </P>
        <Text>
          Map Reduce, SQL, Spark, Jupyter Notebook, Pandas, Numpy, Storm.
        </Text>
      </Col>
    </Row>
    <Button to={PROJECTS_ROUTE}>See my projects &rarr;</Button>
  </div>
)
