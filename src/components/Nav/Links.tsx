import React from 'react'
import s from 'styled-components'
import { Link } from 'gatsby'
import {
  HOME_ROUTE,
  FREELANCE_ROUTE,
  PROJECTS_ROUTE,
  THOUGHTS_ROUTE,
  DESIGN_ROUTE,
  CONTACT_ROUTE,
} from '../../constants/routes'
import { BLACK } from '../../constants/colors'
import {
  maxWidth,
  SHORT_ANIMATION_DURATION,
  M2,
  M1,
  TABLET,
} from '../../constants/measurements'
import { OUTLINE_STYLES } from '../../constants/misc'

const Wrapper = s.div<{ active?: boolean }>`
  ${maxWidth(TABLET)} {
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

  &:hover,
  &:focus,
  &:active {
    opacity: 1;
  }

  ${maxWidth(TABLET)} {
    margin: 1vh 0;
    font-size: 125%;
    width: 100%;
  }

  &:focus {
    ${OUTLINE_STYLES};
    border-radius: 2px;
  }
`

const map: Record<string, string> = {
  Home: HOME_ROUTE,
  Freelance: FREELANCE_ROUTE,
  Projects: PROJECTS_ROUTE,
  Thoughts: THOUGHTS_ROUTE,
  Design: DESIGN_ROUTE,
}

interface ILinksProps {
  active: boolean
  tabIndex?: number
}

export const Links = ({
  tabIndex,
  active,
}: ILinksProps): React.ReactElement => (
  <Wrapper active={active} role="menu">
    {Object.keys(map).map(
      (name): React.ReactElement => {
        const route = map[name]
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
    <StyledLink as="a" href={CONTACT_ROUTE} tabIndex={tabIndex} role="menuitem">
      Contact
    </StyledLink>
  </Wrapper>
)
