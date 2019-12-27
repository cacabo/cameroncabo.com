import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import s from 'styled-components'
import { H1, Text, FlexRow, Flex, Button, Buttons } from '../shared'
import {
  GITHUB_ROUTE,
  INSTAGRAM_ROUTE,
  PROJECTS_ROUTE,
  THOUGHTS_ROUTE,
} from '../../constants/routes'
import {
  minWidth,
  DESKTOP,
  WIDESCREEN,
  maxWidth,
  PHONE,
} from '../../constants/measurements'

const Wrapper = s.div<{}>`
  ${minWidth(DESKTOP)} {
    padding: 5vh 0;
  }

  ${minWidth(WIDESCREEN)} {
    padding: 10vh, 0;
  }
`

const IMG_SIZE = '10rem'

const ImgWrapper = s.div<{}>`
  border-radius: 50%;
  height: auto;
  margin-bottom: 1.5rem;
  width: ${IMG_SIZE};
  height: ${IMG_SIZE};
  overflow: hidden;
  margin-right: calc(0.5rem + 2.5%);

  ${maxWidth(PHONE)} {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }
`

// TODO mobile responsiveness
export default () => {
  const data = useStaticQuery(
    graphql`
      query {
        file(relativePath: { eq: "me.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 256) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `,
  )

  const { fluid } = data.file.childImageSharp

  return (
    <Wrapper>
      <FlexRow centerOnMobile>
        <ImgWrapper>
          <Img fluid={fluid} style={{ width: IMG_SIZE, height: IMG_SIZE }} />
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
      </FlexRow>
    </Wrapper>
  )
}
