import { defineStore } from 'pinia'
import { moderators } from '../data.json'

export const useModeratorsStore = defineStore('moderators', {
  state: () => ({ moderators })
})
