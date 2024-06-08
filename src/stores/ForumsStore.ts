import { defineStore } from 'pinia'
import { forums } from '../data.json'

export const useForumsStore = defineStore('forums', {
  state: () => ({ forums }),
  getters: {
    values: (state) => Object.values(state.forums)
  }
})
