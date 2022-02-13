import React from 'react'
import s from 'styled-components'
import { Route } from '../../constants/routes'
import {
  FacebookIcon,
  LinkedInIcon,
  GitHubIcon,
  TwitterIcon,
  InstagramIcon,
  MailIcon,
  RSSIcon,
} from '../shared'
import { BLACK } from '../../constants/colors'
import {
  maxWidth,
  SHORT_ANIMATION_DURATION,
  M2,
  DESKTOP,
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

  ${maxWidth(DESKTOP)} {
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

const ExternalLink = ({
  tabIndex,
  children,
  label,
  route,
}: {
  tabIndex?: number
  children: React.ReactChild
  label: string
  route: string
}): React.ReactElement => (
  <a
    href={route}
    target="_BLANK"
    rel="noopener noreferrer"
    tabIndex={tabIndex}
    role="menuitem"
    aria-label={label}
  >
    {children}
  </a>
)

interface ISocialProps {
  active: boolean
  tabIndex?: number
}

export const Social = ({
  tabIndex,
  active,
}: ISocialProps): React.ReactElement => (
  <Wrapper active={active} role="menu">
    <ExternalLink route={Route.FACEBOOK} label="Facebook" tabIndex={tabIndex}>
      <FacebookIcon />
    </ExternalLink>
    <ExternalLink route={Route.LINKEDIN} label="LinkedIn" tabIndex={tabIndex}>
      <LinkedInIcon />
    </ExternalLink>
    <ExternalLink route={Route.GITHUB} label="GitHub" tabIndex={tabIndex}>
      <GitHubIcon />
    </ExternalLink>
    <ExternalLink route={Route.TWITTER} label="Twitter" tabIndex={tabIndex}>
      <TwitterIcon />
    </ExternalLink>
    <ExternalLink route={Route.INSTAGRAM} label="Instagram" tabIndex={tabIndex}>
      <InstagramIcon />
    </ExternalLink>
    <a href={Route.CONTACT} tabIndex={tabIndex}>
      <MailIcon />
    </a>
    <a href={Route.RSS} tabIndex={tabIndex}>
      <RSSIcon />
    </a>
  </Wrapper>
)
