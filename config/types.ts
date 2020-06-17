type INode = {
  id: string
  parent?: string | null
  children: string[]
  internal: {
    type: string
    mediaType: string
    content: string
    contentDigest: string
  }
} & Record<string, any>

interface IPageInput {
  path: string
  component: string
  layout?: string
  context?: any
}

interface IActions {
  createNode: (node: INode) => void
  createFieldExtension: (params: {
    name: string
    extend: () => {
      resolve: (source: any) => any
    }
  }) => void
  createTypes: (query: string) => void
  createPage: (page: IPageInput) => void
  deletePage: (page: IPageInput) => void
  createRedirect: (opts: {
    fromPath: string
    isPermanent?: boolean
    redirectInBrowser?: boolean
    toPath: string
  }) => void
}

export type GatsbySourceNodes = (fns: {
  actions: IActions
  createNodeId: (id: string) => string
  createContentDigest: (obj: object) => string
}) => void

export type GatsbyCreatePages = (fns: {
  graphql: any
  actions: IActions
  reporter: {
    panicOnBuild: (str: string) => void
  }
}) => void

export type GatsbyCreateSchemaCustomization = (fns: {
  actions: IActions
}) => void
