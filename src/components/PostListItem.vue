<script setup lang="ts">
import { computed } from 'vue'
import type { Post } from '@/utils/types'
import { useUsersStore } from '@/stores/UsersStore.ts'
import { countObjectProperties } from '@/utils/countObjectProperties.ts'

const { post } = defineProps<{ post: Post }>()
const usersStore = useUsersStore()

const user = computed(() => usersStore.users[post.userId])
const postCountText = computed(() => {
  const posts = user.value?.posts
  if (!posts) {
    return '0 posts'
  } else {
    const postCount = countObjectProperties(posts)
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
      {{ post.text }}
    </div>

    <AppDate :timestamp="post.publishedAt * 1000" />
  </div>
</template>
