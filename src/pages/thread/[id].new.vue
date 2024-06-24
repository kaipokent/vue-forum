<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useForumsStore } from '@/stores/ForumsStore.ts'
import { v4 as uuid } from 'uuid'
import { useUsersStore } from '@/stores/UsersStore.ts'
import { useThreadsStore } from '@/stores/ThreadsStore.ts'
import { usePostsStore } from '@/stores/PostsStore.ts'
import { toSlug } from '@/utils/toSlug.ts'
import ThreadEditor, { type NewThread } from '@/components/ThreadEditor.vue'

const route = useRoute('/thread/[id]')
const forumId = computed(() => route.params.id)

const router = useRouter()
const forumsStore = useForumsStore()
const threadsStore = useThreadsStore()
const postsStore = usePostsStore()
const usersStore = useUsersStore()

const forum = ref(forumsStore.forums[forumId.value])

const save = (thread: NewThread) => {
  const threadId = uuid()
  const postId = uuid()
  const publishedAt = Math.floor(Date.now() / 1000)
  const post = {
    '.key': postId,
    publishedAt: publishedAt,
    text: thread.content,
    threadId: threadId,
    userId: usersStore.authId
  }
  const threadData = {
    '.key': threadId,
    contributors: { [usersStore.authId]: usersStore.authId },
    firstPostId: postId,
    forumId: forumId.value,
    lastPostAt: publishedAt,
    lastPostId: postId,
    posts: { [postId]: postId },
    publishedAt: publishedAt,
    slug: toSlug(thread.title),
    title: thread.title,
    userId: usersStore.authId
  }
  forumsStore.addThread(forumId.value, threadId)
  threadsStore.createThread(threadData)
  postsStore.addPost(post)
  usersStore.addPostId(usersStore.authId, postId)
  usersStore.addThreadId(usersStore.authId, threadId)

  router.push({ name: '/thread/[id]', params: { id: threadId } })
}
</script>

<template>
  <div v-if="forum" class="col-full push-top">
    <h1>
      Create new thread in <i>{{ forum.name }}</i>
    </h1>

    <ThreadEditor @save="save" />
  </div>
</template>
