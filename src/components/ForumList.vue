<script setup lang="ts">
import type { Forum } from '@/utils/types.ts'
import ForumListItem from '@/components/ForumListItem.vue'

const { forums } = defineProps<{ forums: Forum[] }>()
</script>

<template>
  <ForumListItem v-for="forum in forums" :key="forum.id" :forum="forum" />
</template>
