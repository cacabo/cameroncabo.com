import React from 'react'
import { FluidObject } from 'gatsby-image'

export type Children = React.ReactNode | React.ReactNodeArray

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
  image: {
    childImageSharp: {
      fluid: FluidObject
    }
    publicURL: string
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
  tags?: string[]
  technologies: string[]
  start: string
  end: string
}
