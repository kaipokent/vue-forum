<script setup lang="ts">
import Button from 'primevue/button'
import { reset } from '@formkit/vue'
import { ref } from 'vue'
import type { Thread } from '@/utils/types.ts'
import { useUsersStore } from '@/stores/UsersStore.ts'
import { useThreadsStore } from '@/stores/ThreadsStore.ts'
import { usePostsStore } from '@/stores/PostsStore.ts'

const { thread } = defineProps<{ thread: Thread }>()

const threadsStore = useThreadsStore()
const postsStore = usePostsStore()
const usersStore = useUsersStore()

const formData = ref({ postBody: '' })

const submitForm = (data: Record<string, string>) => {
  const postId = `newpost-${Math.random()}`
  const post = {
    text: data.postBody,
    publishedAt: Math.floor(Date.now() / 1000),
    threadId: thread['.key'],
    userId: usersStore.authId,
    '.key': postId
  }
  postsStore.addPost(post)
  threadsStore.addPostId(thread['.key'], postId)
  usersStore.addPostId(usersStore.authId, postId)
  reset('postEditor')
}
</script>

<template>
  <FormKit
    id="postEditor"
    name="postEditor"
    type="form"
    @submit="submitForm"
    v-model="formData"
    actions-class="text-end"
  >
    <FormKit
      type="textarea"
      name="postBody"
      label="Add a post"
      outer-class="max-w-full"
      input-class="min-h-32"
      :help="`${formData.postBody.length} / 120`"
      validation="length:0,120"
      validation-visibility="live"
      :validation-messages="{
        length: 'Post cannot be more than 120 characters.'
      }"
    />
    <template #submit="{ state }">
      <Button type="submit" :disabled="state.loading" label="Submit post" />
    </template>
  </FormKit>
</template>
