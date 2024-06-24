<script setup lang="ts">
import { ref, type UnwrapRef } from 'vue'
import { useRoute } from 'vue-router'
import type { Category } from '@/utils/types.ts'
import CategoryListItem from '@/components/CategoryListItem.vue'
import { useCategoriesStore } from '@/stores/CategoriesStore.ts'

const route = useRoute('/category/[id]')
const categoriesStore = useCategoriesStore()

const category = ref<Category>(categoriesStore.categories[route.params.id])
</script>

<template>
  <div class="basis-11/12 mt-6">
    <h1>{{ category.name }}</h1>
    <CategoryListItem :category="category" />
  </div>
</template>
