import { defineStore } from 'pinia'
import { categoriesRef } from '@/firebaseConfig.ts'
import { useDatabaseList, useDatabaseObject } from 'vuefire'
import type { Category } from '@/utils/types.ts'
import { computed } from 'vue'

export const useCategoriesStore = defineStore('categories', () => {
  const categories = useDatabaseObject<Record<string, Category>>(categoriesRef)
  const categoriesList = useDatabaseList<Category>(categoriesRef)

  const category = computed(() => (id: string) => {
    return categories.value ? categories.value[id] : null
  })

  return { categories, categoriesList, category }
})
