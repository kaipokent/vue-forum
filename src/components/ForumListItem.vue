<script setup lang="ts">
import type { Forum } from '@/utils/types.ts'
import { computed } from 'vue'

const { forum } = defineProps<{ forum: Forum }>()

const threadCount = computed(() => {
  if (!forum.threads) {
    return 0
  } else {
    return Object.values(forum.threads).length
  }
})
</script>

<template>
  <div class="forum-listing">
    <div class="forum-details">
      <RouterLink :to="{ name: 'Forum', params: { id: forum['.key'] } }" class="text-xl">
        {{ forum.name }}
      </RouterLink>
      <p>{{ forum.description }}</p>
    </div>

    <div class="threads-count">
      <p>
        <span class="count">{{ threadCount }}</span>
        {{ threadCount === 1 ? ' thread' : ' threads' }}
      </p>
    </div>

    <!--    <div class="last-thread">-->
    <!--      <img-->
    <!--        class="avatar"-->
    <!--        src="https://pbs.twimg.com/profile_images/719242842598699008/Nu43rQz1_400x400.jpg"-->
    <!--        alt=""-->
    <!--      />-->
    <!--      <div class="last-thread-details">-->
    <!--        <a href="thread.html">Post Reactions</a>-->
    <!--        <p class="text-xsmall">By <a href="profile.html">Rolf Haug</a>, a month ago</p>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<style scoped></style>
