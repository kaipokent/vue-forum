<script setup lang="ts">
import Button from 'primevue/button'
import { reset } from '@formkit/vue'
import { ref } from 'vue'
import type { Post } from '@/utils/types.ts'

export type NewPost = {
  postBody: string
}

const { post } = defineProps<{ post?: Post }>()
const emits = defineEmits<{ (e: 'save', data: NewPost): void; (e: 'close'): void }>()

const formData = ref({ postBody: post ? post.text : '' })
const formId = ref(post ? `postEditor${post.id}` : 'postEditor')

const submitForm = (data: NewPost) => {
  emits('save', data)
  if (post) {
    emits('close')
  } else {
    reset(formId.value)
  }
}
</script>

<template>
  <FormKit
    :id="formId"
    :name="formId"
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
      :help="`${formData.postBody.length} / 800`"
      validation="length:0,800"
      validation-visibility="live"
      :validation-messages="{
        length: 'Post cannot be more than 120 characters.'
      }"
    />
    <template #actions="{ state }">
      <div class="flex gap-3">
        <Button
          v-if="!!post"
          :disabled="state.loading"
          label="Cancel"
          severity="info"
          @click="emits('close')"
        />
        <Button type="submit" :disabled="state.loading" label="Publish" />
      </div>
    </template>
  </FormKit>
</template>
