import React from 'react'
import { Link } from 'gatsby'

interface IUnstyledLinkProps {
  to: string
  children: React.ReactNode
}

export const UnstyledLink = ({
  to,
  children,
  ...props
}: IUnstyledLinkProps & any): React.ReactElement => (
  <Link to={to} {...props} style={{ background: 'inherit', border: '0' }}>
    {children}
  </Link>
)
