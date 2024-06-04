<script setup lang="ts">
import { computed, ref } from 'vue'
import { threads } from '../data.json'
import { useRoute } from 'vue-router'
import PostList from '@/components/PostList.vue'
import Button from 'primevue/button'
import { reset } from '@formkit/vue'

const route = useRoute()

const formData = ref({ postBody: '' })

const thread = computed(() => threads[route.params.id])
const addPost = async (data: {}) => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  reset('addPost')
}
</script>

<template>
  <div class="basis-10/12 mt-6">
    <h1>{{ thread.title }}</h1>

    <PostList :threadPosts="thread.posts" />

    <FormKit name="addPost" type="form" @submit="addPost" v-model="formData">
      <FormKit
        type="textarea"
        name="postBody"
        label="Add a post"
        input-class="w-full"
        :help="`${formData.postBody.length} / 120`"
        validation="length:0,120"
        validation-visibility="live"
        :validation-messages="{
          length: 'Post cannot be more than 120 characters.'
        }"
        rows="5"
        cols="30"
      />
      <template #submit="{ state }">
        <Button type="submit" :disabled="state.loading" label="Add post" />
      </template>
    </FormKit>
  </div>
</template>
