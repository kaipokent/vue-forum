import { defineStore } from 'pinia'
import { users } from '../data.json'

export const useUsersStore = defineStore('users', {
  state: () => ({ users }),
  actions: {
    addPostId(userId: string, postId: string) {
      this.users[userId].posts[postId] = postId
    }
  }
})
