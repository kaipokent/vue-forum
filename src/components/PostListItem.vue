<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Post } from '@/utils/types'
import { useUsersStore } from '@/stores/UsersStore.ts'
import PostEditor, { type NewPost } from '@/components/PostEditor.vue'
import Button from 'primevue/button'
import { usePostsStore } from '@/stores/PostsStore.ts'

const { post } = defineProps<{ post: Post }>()

const postsStore = usePostsStore()
const usersStore = useUsersStore()

const editing = ref(false)
const canEdit = ref(post.userId === usersStore.authId)

const user = computed(() => usersStore.user(post.userId))
const postCountText = computed(() => {
  const postCount = usersStore.postCount(user.value)
  return `${postCount} post${postCount > 1 ? 's' : ''}`
})

const save = (data: NewPost) => {
  // postsStore.addPost({
  //   ...post,
  //   text: data.postBody,
  //   edited: {
  //     at: Math.floor(Date.now() / 1000),
  //     by: usersStore.authId,
  //     moderated: false
  //   }
  // })
}
</script>

<template>
  <div v-if="user" class="post">
    <div class="user-info">
      <a href="#" class="user-name">{{ user.name }}</a>

      <a href="#">
        <img class="w-24 max-w-24 h-24 max-h-24" :src="user.avatar" alt="" />
      </a>

      <p class="desktop-only text-small">{{ postCountText }}</p>

      <!--      <Button v-if="canEdit && !editing" label="Edit post" text @click="editing = true" />-->
    </div>

    <div :class="['post-content']">
      <div v-if="!editing" class="flex justify-between items-start gap-3">
        <div>{{ post.text }}</div>
        <Button
          v-if="canEdit && !editing"
          icon="pi pi-pencil"
          text
          raised
          aria-label="Edit post"
          @click="editing = true"
          class="min-w-10"
        />
      </div>
      <PostEditor
        v-else
        :threadId="post.threadId"
        :post="post"
        @save="save"
        @close="editing = false"
      />
    </div>

    <div class="post-date text-faded">
      <div v-if="post.edited" class="edition-info">edited</div>
      <AppDate :timestamp="post.publishedAt * 1000" />
    </div>
  </div>
</template>
