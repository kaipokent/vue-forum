<script setup lang="ts">
import { computed } from 'vue'
import PostList from '@/components/PostList.vue'
import PostEditor, { type NewPost } from '@/components/PostEditor.vue'
import { useThreadsStore } from '@/stores/ThreadsStore.ts'
import { useUsersStore } from '@/stores/UsersStore.ts'
import { pluralize } from '@/utils/pluralize.ts'
import { countObjectProperties } from '@/utils/countObjectProperties.ts'
import { v4 as uuid } from 'uuid'
import { usePostsStore } from '@/stores/PostsStore.ts'

const { id: threadId } = defineProps<{ id: string }>()

const threadsStore = useThreadsStore()
const postsStore = usePostsStore()
const usersStore = useUsersStore()

const thread = computed(() => threadsStore.threads[threadId])
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

const save = (data: NewPost) => {
  const postId = uuid()
  const newPost = {
    text: data.postBody,
    publishedAt: Math.floor(Date.now() / 1000),
    threadId: threadId,
    userId: usersStore.authId,
    '.key': postId
  }
  postsStore.addPost(newPost)
  threadsStore.addPostId(threadId, postId)
  usersStore.addPostId(usersStore.authId, postId)
}
</script>

<template>
  <div class="basis-10/12 mt-6">
    <h1>
      {{ thread.title }}
      <RouterLink :to="{ name: 'ThreadEdit', params: { id: thread['.key'] } }"
        >Edit thread</RouterLink
      >
    </h1>

    <p>
      By <a href="#">{{ user.name }}</a
      >, <AppDate :timestamp="thread.publishedAt * 1000" />.
      <span class="hide-mobile text-faded text-small">{{ threadCountText }}</span>
    </p>

    <PostList :posts="thread.posts" />

    <PostEditor @save="save" />
  </div>
</template>
