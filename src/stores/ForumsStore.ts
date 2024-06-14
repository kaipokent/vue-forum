import { defineStore } from 'pinia'
import type { Forum } from '@/utils/types.ts'
import { useDatabaseList, useDatabaseObject } from 'vuefire'
import { forumsRef } from '@/firebaseConfig.ts'
import { computed } from 'vue'

export const useForumsStore = defineStore('forums', () => {
  const forums = useDatabaseObject<Record<string, Forum>>(forumsRef)
  const forumsList = useDatabaseList<Forum>(forumsRef)

  const forum = computed(() => (id: string) => {
    return forums.value ? forums.value[id] : null
  })

  const threadCount = computed(() => (forum: Forum) => {
    return forum?.threads ? Object.keys(forum.threads).length : 0
  })

  // const addThread(forumId: string, threadId: string) {
  //   if (this.forums[forumId].threads) {
  //     this.forums[forumId].threads[threadId] = threadId
  //   } else {
  //     this.forums[forumId].threads = { threadId }
  //   }
  // }
  return { forums, forumsList, forum, threadCount }
})
