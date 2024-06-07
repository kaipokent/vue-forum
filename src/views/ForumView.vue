<script setup lang="ts">
import ThreadList from '@/components/ThreadList.vue'
import { useRoute } from 'vue-router'
import sourceData from '../data.json'
import { computed, ref } from 'vue'

const route = useRoute()

const forums = ref(sourceData.forums)
const threads = ref(sourceData.threads)

const forum = computed(() => forums.value[route.params.id])
const forumThreads = computed(() =>
  Object.values(threads.value).filter((thread) => thread.forumId === route.params.id)
)
</script>

<template>
  <div class="basis-11/12 mt-6">
    <div class="forum-header">
      <div class="forum-details">
        <h1>{{ forum.name }}</h1>
        <p class="text-lead">{{ forum.description }}</p>
      </div>
      <a href="#" class="btn-green btn-small">Start a thread</a>
    </div>

    <div class="basis-11/12 mt-4">
      <ThreadList :threads="forumThreads" />
    </div>
  </div>
</template>

<style scoped></style>
