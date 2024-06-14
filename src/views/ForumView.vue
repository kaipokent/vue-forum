<script setup lang="ts">
import ThreadList from '@/components/ThreadList.vue'
import { computed } from 'vue'
import { useForumsStore } from '@/stores/ForumsStore.ts'
import { useThreadsStore } from '@/stores/ThreadsStore.ts'
import Button from 'primevue/button'

const { id: routeId } = defineProps<{ id: string }>()

const forumsStore = useForumsStore()
const threadsStore = useThreadsStore()

const forum = computed(() => forumsStore.forum(routeId))
const forumThreads = computed(() =>
  threadsStore.threadsList.filter((thread) => thread.forumId === routeId)
)
</script>

<template>
  <div class="basis-11/12 mt-6">
    <div v-if="forum" class="forum-header">
      <div class="forum-details">
        <h1>{{ forum.name }}</h1>
        <p class="text-lead">{{ forum.description }}</p>
      </div>
      <RouterLink :to="{ name: 'ThreadCreate', params: { id: forum.id } }">
        <Button label="Start a thread" />
      </RouterLink>
    </div>

    <div class="basis-11/12 mt-4">
      <ThreadList :threads="forumThreads" />
    </div>
  </div>
</template>

<style scoped></style>
