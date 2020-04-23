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
  SHORT_ANIMATION_DURATION,
  M2,
  TABLET,
} from '../../constants/measurements'
import { OUTLINE_STYLES } from '../../constants/misc'

const Wrapper = s.div<{ active: boolean }>`
  position: absolute;
  right: ${M2};

  a {
    vertical-align: middle;
    line-height: 1;
    display: inline-block;
    margin-right: 0.5rem;
    margin-left: -5px;
    opacity: 0.5;
    color: ${BLACK} !important;
    overflow: hidden;

    svg {
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

    :focus {
      ${OUTLINE_STYLES}
      border-radius: 2px;
    }
  }

  ${maxWidth(TABLET)} {
    left: 0;
    position: relative;
    margin: 4vh 0 ${M2} 0;
    transition: opacity ${SHORT_ANIMATION_DURATION + 200}ms ease;
    opacity: ${(props): number => (props.active ? 1 : 0)};

    a {
      margin-right: 1rem;

      svg {
        margin-left: 0px;
        transform: scale(1);
      }
    }
  }
`

interface ISocialProps {
  active: boolean
  tabIndex?: number
}

export const Social = ({
  tabIndex,
  active,
}: ISocialProps): React.ReactElement => (
  <Wrapper active={active} role="menu">
    <a
      href={FACEBOOK_ROUTE}
      target="_BLANK"
      rel="noopener noreferrer"
      tabIndex={tabIndex}
      role="menuitem"
      aria-label="Facebook"
    >
      <FacebookIcon />
    </a>
    <a
      href={LINKEDIN_ROUTE}
      target="_BLANK"
      rel="noopener noreferrer"
      tabIndex={tabIndex}
      role="menuitem"
      aria-label="LinkedIn"
    >
      <LinkedInIcon />
    </a>
    <a
      href={GITHUB_ROUTE}
      target="_BLANK"
      rel="noopener noreferrer"
      tabIndex={tabIndex}
      role="menuitem"
      aria-label="GitHub"
    >
      <GitHubIcon />
    </a>
    <a
      href={TWITTER_ROUTE}
      target="_BLANK"
      rel="noopener noreferrer"
      tabIndex={tabIndex}
      role="menuitem"
      aria-label="Twitter"
    >
      <TwitterIcon />
    </a>
    <a
      href={INSTAGRAM_ROUTE}
      target="_BLANK"
      rel="noopener noreferrer"
      tabIndex={tabIndex}
      aria-label="Instagram"
    >
      <InstagramIcon />
    </a>
    <a href={CONTACT_ROUTE} tabIndex={tabIndex}>
      <MailIcon />
    </a>
  </Wrapper>
)
