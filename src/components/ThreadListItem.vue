<script setup lang="ts">
import type { Thread } from '@/utils/types'
import { users, posts } from '../data.json'
import { computed } from 'vue'

const { thread } = defineProps<{ thread: Thread }>()

const replyText = computed(() => {
  const replies = Object.keys(thread.posts).length - 1
  let replyText = replies.toString()

  if (replies === 1) {
    replyText += ' reply'
  } else {
    replyText += ' replies'
  }
  return replyText
})

const user = computed(() => users[thread.userId])
const lastPostUser = computed(() => users[posts[thread.lastPostId].userId])
</script>

<template>
  <div class="thread flex items-center justify-between py-1.5 pr-0 pl-5 min-h-11">
    <div>
      <p>
        <RouterLink :to="{ name: 'Thread', params: { id: thread['.key'] } }">{{
          thread.title
        }}</RouterLink>
      </p>
      <p class="text-neutral-600/70 text-sm">
        By <a href="#">{{ user.name }}</a
        >, <AppDate :timestamp="thread.publishedAt * 1000" />.
      </p>
    </div>

    <div class="activity">
      <p class="basis-4/12">
        {{ replyText }}
      </p>

      <img class="avatar-medium" :src="lastPostUser.avatar" alt="" />

      <div>
        <p class="text-xsmall">
          <a href="#">{{ lastPostUser.name }}</a>
        </p>
        <AppDate :timestamp="thread.lastPostAt * 1000" classes="text-xsmall" />
      </div>
    </div>
  </div>
</template>
