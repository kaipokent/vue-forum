<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useThreadsStore } from '@/stores/ThreadsStore.ts'
import { usePostsStore } from '@/stores/PostsStore.ts'
import { useUsersStore } from '@/stores/UsersStore.ts'
import { toSlug } from '@/utils/toSlug.ts'
import ThreadEditor, { type NewThread } from '@/components/ThreadEditor.vue'

const { id: threadId } = defineProps<{ id: string }>()

const router = useRouter()
const threadsStore = useThreadsStore()
const postsStore = usePostsStore()
const usersStore = useUsersStore()

const currentThread = ref(threadsStore.threads[threadId])
const currentPost = ref(postsStore.posts[currentThread.value.firstPostId])

const save = (thread: NewThread) => {
  const post = {
    ...currentPost.value,
    text: thread.content,
    edited: {
      at: Math.floor(Date.now() / 1000),
      by: usersStore.authId,
      moderated: false
    }
  }
  const threadData = {
    ...currentThread.value,
    slug: toSlug(thread.title),
    title: thread.title
  }
  threadsStore.createThread(threadData)
  postsStore.addPost(post)

  router.push({ name: 'Thread', params: { id: threadId } })
}
</script>

<template>
  <div class="col-full push-top">
    <h1>Editing thread</h1>

    <ThreadEditor
      @save="save"
      :currentThread="{ title: currentThread.title, content: currentPost.text }"
    />
  </div>
</template>
