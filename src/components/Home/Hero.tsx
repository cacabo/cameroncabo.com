import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image'
import React from 'react'
import s from 'styled-components'

import { DESKTOP, maxWidth, minWidth, PHONE, WIDESCREEN } from '../../constants/measurements'
import { Route } from '../../constants/routes'
import { BR, Button, Buttons, Flex, FlexRow, H1, P } from '../shared'

const Wrapper = s.div`
  ${minWidth(DESKTOP)} {
    padding: 5vh 0;
  }

  ${minWidth(WIDESCREEN)} {
    padding: 10vh, 0;
  }
`

const IMG_SIZE = '10rem'

const ImgWrapper = s.div`
  border-radius: 50%;
  height: auto;
  margin-bottom: 1.5rem;
  width: ${IMG_SIZE};
  height: ${IMG_SIZE};
  overflow: hidden;
  margin-right: calc(0.5rem + 2.5%);

  ${maxWidth(PHONE)} {
    margin-bottom: 0.5rem;
  }
`

export const Hero = (): React.ReactElement => {
  const data = useStaticQuery<{
    file: { childImageSharp: { gatsbyImageData: IGatsbyImageData } }
  }>(graphql`
    query {
      file(relativePath: { eq: "me.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 256)
        }
      }
    }
  `)

  const image = getImage(data.file.childImageSharp.gatsbyImageData)

  return (
    <Wrapper>
      <BR />
      <FlexRow centerOnMobile>
        <ImgWrapper>
          <GatsbyImage image={image!} alt="Cameron" style={{ width: IMG_SIZE, height: IMG_SIZE }} />
        </ImgWrapper>
        <Flex>
          <H1 mb4>Hi, I&apos;m Cameron</H1>
          <P>
            I want to leverage tech to help people learn more and live better. I studied computer
            science and management in the{' '}
            <a href="https://fisher.wharton.upenn.edu/" target="_BLANK" rel="noopener noreferrer">
              {'M&T program at UPenn.'}
            </a>{' '}
            I spend my free time{' '}
            <a href="https://www.riplo.io" target="_BLANK" rel="noopener noreferrer">
              developing websites,
            </a>{' '}
            <a href={Route.GITHUB} target="_BLANK" rel="noopener noreferrer">
              learning new things,
            </a>{' '}
            <a href={Route.INSTAGRAM} target="_BLANK" rel="noopener noreferrer">
              and going to new places.
            </a>
          </P>
          <Buttons>
            <Button to={Route.PROJECTS}>Projects</Button>
            <Button to={Route.THOUGHTS}>Thoughts</Button>
          </Buttons>
        </Flex>
      </FlexRow>
    </Wrapper>
  )
}
