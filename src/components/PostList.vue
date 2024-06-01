<script setup lang="ts">
import { posts } from '../data.json'
import PostListItem from '@/components/PostListItem.vue'
import type { Posts } from '@/utils/types'

const { threadPosts } = defineProps<{ threadPosts: Posts }>()
</script>

<template>
  <div class="post-list">
    <PostListItem v-for="post in threadPosts" :key="post['.key']" :post="posts[post]" />
  </div>
</template>
