<script setup lang="ts">
import { users } from '../data.json'
import { computed } from 'vue'
import type { Post } from '@/utils/types'

const { post } = defineProps<{ post: Post }>()

const user = computed(() => users[post.userId])
const postCountText = computed(() => {
  const posts = user.value?.posts
  if (!posts) {
    return '0 posts'
  } else {
    const postCount = Object.keys(posts).length
    return `${postCount} post${postCount > 1 ? 's' : ''}`
  }
})
</script>

<template>
  <div class="post">
    <div class="user-info">
      <a href="#" class="user-name">{{ user.name }}</a>

      <a href="#">
        <img class="w-24 max-w-24 h-24 max-h-24" :src="user.avatar" alt="" />
      </a>

      <p class="desktop-only text-small">{{ postCountText }}</p>
    </div>

    <div class="post-content">
      <div>
        {{ post.text }}
      </div>
    </div>

    <div class="post-date text-faded">6 hours ago</div>
  </div>
</template>
