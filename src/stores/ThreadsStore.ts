import { defineStore } from 'pinia'
import type { Thread } from '@/utils/types.ts'
import { useDatabaseList, useDatabaseObject } from 'vuefire'
import { threadsRef } from '@/firebaseConfig.ts'
import { computed } from 'vue'

export const useThreadsStore = defineStore('threads', () => {
  const threads = useDatabaseObject<Record<string, Thread>>(threadsRef)
  const threadsList = useDatabaseList<Thread>(threadsRef)

  const thread = computed(() => (id: string) => {
    return threads.value ? threads.value[id] : null
  })

  const repliesCount = computed(() => (thread: Thread | null) => {
    return thread?.posts ? Object.keys(thread.posts).length - 1 : 0
  })
  const contributorsCount = computed(() => (thread: Thread | null) => {
    return thread?.contributors ? Object.keys(thread.contributors).length : 0
  })

  // function addPostId(threadId: string, postId: string) {
  //   this.threads[threadId].posts[postId] = postId
  // }
  // function createThread(thread: Thread) {
  //   this.threads[thread.id] = thread
  // }
  // function addContributor(threadId: string, userId: string) {
  //   if (!this.threads[threadId].contributors[userId]) {
  //     this.threads[threadId].contributors[userId] = userId
  //   }
  // }

  return { threads, threadsList, thread, repliesCount, contributorsCount }
})
