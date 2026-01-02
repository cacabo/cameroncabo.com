import React, { ReactElement, ReactNode } from 'react'
import s from 'styled-components'

import {
  DESKTOP,
  M2,
  M4,
  maxWidth,
  minWidth,
  PHONE,
  TABLET,
  WIDESCREEN,
} from '../../constants/measurements'

const percent = (numCols: number): string => (numCols / 12) * 100 + '%'

interface IContainerTagProps {
  background?: string
}

export const Container = s.div<IContainerTagProps>`
  padding-right: ${M2};
  padding-left: ${M2};
  width: 100%;
  display: block;
  background: ${({ background }): string => background || 'transparent'};

  ${minWidth(PHONE)} {
    padding-right: calc(${M2} + 1.25%);
    padding-left: calc(${M2} + 1.25%);
  }

  ${minWidth(TABLET)} {
    padding-right: calc(${M2} + 2.5%);
    padding-left: calc(${M2} + 2.5%);
  }

  ${minWidth(DESKTOP)} {
    padding-right: calc(${M2} + 5%);
    padding-left: calc(${M2} + 5%);
  }

  ${minWidth(WIDESCREEN)} {
    padding-right: calc(${M2} + 10%);
    padding-left: calc(${M2} + 10%);
  }
`

export const ContainerFluid = s.div<IContainerTagProps>`
  padding-right: ${M2};
  padding-left: ${M2};
  width: 100%;
  display: block;
  background: ${({ background }): string => background || 'transparent'};

  ${minWidth(DESKTOP)} {
    padding-right: calc(${M2} + 5%);
    padding-left: calc(${M2} + 5%);
  }

  ${minWidth(WIDESCREEN)} {
    padding-right: calc(${M2} + 10%);
    padding-left: calc(${M2} + 10%);
  }
`

interface ISpacerProps {
  hiddenOnMobile?: boolean
}

export const Spacer = s.div<ISpacerProps>`
  display: block;
  width: 100%;
  height: 1rem;
  ${({ hiddenOnMobile }): string =>
    hiddenOnMobile
      ? `
    ${maxWidth(PHONE)} {
      display: none;
    }
  `
      : ''}
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

  ${({ alwaysFlex }): string =>
    alwaysFlex ? '' : `${maxWidth(PHONE)} { display: block; }`}

  ${({ margin }): string =>
    margin
      ? `
    margin-left: -${margin};
    margin-right: -${margin};
    width: calc(100% + ${margin} + ${margin});
  `
      : ''}
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
  flex: ${({ width }): string => (width ? 'none' : '1')};
  width: ${({ width }): string => width || 'auto'};
  overflow-y: ${({ overflowY }): string => overflowY || 'visible'};
  overflow-x: visible;

  ${({ sm }): string => (sm ? `width: ${percent(sm)}; flex: none;` : '')}
  ${({ offsetSm }): string =>
    offsetSm || offsetSm === 0 ? `margin-left: ${percent(offsetSm)};` : ''}
  ${minWidth(PHONE)} {
    ${({ md }): string => (md ? `width: ${percent(md)}; flex: none;` : '')}
    ${({ offsetMd }): string =>
      offsetMd || offsetMd === 0 ? `margin-left: ${percent(offsetMd)};` : ''}
  }

  ${minWidth(TABLET)} {
    ${({ lg }): string => (lg ? `width: ${percent(lg)}; flex: none;` : '')}

    ${({ offsetLg }): string =>
      offsetLg || offsetLg === 0 ? `margin-left: ${percent(offsetLg)};` : ''}
  }

  ${({ flex }): string => (flex && 'display: flex;') || ''}
`

const ColContainer = s.div<IColProps>`
  background: ${({ background }): string => background || 'transparent'};
  overflow-x: visible;
  position: relative;

  ${({ margin }): string =>
    margin ? `margin-left: ${margin}; margin-right: ${margin};` : ''}
`

export const Col = ({
  margin,
  children,
  background,
  ...other
}: IColProps): React.ReactElement => (
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
  width: ${({ width }): string => width || '1rem'};

  ${maxWidth(PHONE)} {
    display: none;
  }
`

interface IContainerProps {
  children: ReactNode
  background?: string
  foreground?: string
}

export const WideContainer = ({
  children,
  ...props
}: IContainerProps): ReactElement => (
  <Container {...props}>
    <Row>
      <Col sm={12} md={10} offsetMd={1} lg={8} offsetLg={2}>
        {children}
      </Col>
    </Row>
  </Container>
)

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

export const FlexRow = s.div<{ centerOnMobile?: boolean }>`
  width: 100%;
  display: flex;

  ${(props): string =>
    props.centerOnMobile
      ? `
    ${maxWidth(PHONE)} {
      display: block;
      text-align: center;

      > div {
        display: inline-block;
      }
    }
  `
      : ''}
`

export const Flex = s.div`
  flex: 1;
`

export const Masonry = s.div`
  column-count: 2;
  column-gap: ${M2};

  ${maxWidth(PHONE)} {
    column-count: 1;
  }

  ${minWidth(WIDESCREEN)} {
    column-count: 3;
  }

  > * {
    display: inline-block;
    width: 100%;
  }
`

export const BR = s.br<{ hiddenOnMobile?: boolean }>`
  width: 100%;
  margin: 0;
  padding: 0;
  height: ${M4};
  display: block;

  ${(props): string =>
    props.hiddenOnMobile ? `${maxWidth(PHONE)} { display: none; }` : ''}
`

export const Center = s.div`
  text-align: center;
  width: 100%;
`
