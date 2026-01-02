import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { P, Button } from '../shared'
import { Route } from '../../constants/routes'
import { IBook } from '../../types'

const getTextList = (list: React.ReactNode[]): React.ReactNode[] => {
  if (list.length <= 1) return list
  if (list.length === 2) {
    return [list[0], ' and ', list[1]]
  }
  const newList: React.ReactNode[] = []
  list.forEach((item, idx) => {
    newList.push(item)
    if (idx < list.length - 1) {
      newList.push(', ')
    }
    if (idx === list.length - 2) {
      newList.push('and ')
    }
  })
  return newList
}

type IBookTextProps = Pick<IBook, 'id' | 'slug' | 'title' | 'author'>

const getBookText = ({
  id,
  slug,
  title,
  author,
}: IBookTextProps): React.ReactElement => (
  <React.Fragment key={id}>
    <Link to={Route.BOOK(slug)}>{title}</Link> by {author}
  </React.Fragment>
)

export const Reading = (): React.ReactElement => {
  const { inProgressBooks, recentlyFinishedBooks } = useStaticQuery(graphql`
    {
      inProgressBooks: allBooksJson(
        filter: { startDate: { ne: null }, endDate: { eq: null } }
      ) {
        nodes {
          id
          slug
          title
          author
        }
      }

      recentlyFinishedBooks: allBooksJson(
        filter: { startDate: { ne: null }, endDate: { ne: null } }
        sort: { endDate: DESC }
        limit: 2
      ) {
        nodes {
          id
          slug
          title
          author
        }
      }
    }
  `)

  const numInProgress = inProgressBooks.nodes.length
  const inProgressBooksTexts = (inProgressBooks.nodes as IBookTextProps[]).map(
    getBookText,
  )
  const inProgressText =
    numInProgress === 0 ? (
      <P>
        I&apos;m not currently reading any books, please send over some
        recommendations!
      </P>
    ) : (
      <P>I&apos;m currently reading {getTextList(inProgressBooksTexts)}.</P>
    )

  const numRecentlyFinished = recentlyFinishedBooks.nodes.length
  const recentlyFinishedBooksTexts = (
    recentlyFinishedBooks.nodes as IBookTextProps[]
  ).map(getBookText)
  const recentlyFinishedText =
    numRecentlyFinished === 0 ? (
      <React.Fragment />
    ) : (
      <P>
        I most recently finished reading{' '}
        {getTextList(recentlyFinishedBooksTexts)}.
      </P>
    )

  return (
    <>
      {inProgressText}
      {recentlyFinishedText}
      <Button to={Route.BOOKS}>View books &rarr;</Button>
    </>
  )
}
