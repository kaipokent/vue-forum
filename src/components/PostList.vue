<script setup lang="ts">
import PostListItem from '@/components/PostListItem.vue'
import { usePostsStore } from '@/stores/PostsStore.ts'

const { posts } = defineProps<{ posts: Record<string, string> }>()
const postsStore = usePostsStore()
</script>

<template>
  <div class="post-list" v-if="postsStore.posts">
    <PostListItem
      v-for="post in posts"
      :key="postsStore.posts[post].id"
      :post="postsStore.posts[post]"
    />
  </div>
</template>
