<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useForumsStore } from '@/stores/ForumsStore.ts'
import { v4 as uuid } from 'uuid'
import { useUsersStore } from '@/stores/UsersStore.ts'
import { useThreadsStore } from '@/stores/ThreadsStore.ts'
import { usePostsStore } from '@/stores/PostsStore.ts'
import { toSlug } from '@/utils/toSlug.ts'

const { id: forumId } = defineProps<{ id: string }>()

const router = useRouter()
const forumsStore = useForumsStore()
const threadsStore = useThreadsStore()
const postsStore = usePostsStore()
const usersStore = useUsersStore()

const forum = ref(forumsStore.forums[forumId])
const thread = ref()

const save = () => {
  const threadId = uuid()
  const postId = uuid()
  const publishedAt = Math.floor(Date.now() / 1000)
  const post = {
    '.key': postId,
    publishedAt: publishedAt,
    text: thread.value.content,
    threadId: threadId,
    userId: usersStore.authId
  }
  const threadData = {
    '.key': threadId,
    contributors: { [usersStore.authId]: usersStore.authId },
    firstPostId: postId,
    forumId: forumId,
    lastPostAt: publishedAt,
    lastPostId: postId,
    posts: { [postId]: postId },
    publishedAt: publishedAt,
    slug: toSlug(thread.value.title),
    title: thread.value.title,
    userId: usersStore.authId
  }
  forumsStore.addThread(forumId, threadId)
  threadsStore.createThread(threadData)
  postsStore.addPost(post)
  usersStore.addPostId(usersStore.authId, postId)
  usersStore.addThreadId(usersStore.authId, threadId)

  router.push({ name: 'Thread', params: { id: threadId } })
}
</script>

<template>
  <div class="col-full push-top">
    <h1>
      Create new thread in <i>{{ forum.name }}</i>
    </h1>

    <FormKit id="userEdit" name="userEdit" type="form" v-model="thread" @submit="save">
      <FormKit
        type="text"
        name="title"
        label="Title:"
        :value="thread.title"
        validation="required"
      />
      <FormKit
        type="textarea"
        name="content"
        label="Content:"
        :value="thread.content"
        validation="required"
        outer-class="max-w-full"
        input-class="min-h-32"
      />

      <template #actions="{ state }">
        <div class="flex gap-3">
          <Button label="Cancel" :disabled="state.loading" @click="router.back()" severity="info" />
          <Button type="submit" label="Save" :disabled="state.loading" />
        </div>
      </template>
    </FormKit>
  </div>
</template>
