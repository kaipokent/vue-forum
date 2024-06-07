<script setup lang="ts">
import { posts } from '../data.json'
import PostListItem from '@/components/PostListItem.vue'
import type { Post } from '@/utils/types.ts'

const { threadPosts } = defineProps<{ threadPosts: Post[] }>()
</script>

<template>
  <div class="post-list">
    <PostListItem v-for="post in threadPosts" :key="post['.key']" :post="posts[post]" />
  </div>
</template>
