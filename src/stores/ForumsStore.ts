import { defineStore } from 'pinia'
import { forums } from '../data.json'
import type { Forum } from '@/utils/types.ts'

interface State {
  forums: Record<string, Forum>
}

export const useForumsStore = defineStore('forums', {
  state: (): State => ({ forums }),
  getters: {
    forumValues: (state) => Object.values(state.forums),
    threadCount: (state: State) => (id: string) =>
      Object.values(state.forums[id].threads || []).length
  },
  actions: {
    addThread(forumId: string, threadId: string) {
      if (this.forums[forumId].threads) {
        this.forums[forumId].threads[threadId] = threadId
      } else {
        this.forums[forumId].threads = { threadId }
      }
    }
  }
})
