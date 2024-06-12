<script setup lang="ts">
import ThreadList from '@/components/ThreadList.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useForumsStore } from '@/stores/ForumsStore.ts'
import { useThreadsStore } from '@/stores/ThreadsStore.ts'
import Button from 'primevue/button'

const route = useRoute()
const forumsStore = useForumsStore()
const threadsStore = useThreadsStore()

const forum = computed(() => forumsStore.forums[route.params.id])
const forumThreads = computed(() =>
  threadsStore.values.filter((thread) => thread.forumId === route.params.id)
)
</script>

<template>
  <div class="basis-11/12 mt-6">
    <div class="forum-header">
      <div class="forum-details">
        <h1>{{ forum.name }}</h1>
        <p class="text-lead">{{ forum.description }}</p>
      </div>
      <RouterLink :to="{ name: 'ThreadCreate', params: { id: forum['.key'] } }">
        <Button label="Start a thread" />
      </RouterLink>
    </div>

    <div class="basis-11/12 mt-4">
      <ThreadList :threads="forumThreads" />
    </div>
  </div>
</template>

<style scoped></style>
