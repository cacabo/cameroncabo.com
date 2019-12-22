import React, { ReactElement, ReactNode } from 'react'
import s from 'styled-components'

import {
  minWidth,
  maxWidth,
  PHONE,
  TABLET,
  DESKTOP,
} from '../../constants/measurements'

const percent = (numCols: number): string => (numCols / 12) * 100 + '%'

interface IContainerTagProps {
  background?: string
}

export const Container = s.div<IContainerTagProps>`
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  width: 100%;
  display: block;
  background: ${({ background }) => background || 'transparent'};

  ${minWidth(PHONE)} {
    padding-right: calc(0.5rem + 1.25%);
    padding-left: calc(0.5rem + 1.25%);
  }

  ${minWidth(TABLET)} {
    padding-right: calc(0.5rem + 2.5%);
    padding-left: calc(0.5rem + 2.5%);
  }

  ${minWidth(DESKTOP)} {
    padding-right: calc(0.5rem + 5%);
    padding-left: calc(0.5rem + 5%);
  }
`

interface ISpacerProps {
  hiddenOnMobile?: boolean
}

export const Spacer = s.div<ISpacerProps>`
  display: block;
  width: 100%;
  height: 1rem;
  ${({ hiddenOnMobile }) =>
    hiddenOnMobile &&
    `
    ${maxWidth(PHONE)} {
      display: none;
    }
  `}
`

interface IRowProps {
  margin?: string
  alwaysFlex?: boolean
}

export const Row = s.div<IRowProps>`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;

  ${({ alwaysFlex }) => !alwaysFlex && `${maxWidth(PHONE)} { display: block; }`}

  ${({ margin }) =>
    margin &&
    `
    margin-left: -${margin};
    margin-right: -${margin};
    width: calc(100% + ${margin} + ${margin});
  `}
`

export interface IColProps {
  width?: string
  sm?: number
  offsetSm?: number
  md?: number
  offsetMd?: number
  lg?: number
  offsetLg?: number
  flex?: boolean
  margin?: string
  children?: ReactNode
  overflowY?: 'visibile' | 'scroll' | 'hidden' | 'auto'
  background?: string
}

const ColWrapper = s.div<IColProps>`
  flex: ${({ width }) => (width ? 'none' : 1)};
  width: ${({ width }) => width || 'auto'};
  overflow-y: ${({ overflowY }) => overflowY || 'visible'};
  overflow-x: visible;

  ${maxWidth(PHONE)} {
    ${({ sm }) =>
      sm &&
      `
      width: ${percent(sm)};
      flex: none;
    `}

    ${({ offsetSm }) => offsetSm && `margin-left: ${percent(offsetSm)};`}
  }

  ${minWidth(PHONE)} {
    ${({ md }) =>
      md &&
      `
      width: ${percent(md)}
      flex: none;
    `}

    ${({ offsetMd }) => offsetMd && `margin-left: ${percent(offsetMd)};`}
  }

  ${minWidth(TABLET)} {
    ${({ lg }) =>
      lg &&
      `
      width: ${percent(lg)}
      flex: none;
    `}

    ${({ offsetLg }) =>
      offsetLg &&
      `
      margin-left: ${percent(offsetLg)};
    `}
  }

  ${({ flex }) => flex && `display: flex;`}
`

const ColContainer = s.div<IColProps>`
  background: ${({ background }) => background || 'transparent'};
  overflow-x: visible;
  position: relative;

  ${({ margin }) =>
    margin &&
    `
    margin-left: ${margin};
    margin-right: ${margin};
  `}
`

export const Col = ({ margin, children, background, ...other }: IColProps) => (
  <ColWrapper {...other}>
    <ColContainer margin={margin} background={background}>
      {children}
    </ColContainer>
  </ColWrapper>
)

export interface IColSpaceProps {
  width?: string
}

export const ColSpace = s(Col)<IColSpaceProps>`
  flex: none;
  width: ${({ width }) => width || '1rem'};

  ${maxWidth(PHONE)} {
    display: none;
  }
`

interface IContainerProps {
  children: ReactNode
  background?: string
  foreground?: string
}

export const MediumContainer = ({
  children,
  ...props
}: IContainerProps): ReactElement => (
  <Container {...props}>
    <Row>
      <Col sm={12} md={8} offsetMd={2} lg={6} offsetLg={3}>
        {children}
      </Col>
    </Row>
  </Container>
)

export const ThinContainer = ({
  children,
  ...props
}: IContainerProps): ReactElement => (
  <Container {...props}>
    <Row>
      <Col sm={12} md={8} offsetMd={2} lg={5} offsetLg={3.5}>
        {children}
      </Col>
    </Row>
  </Container>
)

export const FlexRow = s.div<{}>`
  width: 100%;
  display: flex;
`

export const Flex = s.div<{}>`
  flex: 1;
`
