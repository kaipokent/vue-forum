<script setup lang="ts">
import { computed } from 'vue'
import PostList from '@/components/PostList.vue'
import PostEditor, { type NewPost } from '@/components/PostEditor.vue'
import { useThreadsStore } from '@/stores/ThreadsStore.ts'
import { useUsersStore } from '@/stores/UsersStore.ts'
import { pluralize } from '@/utils/pluralize.ts'
import { v4 as uuid } from 'uuid'
import { usePostsStore } from '@/stores/PostsStore.ts'
import { useRoute } from 'vue-router'

const route = useRoute('/thread/[id]')
const threadId = computed(() => route.params.id)

const threadsStore = useThreadsStore()
const postsStore = usePostsStore()
const usersStore = useUsersStore()

const thread = computed(() => threadsStore.threads[threadId.value])
const user = computed(() => usersStore.users[thread.value.userId])
const numReplies = computed(() => threadsStore.repliesCount(thread.value['.key']))
const numContributors = computed(() => threadsStore.contributorsCount(thread.value['.key']))

const threadCountText = computed(() => {
  let text = pluralize(numReplies.value, 'reply', 'replies')
  if (numContributors.value > 0) {
    text = text + ` by ${pluralize(numContributors.value, 'contributor')}`
  }

  return text
})

const save = (data: NewPost) => {
  const postId = uuid()
  const newPost = {
    text: data.postBody,
    publishedAt: Math.floor(Date.now() / 1000),
    threadId: threadId.value,
    userId: usersStore.authId,
    '.key': postId
  }
  postsStore.addPost(newPost)
  threadsStore.addPostId(threadId.value, postId)
  // threadsStore.addContributor(threadId, usersStore.authId)
  usersStore.addPostId(usersStore.authId, postId)
}
</script>

<template>
  <div v-if="thread" class="basis-10/12 mt-6">
    <h1>
      {{ thread.title }}
      <RouterLink :to="{ name: '/thread/[id].edit', params: { id: thread['.key'] } }"
        >Edit thread</RouterLink
      >
    </h1>

    <div class="flex justify-between">
      <p>
        By <a href="#">{{ user.name }} </a>, <AppDate :timestamp="thread.publishedAt * 1000" />.
      </p>
      <div class="hide-mobile text-faded text-small">{{ threadCountText }}</div>
    </div>

    <PostList :posts="thread.posts" />

    <PostEditor @save="save" />
  </div>
</template>
