<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PostList from '@/components/PostList.vue'
import PostEditor from '@/components/PostEditor.vue'
import type { Post } from '@/utils/types.ts'
import { useThreadsStore } from '@/stores/ThreadsStore.ts'
import { usePostsStore } from '@/stores/PostsStore.ts'
import { useUsersStore } from '@/stores/UsersStore.ts'

const route = useRoute()
const threadsStore = useThreadsStore()
const postsStore = usePostsStore()
const usersStore = useUsersStore()

const thread = computed(() => threadsStore.threads[route.params.id])
const user = computed(() => usersStore.users[thread.value.userId])
const numReplies = computed(() => Object.keys(thread.value.posts).length - 1)
const numContributors = computed(() =>
  thread.value.contributors ? Object.keys(thread.value.contributors).length : 0
)

const addPost = (post: Post) => {
  const postId = post['.key']
  postsStore.addPost(postId, post)
  threadsStore.addPostId(route.params.id, postId)
  usersStore.addPostId('jUjmgCurRRdzayqbRMO7aTG9X1G2', postId)
}

const threadCountText = computed(() => {
  let text
  if (numReplies.value === 1) {
    text = `${numReplies.value} reply`
  } else {
    text = `${numReplies.value} replies`
  }
  if (numContributors.value > 0) {
    text =
      text + ` by ${numContributors.value} contributor${numContributors.value === 1 ? '' : 's'}`
  }

  return text
})
</script>

<template>
  <div class="basis-10/12 mt-6">
    <h1>{{ thread.title }}</h1>

    <p>
      By <a href="#">{{ user.name }}</a
      >, <AppDate :timestamp="thread.publishedAt * 1000" />.
      <span class="hide-mobile text-faded text-small">{{ threadCountText }}</span>
    </p>

    <PostList :threadPosts="thread.posts" />

    <PostEditor :thread="thread" @save="addPost" />
  </div>
</template>
