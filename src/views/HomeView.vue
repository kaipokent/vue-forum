<script setup lang="ts">
import { ref } from 'vue'
import sourceData from '../data.json'
import CategoryList from '@/components/CategoryList.vue'

const categories = ref(Object.values(sourceData.categories))
</script>

<template>
  <div class="basis-11/12">
    <h1>Welcome to the forum</h1>
    <CategoryList :categories="categories" />
  </div>
</template>
