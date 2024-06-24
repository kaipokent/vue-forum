import { defineStore } from 'pinia'
import { threads } from '../data.json'
import type { Thread } from '@/utils/types.ts'

interface State {
  threads: Record<string, Thread>
}

export const useThreadsStore = defineStore('threads', {
  state: (): State => ({ threads }),
  getters: {
    values: (state) => Object.values(state.threads),
    repliesCount: (state: State) => (id: string) =>
      Object.values(state.threads[id].posts)
        ? Object.values(state.threads[id].posts).length - 1
        : 0,
    contributorsCount: (state: State) => (id: string) =>
      Object.values(state.threads[id].contributors || []).length
  },
  actions: {
    addPostId(threadId: string, postId: string) {
      this.threads[threadId].posts[postId] = postId
    },
    createThread(thread: Thread) {
      this.threads[thread['.key']] = thread
    }
    // addContributor(threadId: string, userId: string) {
    //   if (this.threads[threadId].contributors && !this.threads[threadId].contributors[userId]) {
    //     this.threads[threadId].contributors[userId] = userId
    //   }
    // }
  }
})
