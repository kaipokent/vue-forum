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
    authUser: (state) => state.users[state.authId]
  },
  actions: {
    addPostId(userId: string, postId: string) {
      const user = this.users[userId]
      if (user.posts) {
        user.posts[postId] = postId
      }
    }
  }
})
