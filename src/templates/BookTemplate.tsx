import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import {
  Button,
  P,
  BR,
  H1,
  TableList,
  Stars,
  Tags,
  Tag,
  ExternalLinkIcon,
  HR,
} from '../components/shared'
import { BOOKS_ROUTE } from '../constants/routes'
import { IBook } from '../types'
import { LINK_STYLES } from '../constants/misc'

// TODO render other information
// TODO style HR tags / line components

interface IBookTemplateProps {
  data: {
    booksJson: IBook
  }
  pageContext: {
    id: string
  }
}

const Content = styled.div`
  a {
    ${LINK_STYLES}
  }
`

const ProjectTemplate = ({ data }: IBookTemplateProps): React.ReactElement => {
  const {
    title,
    html,
    subtitle,
    rating,
    link,
    author,
    originallyPublished,
    tags,
    startDate,
    endDate,
  } = data.booksJson

  return (
    <Layout>
      <SEO title={title} />
      <H1>{title}</H1>
      {subtitle && <P lighter>{subtitle}</P>}
      {author && (
        <P sm lightest>
          By {author}
        </P>
      )}

      <TableList
        labels={[
          'Rating',
          'Originally published',
          'Tags',
          'Started',
          'Finished',
        ]}
        content={[
          rating && <Stars rating={rating} />,
          // Strip off "Jan 1," because this means that only the published year
          // is known
          originallyPublished.startsWith('Jan 1,')
            ? originallyPublished.substring(7)
            : originallyPublished,
          tags && tags.length && (
            <Tags>
              {tags.map(
                (tag): React.ReactElement => (
                  <Tag sm key={tag}>
                    {tag}
                  </Tag>
                ),
              )}
            </Tags>
          ),
          startDate,
          endDate,
        ]}
      />

      {link && (
        <Button as="a" href={link} target="_BLANK" rel="noopener noreferrer">
          Purchase
          <ExternalLinkIcon
            style={{ marginLeft: '6px', transform: 'scale(0.8)' }}
          />
        </Button>
      )}

      {html && <Content dangerouslySetInnerHTML={{ __html: html }} />}

      <BR />
      <HR />
      <Button to={BOOKS_ROUTE}>&larr; Back to all books</Button>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    booksJson(id: { eq: $id }) {
      ...Book
    }
  }
`

export default ProjectTemplate
