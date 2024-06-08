import { defineStore } from 'pinia'
import { stats } from '../data.json'

export const useStatsStore = defineStore('stats', {
  state: () => ({ stats })
})
