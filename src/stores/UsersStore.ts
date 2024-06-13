import { defineStore } from 'pinia'
import { users } from '../data.json'
import type { User } from '@/utils/types.ts'

interface State {
  users: Record<string, User>
  authId: string
}

export const useUsersStore = defineStore('users', {
  state: (): State => ({ users, authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3' }),
  getters: {
    authUser: (state) => state.users[state.authId],
    postCount: (state: State) => (id: string) => Object.values(state.users[id].posts || []).length,
    threadCount: (state: State) => (id: string) =>
      Object.values(state.users[id].threads || []).length
  },
  actions: {
    addPostId(userId: string, postId: string) {
      const user = this.users[userId]
      if (user.posts) {
        user.posts[postId] = postId
      } else {
        user.posts = { postId }
      }
    },
    addThreadId(userId: string, threadId: string) {
      const user = this.users[userId]
      if (user.threads) {
        user.threads[threadId] = threadId
      } else {
        user.threads = { threadId }
      }
    },
    updateUser(data: User) {
      this.users[this.authId] = { ...this.authUser, ...data }
    }
  }
})
