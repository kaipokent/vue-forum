import { defineStore } from 'pinia'
import { categories } from '../data.json'
import type { Category } from '@/utils/types.ts'

interface State {
  categories: Record<string, Category>
}

export const useCategoriesStore = defineStore('categories', {
  state: (): State => ({ categories }),
  getters: {
    values: (state) => Object.values(state.categories)
  }
})
