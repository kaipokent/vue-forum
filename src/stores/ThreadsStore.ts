import { defineStore } from 'pinia'
import { threads } from '../data.json'
import type { Thread, Threads } from '@/utils/types.ts'

interface State {
  threads: Threads
}

export const useThreadsStore = defineStore('threads', {
  state: (): State => ({ threads }),
  getters: {
    values: (state) => Object.values(state.threads)
  },
  actions: {
    addPostId(threadId: string, postId: string) {
      this.threads[threadId].posts[postId] = postId
    },
    createThread(thread: Thread) {
      this.threads[thread['.key']] = thread
    }
  }
})
