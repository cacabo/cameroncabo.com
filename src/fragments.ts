import { graphql } from 'gatsby'

export const PartialProject = graphql`
  fragment PartialProject on MarkdownRemark {
    frontmatter {
      title
      description
      path
      technologies
      tags
      color
      start
      end
      image {
        childImageSharp {
          gatsbyImageData(width: 720)
        }
      }
    }
  }
`

export const Project = graphql`
  fragment Project on MarkdownRemark {
    html
    frontmatter {
      title
      repo
      description
      path
      link
      technologies
      collaborators
      start
      end
      color
      tags
      status
      image {
        childImageSharp {
          gatsbyImageData(width: 1248)
        }
      }
    }
  }
`

export const PartialThought = graphql`
  fragment PartialThought on MarkdownRemark {
    timeToRead
    frontmatter {
      title
      createdAt(formatString: "MMM D, YYYY")
      updatedAt(formatString: "MMM D, YYYY")
      path
      topics
      subtitle
      image {
        childImageSharp {
          gatsbyImageData(width: 848)
        }
      }
    }
  }
`

export const Thought = graphql`
  fragment Thought on MarkdownRemark {
    html
    timeToRead
    frontmatter {
      createdAt(formatString: "MMM D, YYYY")
      updatedAt(formatString: "MMM D, YYYY")
      title
      subtitle
      topics
      caption
      image {
        childImageSharp {
          gatsbyImageData(width: 1248)
        }
      }
    }
  }
`

export const BookPreview = graphql`
  fragment BookPreview on BooksJson {
    title
    subtitle
    endDate(formatString: "MMM D, YYYY")
    startDate(formatString: "MMM D, YYYY")
    link
    tags
    author
    id
    rating
    slug
  }
`

export const Book = graphql`
  fragment Book on BooksJson {
    title
    subtitle
    endDate(formatString: "MMM D, YYYY")
    startDate(formatString: "MMM D, YYYY")
    originallyPublished(formatString: "MMM D, YYYY")
    link
    tags
    author
    id
    rating
    html
  }
`
