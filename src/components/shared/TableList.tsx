import React from 'react'
import { BORDER } from '../../constants/colors'
import { M2 } from '../../constants/measurements'
import { P } from './Typography'

interface ITableListProps {
  labels: string[]
  content: Array<
    React.ReactNodeArray | React.ReactNode | string | null | undefined
  >
}

export const TableList = ({
  labels,
  content,
}: ITableListProps): React.ReactElement => {
  if (!labels || !content) {
    throw Error('Labels and content are required')
  }
  if (labels.length !== content.length) {
    throw Error('Labels and content lists must be the same length')
  }

  return (
    <table
      style={{
        borderTop: `1px solid ${BORDER}`,
        marginBottom: M2,
      }}
    >
      <tbody>
        {content.map((entry, idx) => {
          if (!entry) {
            return null
          }

          const label = labels[idx]
          return (
            <tr key={`${label}-${idx}`}>
              <td>
                <P sm bold mb0>
                  {label}
                </P>
              </td>
              <td>
                {typeof entry === 'string' ? (
                  <P sm mb0>
                    {entry}
                  </P>
                ) : (
                  entry
                )}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
