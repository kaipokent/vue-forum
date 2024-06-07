export type Post = {
  edited?: {
    at: number
    by: string
    moderated: boolean
  }
  publishedAt: number
  text: string
  threadId: string
  userId: string
  '.key': string
}

export type Thread = {
  contributors: Record<string, string>
  firstPostId: string
  forumId: string
  lastPostAt: number
  lastPostId: string
  posts: string
  publishedAt: number
  slug: string
  title: string
  userId: string
  '.key': string
}

export type User = {
  avatar: string
  email: string
  lastVisitAt: number
  name: string
  registeredAt: number
  username: string
  usernameLower: string
  '.key': string
}

export type Forum = {
  categoryId: string
  description: string
  lastPostId: number
  name: string
  slug: number
  threads?: Record<string, string>
  '.key': string
}

export type Category = {
  forums: Record<string, string>
  name: string
  slug: number
  '.key': string
}
