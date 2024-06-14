import { defineStore } from 'pinia'
import { moderatorsRef } from '@/firebaseConfig.ts'
import { useDatabaseList } from 'vuefire'
import type { Moderators } from '@/utils/types.ts'

export const useModeratorsStore = defineStore('moderators', () => {
  const moderators = useDatabaseList<Moderators>(moderatorsRef)

  return { moderators }
})
