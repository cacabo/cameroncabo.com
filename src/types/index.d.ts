import React from 'react'
import { FluidObject } from 'gatsby-image'

export type Children = React.ReactNode | React.ReactNodeArray

export interface IThought {
  html: string
  timeToRead: number
  frontmatter: {
    path: string
    createdAt: string
    updatedAt: string
    title: string
    subtitle: string
    topics?: string[]
    caption: string
    image?: {
      childImageSharp: {
        fluid: FluidObject
      }
    }
  }
}

export interface IThoughtPreviewFrontmatter {
  path: string
  title: string
  subtitle?: string
  topics?: string[]
  updatedAt?: string
  createdAt?: string
  image?: {
    childImageSharp: {
      fluid: FluidObject
    }
  }
}

export type IThoughtPreview = IThoughtPreviewFrontmatter & {
  timeToRead?: number
}

export interface IWorkFrontmatter {
  company: string
  title: string
  location: string
  start: string
  end: string
  svg?: string
  image?: {
    childImageSharp: {
      fluid: FluidObject
    }
  }
}

export interface IProjectPreview {
  path: string
  src?: string
  image?: {
    childImageSharp: {
      fluid: FluidObject
    }
  }
  color: string
  title: string
  description: string
  tags: string[]
  technologies: string[]
  start: string
  end: string
}

export interface IProjectFrontmatter {
  path: string
  title: string
  description: string
  link: string
  technologies: string[]
  collaborators: string[]
  start: string
  end: string
  color: string
  repo: string
  tags: string[]
  status?: string
  image: {
    childImageSharp: {
      fluid: FluidObject
    }
  }
}

export interface IProject {
  frontmatter: IProjectFrontmatter
}

/**
 * Books
 */

interface IBook {
  id: NotionID
  title: string
  subtitle: string
  author: string
  originallyPublished: string
  tags: string[]
  startDate: string
  endDate: string
  link: string
  rating: number
  html?: string
  slug: string
  notionURL: string
}
