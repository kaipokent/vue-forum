import { defineStore } from 'pinia'
import { posts } from '../data.json'
import type { Post } from '@/utils/types.ts'

interface State {
  posts: Record<string, Post>
}

export const usePostsStore = defineStore('posts', {
  state: (): State => ({ posts }),
  actions: {
    addPost(postId: string, post: Post) {
      this.posts[postId] = post
    }
  }
})
