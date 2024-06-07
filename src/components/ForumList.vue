<script setup lang="ts">
import type { Forum } from '@/utils/types.ts'
import ForumListItem from '@/components/ForumListItem.vue'

const { forums } = defineProps<{ forums: Record<string, Forum> }>()
</script>

<template>
  <ForumListItem v-for="forum in forums" :key="forum['.key']" :forum="forum" />
</template>
