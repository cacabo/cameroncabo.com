import { GatsbyLinkProps, Link } from 'gatsby'
import React from 'react'

interface IUnstyledLinkProps {
  to: string
  children: React.ReactNode
}

export const UnstyledLink = ({
  to,
  children,
  ...props
}: IUnstyledLinkProps & Partial<Omit<GatsbyLinkProps<unknown>, 'ref'>>): React.ReactElement => (
  <Link to={to} {...props} style={{ background: 'inherit', border: '0' }}>
    {children}
  </Link>
)
