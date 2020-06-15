import React from 'react'
import { P, Row, Col, Button } from '../shared'
import { M1 } from '../../constants/measurements'
import { PROJECTS_ROUTE } from '../../constants/routes'

export const Technologies = (): React.ReactElement => (
  <>
    <Row margin={M1}>
      <Col margin={M1} sm={12} md={6}>
        <P bold mb2>
          General Purpose
        </P>
        <P>TypeScript, JavaScript, Python, Java, Ruby, C, Haskell.</P>
        <P bold mb2>
          Web
        </P>
        <P>
          React (Gatsby, Next), Redux, HTML, CSS (SCSS, styled-components), ERB,
          Handlebars, Angular, EJS, jQuery.
        </P>
        <P bold mb2>
          Mobile
        </P>
        <P>React Native, Android.</P>
      </Col>

      <Col margin={M1} sm={12} md={6}>
        <P bold mb2>
          APIs
        </P>
        <P>
          Node, Express, Passport, Ruby on Rails, GraphQL (TypeGraphQL), Java
          Spark, Serverless.
        </P>
        <P bold mb2>
          Databases & Deployment
        </P>
        <P>
          Postgres, MongoDB, AWS (DynamoDB), Google Cloud Platform, Firebase,
          Heroku, Netlify.
        </P>
        <P bold mb2>
          Data
        </P>
        <P>Map Reduce, SQL, Spark, Jupyter Notebook, Pandas, Numpy, Storm.</P>
      </Col>
    </Row>
    <Button to={PROJECTS_ROUTE}>See my projects &rarr;</Button>
  </>
)
