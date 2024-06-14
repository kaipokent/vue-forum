<script setup lang="ts">
import { computed } from 'vue'
import CategoryListItem from '@/components/CategoryListItem.vue'
import { useCategoriesStore } from '@/stores/CategoriesStore.ts'

const { id: routeId } = defineProps<{ id: string }>()

const categoriesStore = useCategoriesStore()

const category = computed(() => categoriesStore.category(routeId))
</script>

<template>
  <div v-if="category" class="basis-11/12 mt-6">
    <h1>{{ category.name }}</h1>
    <CategoryListItem :category="category" />
  </div>
</template>
