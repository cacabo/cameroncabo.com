import React from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { P, Tag, Tags, Stars } from '../components/shared'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { IBook } from '../types'
import { TABLET, maxWidth, M2, DESKTOP } from '../constants/measurements'
import { Route } from '../constants/routes'

const TableWrapper = styled.div`
  overflow-y: visible;
  overflow-x: auto;

  ${maxWidth(DESKTOP)} {
    width: 100vw;
    position: relative;
    margin-right: ${M2};
    transform: translateX(-${M2});
  }
`

const Table = styled.table`
  margin-bottom: 0;

  ${maxWidth(TABLET)} {
    padding-right: ${M2};

    tr {
      td,
      th {
        &:first-child {
          padding-left: ${M2};
        }

        &:last-child {
          padding-right: ${M2};
        }
      }
    }
  }
`

// TODO fixed position table header

const BooksPage = (): React.ReactElement => {
  const { allBooksJson } = useStaticQuery(graphql`
    {
      allBooksJson(
        sort: [{ endDate: DESC }, { startDate: DESC }, { title: ASC }]
      ) {
        nodes {
          ...BookPreview
        }
      }
    }
  `)

  const partiallyOrderedBooks = allBooksJson.nodes as IBook[]
  const undatedBooks: IBook[] = []
  const datedBooks: IBook[] = []
  partiallyOrderedBooks.forEach((book): void => {
    const { startDate, endDate } = book
    if (!endDate && !startDate) {
      undatedBooks.push(book)
    } else {
      datedBooks.push(book)
    }
  })
  const books: IBook[] = [...datedBooks, ...undatedBooks]

  return (
    <Layout wide mt0>
      <SEO
        title="Books"
        description="A database of books I've read over time"
      />
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              {['Book', 'Tags', 'Started', 'Finished', 'Rating'].map(
                (name): React.ReactElement => (
                  <th key={name}>
                    <P mb0 bold sm>
                      {name}
                    </P>
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {books.map(
              ({
                title,
                subtitle,
                author,
                id,
                startDate,
                endDate,
                tags,
                rating,
                slug,
              }) => (
                <tr key={id}>
                  <td style={{ minWidth: '338px' }}>
                    <P mb1 medium>
                      <Link to={Route.BOOK(slug)}>{title}</Link>
                    </P>
                    {subtitle && (
                      <P mb1 sm lighter>
                        {subtitle}
                      </P>
                    )}
                    <P sm mb0 lightest>
                      By {author}
                    </P>
                  </td>
                  <td>
                    <Tags>
                      {tags.map(
                        (tag): React.ReactElement => (
                          <Tag sm key={tag}>
                            {tag}
                          </Tag>
                        ),
                      )}
                    </Tags>
                  </td>
                  <td>
                    <div style={{ width: '100px' }}>
                      <P mb0 sm>
                        {startDate}
                      </P>
                    </div>
                  </td>
                  <td>
                    <div style={{ width: '100px' }}>
                      <P mb0 sm>
                        {endDate}
                      </P>
                    </div>
                  </td>
                  <td>
                    {!(
                      rating === null ||
                      rating === undefined ||
                      Number.isNaN(rating)
                    ) && <Stars rating={rating} />}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </Table>
      </TableWrapper>
    </Layout>
  )
}

export default BooksPage
