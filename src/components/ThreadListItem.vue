<script setup lang="ts">
import type { Thread } from '@/utils/types'
import { computed } from 'vue'
import { usePostsStore } from '@/stores/PostsStore.ts'
import { useUsersStore } from '@/stores/UsersStore.ts'
import { pluralize } from '@/utils/pluralize.ts'
import { countObjectProperties } from '@/utils/countObjectProperties.ts'

const { thread } = defineProps<{ thread: Thread }>()
const postsStore = usePostsStore()
const usersStore = useUsersStore()

const replyText = computed(() => {
  const replies = countObjectProperties(thread.posts) - 1
  return pluralize(replies, 'reply', 'replies')
})

const user = computed(() => usersStore.users[thread.userId])
const lastPostUser = computed(() => usersStore.users[postsStore.posts[thread.lastPostId].userId])
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
