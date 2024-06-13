<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { reset } from '@formkit/vue'

export type NewThread = {
  title: string
  content: string
}

const { currentThread } = defineProps<{ currentThread?: NewThread }>()
const emits = defineEmits<{ (e: 'save', data: NewThread): void }>()

const router = useRouter()

const thread = ref<NewThread>(currentThread ? currentThread : { title: '', content: '' })

const save = (data: NewThread) => {
  emits('save', data)
  reset('userEdit')
}
</script>

<template>
  <FormKit id="userEdit" name="userEdit" type="form" v-model="thread" @submit="save">
    <FormKit type="text" name="title" label="Title" :value="thread.title" validation="required" />
    <FormKit
      type="textarea"
      name="content"
      label="Content"
      :value="thread.content"
      validation="required"
      outer-class="max-w-full"
      input-class="min-h-32"
    />

    <template #actions="{ state }">
      <div class="flex gap-3">
        <Button label="Cancel" :disabled="state.loading" @click="router.back()" severity="info" />
        <Button
          type="submit"
          :label="currentThread ? 'Update' : 'Publish'"
          :disabled="state.loading"
        />
      </div>
    </template>
  </FormKit>
</template>
