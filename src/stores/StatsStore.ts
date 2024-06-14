import { defineStore } from 'pinia'
import type { Stats } from '@/utils/types.ts'
import { statsRef } from '@/firebaseConfig.ts'
import { useDatabaseList } from 'vuefire'

export const useStatsStore = defineStore('stats', () => {
  const stats = useDatabaseList<Stats>(statsRef)

  return { stats }
})
