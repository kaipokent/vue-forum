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

const addPost = (post: Post) => {
  const postId = post['.key']
  posts.value[postId] = post
  threads.value[route.params.id].posts[postId] = postId
  users.value['jUjmgCurRRdzayqbRMO7aTG9X1G2'].posts[postId] = postId
}
</script>

<template>
  <div class="basis-10/12 mt-6">
    <h1>{{ thread.title }}</h1>

    <PostList :threadPosts="thread.posts" />

    <PostEditor :thread="thread" @save="addPost" />
  </div>
</template>
