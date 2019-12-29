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
      image {
        childImageSharp {
          fluid(maxWidth: 720) {
            ...GatsbyImageSharpFluid
          }
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
      image {
        childImageSharp {
          fluid(maxWidth: 1248) {
            src
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`

export const PartialThought = graphql`
  fragment PartialThought on MarkdownRemark {
    frontmatter {
      title
      createdAt(fromNow: true)
      updatedAt(fromNow: true)
      path
      topics
      subtitle
      image {
        childImageSharp {
          fluid(maxWidth: 848) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`

export const Thought = graphql`
  fragment Thought on MarkdownRemark {
    html
    frontmatter {
      createdAt(fromNow: true)
      updatedAt(fromNow: true)
      title
      subtitle
      topics
      caption
      image {
        childImageSharp {
          fluid(maxWidth: 1248) {
            src
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`
