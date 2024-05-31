export type Post = {
  edited: {
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

export type Posts = {
  [key: string]: Post
}

export type Thread = {
  contributors: {
    [key: string]: string
  }
  firstPostId: string
  forumId: string
  lastPostAt: number
  lastPostId: string
  posts: Posts
  publishedAt: number
  slug: string
  title: string
  userId: string
  '.key': string
}

export type Threads = {
  [key: string]: Thread
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

export type Users = {
  [key: string]: User
}
