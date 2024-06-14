<script setup lang="ts">
import { useCategoriesStore } from '@/stores/CategoriesStore.ts'
import CategoryListItem from '@/components/CategoryListItem.vue'

const categoriesStore = useCategoriesStore()
</script>

<template>
  <div class="basis-11/12">
    <h1>Welcome to the forum</h1>
    <CategoryListItem
      v-for="category in categoriesStore.categories"
      :key="category.id"
      :category="category"
    />
  </div>
</template>
