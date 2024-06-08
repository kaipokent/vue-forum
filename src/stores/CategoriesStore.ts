import { defineStore } from 'pinia'
import { categories } from '../data.json'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({ categories }),
  getters: {
    values: (state) => Object.values(state.categories)
  }
})
