<script setup lang="ts">
import ThreadListItem from '@/components/ThreadListItem.vue'
import { threads } from '../data.json'
</script>

<template>
  <div class="thread-list">
    <h2 class="list-title">Threads</h2>

    <ThreadListItem v-for="thread in threads" :key="thread['.key']" :thread="thread" />
  </div>
</template>
