<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import PostList from '@/components/PostList.vue'
import PostEditor from '@/components/PostEditor.vue'
import sourceData from '../data.json'
import type { Post } from '@/utils/types.ts'

const route = useRoute()

const threads = ref(sourceData.threads)
const posts = ref(sourceData.posts)
const users = ref(sourceData.users)

const thread = computed(() => threads.value[route.params.id])
const user = computed(() => users.value[thread.value.userId])
const numReplies = computed(() => Object.keys(thread.value.posts).length - 1)
const numContributors = computed(() =>
  thread.value.contributors ? Object.keys(thread.value.contributors).length : 0
)

const addPost = (post: Post) => {
  const postId = post['.key']
  posts.value[postId] = post
  threads.value[route.params.id].posts[postId] = postId
  users.value['jUjmgCurRRdzayqbRMO7aTG9X1G2'].posts[postId] = postId
}

const threadCountData = computed(() => {
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
      <span class="hide-mobile text-faded text-small">{{ threadCountData }}</span>
    </p>

    <PostList :threadPosts="thread.posts" />

    <PostEditor :thread="thread" @save="addPost" />
  </div>
</template>
