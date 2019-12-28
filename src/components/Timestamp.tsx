import React, { ReactElement, CSSProperties } from 'react'
import { P } from './shared'

interface ITimestamp {
  createdAt?: string
  updatedAt?: string
  style?: CSSProperties
}

export default ({
  createdAt,
  updatedAt,
  style,
}: ITimestamp): ReactElement | null => {
  if (!createdAt) return null
  const text: string =
    !updatedAt || createdAt === updatedAt
      ? createdAt
      : `${createdAt}, updated ${updatedAt}`
  return (
    <P sm lightest style={style}>
      {text}
    </P>
  )
}
