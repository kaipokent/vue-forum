<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import sourceData from '../data.json'
import type { Category, Forum } from '@/utils/types.ts'
import CategoryListItem from '@/components/CategoryListItem.vue'

const route = useRoute()

const category: Category = ref(sourceData.categories[route.params.id])
</script>

<template>
  <div class="basis-11/12 mt-6">
    <h1>{{ category.name }}</h1>
    <CategoryListItem :category="category" />
  </div>
</template>
