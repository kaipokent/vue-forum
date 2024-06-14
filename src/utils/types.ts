export interface Category {
  forums: Record<string, string>
  name: string
  slug: string
  id: string
}

export interface Forum {
  categoryId: string
  description: string
  lastPostId: string
  name: string
  slug: string
  threads?: Record<string, string>
  id: string
}

export type Moderators = Record<string, string>

export interface Post {
  edited?: {
    at: number
    by: string
    moderated: boolean
  }
  publishedAt: number
  text: string
  threadId: string
  userId: string
  id: string
}

export interface Stats {
  postsCount: number
  threadsCount: number
  usersCount: number
  usersOnline: number
}

export interface Thread {
  contributors: Record<string, string>
  firstPostId: string
  forumId: string
  lastPostAt: number
  lastPostId: string
  posts: Record<string, string>
  publishedAt: number
  slug: string
  title: string
  userId: string
  id: string
}

export interface User {
  avatar: string
  bio?: string
  email: string
  lastVisitAt: number
  name: string
  registeredAt: number
  username: string
  usernameLower: string
  threads?: Record<string, string>
  posts?: Record<string, string>
  website?: string
  twitter?: string
  id: string
}
