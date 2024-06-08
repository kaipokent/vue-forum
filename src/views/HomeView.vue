<script setup lang="ts">
import { useCategoriesStore } from '@/stores/CategoriesStore.ts'
import CategoryListItem from '@/components/CategoryListItem.vue'

const categoriesStore = useCategoriesStore()
</script>

<template>
  <div class="basis-11/12">
    <h1>Welcome to the forum</h1>
    <CategoryListItem
      v-for="category in categoriesStore.values"
      :key="category['.key']"
      :category="category"
    />
  </div>
</template>
