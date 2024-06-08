import { defineStore } from 'pinia'
import { posts } from '../data.json'
import type { Post } from '@/utils/types.ts'

export const usePostsStore = defineStore('posts', {
  state: () => ({ posts }),
  actions: {
    addPost(postId: string, post: Post) {
      this.posts[postId] = post
    }
  }
})
