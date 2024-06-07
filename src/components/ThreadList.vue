<script setup lang="ts">
import ThreadListItem from '@/components/ThreadListItem.vue'
import type { Thread } from '@/utils/types.ts'

const { threads } = defineProps<{ threads: Thread[] }>()
</script>

<template>
  <div class="thread-list p-0 bg-white">
    <h2 class="list-title">Threads</h2>

    <ThreadListItem v-for="thread in threads" :key="thread['.key']" :thread="thread" />
  </div>
</template>
