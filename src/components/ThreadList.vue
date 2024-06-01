<script setup lang="ts">
import ThreadListItem from '@/components/ThreadListItem.vue'
import { threads } from '../data.json'
</script>

<template>
  <div class="thread-list">
    <h2
      class="flex justify-start w-full relative bg-blue-950 rounded-bl-full text-slate-50 text-3xl font-thin m-0 px-6 py-3"
    >
      Threads
    </h2>

    <ThreadListItem v-for="thread in threads" :key="thread['.key']" :thread="thread" />
  </div>
</template>
