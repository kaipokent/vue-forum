<script setup lang="ts">
import { threads } from '../data.json'
import { useRoute } from 'vue-router'
import PostList from '@/components/PostList.vue'
import { computed } from 'vue'
const route = useRoute()

const thread = computed(() => threads[route.params.id])
</script>

<template>
  <div class="basis-10/12 mt-6">
    <h1>{{ thread.title }}</h1>

    <PostList :threadPosts="thread.posts" />
  </div>
</template>
