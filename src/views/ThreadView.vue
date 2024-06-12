<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PostList from '@/components/PostList.vue'
import PostEditor from '@/components/PostEditor.vue'
import { useThreadsStore } from '@/stores/ThreadsStore.ts'
import { useUsersStore } from '@/stores/UsersStore.ts'
import { pluralize } from '@/utils/pluralize.ts'
import { countObjectProperties } from '@/utils/countObjectProperties.ts'

const route = useRoute()
const threadsStore = useThreadsStore()
const usersStore = useUsersStore()

const thread = computed(() => threadsStore.threads[route.params.id])
const user = computed(() => usersStore.users[thread.value.userId])
const numReplies = computed(() => countObjectProperties(thread.value.posts) - 1)
const numContributors = computed(() => countObjectProperties(thread.value.contributors))

const threadCountText = computed(() => {
  let text = pluralize(numReplies.value, 'reply', 'replies')
  if (numContributors.value > 0) {
    text = text + ` by ${pluralize(numContributors.value, 'contributor')}`
  }

  return text
})
</script>

<template>
  <div class="basis-10/12 mt-6">
    <h1>
      {{ thread.title }}
      <RouterLink :to="{ name: 'ThreadEdit', params: { id: thread.id } }">Edit thread</RouterLink>
    </h1>

    <p>
      By <a href="#">{{ user.name }}</a
      >, <AppDate :timestamp="thread.publishedAt * 1000" />.
      <span class="hide-mobile text-faded text-small">{{ threadCountText }}</span>
    </p>

    <PostList :posts="thread.posts" />

    <PostEditor :thread="thread" />
  </div>
</template>
