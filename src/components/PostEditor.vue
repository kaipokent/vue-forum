<script setup lang="ts">
import Button from 'primevue/button'
import { reset } from '@formkit/vue'
import { ref } from 'vue'
import type { Post, Thread } from '@/utils/types.ts'

const { thread } = defineProps<{ thread: Thread }>()
const emits = defineEmits<{ (e: 'save', post: Post): void }>()

const formData = ref({ postBody: '' })

const submitForm = (data: Record<string, string>) => {
  const postId = `newpost-${Math.random()}`
  const post = {
    text: data.postBody,
    publishedAt: Date.now() / 1000,
    threadId: thread['.key'],
    userId: 'jUjmgCurRRdzayqbRMO7aTG9X1G2',
    '.key': postId
  }
  emits('save', post)
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
