import React from 'react'
import s from 'styled-components'
import { Link } from 'gatsby'
import { Route } from '../../constants/routes'
import { BLACK } from '../../constants/colors'
import {
  maxWidth,
  SHORT_ANIMATION_DURATION,
  M2,
  M1,
  DESKTOP,
} from '../../constants/measurements'
import { OUTLINE_STYLES } from '../../constants/misc'

const Wrapper = s.div<{ active?: boolean }>`
  ${maxWidth(DESKTOP)} {
    margin: ${M2} 0;
    transition: opacity ${SHORT_ANIMATION_DURATION + 100}ms ease;
    opacity: ${(props): number => (props.active ? 1 : 0)};
  }
`

const StyledLink = s(Link)<{}>`
  display: inline-block;
  text-decoration: none !important;
  color: ${BLACK};
  opacity: 0.5;
  margin: 0 calc(${M1} + 0.5vw);
  padding: 0 4px;

  &:hover,
  &:focus,
  &:active {
    opacity: 1;
  }

  ${maxWidth('1148px')} {
    margin: 0 calc(${M1} / 2);
  }

  ${maxWidth(DESKTOP)} {
    margin: 1vh 0;
    font-size: 125%;
    width: 100%;
    padding: 0;
  }

  &:focus {
    ${OUTLINE_STYLES};
    border-radius: 2px;
  }
`

const routes: [string, string][] = [
  ['Home', Route.HOME],
  ['Freelance', Route.FREELANCE],
  ['Projects', Route.PROJECTS],
  ['Books', Route.BOOKS],
  ['Thoughts', Route.THOUGHTS],
  ['Design', Route.DESIGN],
]

interface ILinksProps {
  active: boolean
  tabIndex?: number
}

export const Links = ({
  tabIndex,
  active,
}: ILinksProps): React.ReactElement => (
  <Wrapper active={active} role="menu">
    {routes.map(
      ([name, route]): React.ReactElement => {
        return (
          <StyledLink
            to={route}
            key={route}
            tabIndex={tabIndex}
            role="menuitem"
          >
            {name}
          </StyledLink>
        )
      },
    )}
    <StyledLink as="a" href={Route.CONTACT} tabIndex={tabIndex} role="menuitem">
      Contact
    </StyledLink>
  </Wrapper>
)
