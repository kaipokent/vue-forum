import { defineStore } from 'pinia'
import type { User } from '@/utils/types.ts'
import { useDatabaseList, useDatabaseObject } from 'vuefire'
import { usersRef } from '@/firebaseConfig.ts'
import { computed, ref } from 'vue'

export const useUsersStore = defineStore('users', () => {
  const users = useDatabaseObject<Record<string, User>>(usersRef)
  const usersList = useDatabaseList<User>(usersRef)
  const authId = ref('VXjpr2WHa8Ux4Bnggym8QFLdv5C3')

  const user = computed(() => (id: string) => {
    return users.value ? users.value[id] : null
  })

  const authUser = computed(() => {
    return users.value ? users.value[authId.value] : null
  })

  const postCount = computed(() => (user: User | null) => {
    return user?.posts ? Object.keys(user.posts).length : 0
  })
  const threadCount = computed(() => (user: User | null) => {
    return user?.threads ? Object.keys(user.threads).length : 0
  })

  // function addPostId(userId: string, postId: string) {
  //   const user = this.users[userId]
  //   if (user.posts) {
  //     user.posts[postId] = postId
  //   } else {
  //     user.posts = { postId }
  //   }
  // }
  // function addThreadId(userId: string, threadId: string) {
  //   const user = this.users[userId]
  //   if (user.threads) {
  //     user.threads[threadId] = threadId
  //   } else {
  //     user.threads = { threadId }
  //   }
  // }
  // function updateUser(data: User) {
  //   this.users[this.authId] = { ...this.authUser, ...data }
  // }

  return { users, usersList, authId, user, authUser, postCount, threadCount }
})
