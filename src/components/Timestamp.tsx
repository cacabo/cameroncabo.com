import React, { ReactElement, CSSProperties } from 'react'
import { P } from './shared'

interface ITimestamp {
  createdAt?: string
  updatedAt?: string
  timeToRead?: number
  style?: CSSProperties
}

export const Timestamp = ({
  createdAt,
  updatedAt,
  timeToRead,
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
      {timeToRead && <>&nbsp;&#183;&nbsp;</>}
      {timeToRead && `${timeToRead} min read`}
    </P>
  )
}
