import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import s from 'styled-components'
import { H1, Text, Row, Flex, Button, Buttons } from '../shared'
import {
  GITHUB_ROUTE,
  INSTAGRAM_ROUTE,
  PROJECTS_ROUTE,
  THOUGHTS_ROUTE,
} from '../../constants/routes'

const IMG_SIZE = '10rem'

const ImgWrapper = s.div<{}>`
  border-radius: 50%;
  height: auto;
  margin-bottom: 1.5rem;
  width: ${IMG_SIZE};
  height: ${IMG_SIZE};
  overflow: hidden;
  margin-right: calc(0.5rem + 2.5%);
`

export default () => (
  <StaticQuery
    query={graphql`
      query {
        file(relativePath: { eq: "me.jpg" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
      <Row>
        <ImgWrapper>
          <Img
            fluid={data.file.childImageSharp.fluid}
            style={{ width: IMG_SIZE, height: IMG_SIZE }}
          />
        </ImgWrapper>
        <Flex>
          <H1 mb4>Hi, I'm Cameron</H1>
          <Text>
            I want to leverage tech to help people learn more and live better. I
            study computer science and management in the{' '}
            <a href="https://fisher.wharton.upenn.edu/" target="_BLANK">
              M&T program at UPenn,
            </a>{' '}
            and spend my free time{' '}
            <a href="https://www.riplo.io" target="_BLANK">
              developing websites,
            </a>{' '}
            <a href={GITHUB_ROUTE} target="_BLANK">
              learning new things,
            </a>{' '}
            <a href={INSTAGRAM_ROUTE} target="_BLANK">
              and going to new places.
            </a>
          </Text>
          <Buttons>
            <Button to={PROJECTS_ROUTE}>Projects</Button>
            <Button to={THOUGHTS_ROUTE}>Thoughts</Button>
          </Buttons>
        </Flex>
      </Row>
    )}
  />
)
