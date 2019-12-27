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
import { BLACK } from '../../constants/colors'
import {
  maxWidth,
  PHONE,
  SHORT_ANIMATION_DURATION,
} from '../../constants/measurements'

const Wrapper = s.div<{ active: boolean }>`
  width: 100%;
  text-align: left;

  a {
    display: inline-block;
    margin-right: 0.5rem;
    opacity: 0.5;
    color: ${BLACK} !important;
    overflow: hidden;

    svg {
      margin-left: -5px;
      transform: scale(0.64);
    }

    :hover,
    :active,
    :focus {
      opacity: 0.8;
    }

    :last-child {
      margin-right: 0;
    }
  }

  ${maxWidth(PHONE)} {
    margin: 2vh 0 1vh 0;
    transition: opacity ${SHORT_ANIMATION_DURATION + 200}ms ease;
    opacity: ${props => (props.active ? 1 : 0)};

    a {
      margin-right: 1rem;

      svg {
        margin-left: 0px;
        transform: scale(1);
      }
    }
  }
`

export default ({ active }) => (
  <Wrapper active={active}>
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
