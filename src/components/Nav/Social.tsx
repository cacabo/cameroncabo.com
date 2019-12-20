import React from 'react'
import s from 'styled-components'
import {
  FACEBOOK_ROUTE,
  INSTAGRAM_ROUTE,
  LINKEDIN_ROUTE,
  GITHUB_ROUTE,
  TWITTER_ROUTE,
  CONTACT_ROUTE,
} from '../../constants/routes'
import {
  FacebookIcon,
  LinkedInIcon,
  GitHubIcon,
  TwitterIcon,
  InstagramIcon,
  MailIcon,
} from '../shared'

const Wrapper = s.div<{}>`
  width: 100%;
  text-align: left;

  a {
    display: inline-block;
    margin-right: 0.5rem;
    opacity: 0.5;

    :hover,
    :active,
    :focus {
      opacity: 0.8;
    }
  }
`

export default () => (
  <Wrapper>
    <a href={FACEBOOK_ROUTE} target="_BLANK">
      <FacebookIcon />
    </a>
    <a href={LINKEDIN_ROUTE} target="_BLANK">
      <LinkedInIcon />
    </a>
    <a href={GITHUB_ROUTE} target="_BLANK">
      <GitHubIcon />
    </a>
    <a href={TWITTER_ROUTE} target="_BLANK">
      <TwitterIcon />
    </a>
    <a href={INSTAGRAM_ROUTE} target="_BLANK">
      <InstagramIcon />
    </a>
    <a href={CONTACT_ROUTE}>
      <MailIcon />
    </a>
  </Wrapper>
)
