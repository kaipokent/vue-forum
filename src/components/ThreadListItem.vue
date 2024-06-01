<script setup lang="ts">
import type { Thread } from '@/utils/types'
import { users, posts } from '../data.json'
import { computed } from 'vue'

const { thread } = defineProps<{ thread: Thread }>()

const replyText = computed(() => {
  const replies = Object.keys(thread.posts).length - 1
  let replyText = replies.toString()

  if (replies === 0 || replies > 1) {
    replyText += ' replies'
  } else {
    replyText += ' reply'
  }
  return replyText
})

const user = computed(() => users[thread.userId])
const lastPostUser = computed(() => users[posts[thread.lastPostId].userId])
</script>

<template>
  <div class="thread">
    <div>
      <p>
        <RouterLink :to="{ name: 'ThreadView', params: { id: thread['.key'] } }">{{
          thread.title
        }}</RouterLink>
      </p>
      <p class="text-faded text-xsmall">
        By <a href="#">{{ user.name }}</a
        >, {{ new Date(thread.publishedAt).toDateString() }}.
      </p>
    </div>

    <div class="activity">
      <p class="replies-count">
        {{ replyText }}
      </p>

      <img class="avatar-medium" :src="lastPostUser.avatar" alt="" />

      <div>
        <p class="text-xsmall">
          <a href="#">{{ lastPostUser.name }}</a>
        </p>
        <p class="text-xsmall text-faded">2 hours ago</p>
      </div>
    </div>
  </div>
</template>
