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

const Wrapper = s.div<{ active?: boolean }>`
  ${maxWidth(TABLET)} {
    margin: ${M2} 0;
    transition: opacity ${SHORT_ANIMATION_DURATION + 100}ms ease;
    opacity: ${props => (props.active ? 1 : 0)};
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
`

const map = {
  Home: HOME_ROUTE,
  Freelance: FREELANCE_ROUTE,
  Projects: PROJECTS_ROUTE,
  Thoughts: THOUGHTS_ROUTE,
  Design: DESIGN_ROUTE,
}

export default ({ active }) => (
  <Wrapper active={active}>
    {Object.keys(map).map(name => {
      const route = map[name]
      return (
        <StyledLink to={route} key={route}>
          {name}
        </StyledLink>
      )
    })}
    <StyledLink as="a" href={CONTACT_ROUTE}>
      Contact
    </StyledLink>
  </Wrapper>
)
