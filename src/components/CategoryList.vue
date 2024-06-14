<script setup lang="ts">
import CategoryListItem from '@/components/CategoryListItem.vue'
import type { Category } from '@/utils/types.ts'

const { categories } = defineProps<{ categories: Record<string, Category> }>()
</script>

<template>
  <div>
    <CategoryListItem v-for="category in categories" :key="category.id" :category="category" />
  </div>
</template>
