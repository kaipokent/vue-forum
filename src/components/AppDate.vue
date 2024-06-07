<script setup lang="ts">
import { computed } from 'vue'
import { formatTimeAgo } from '@vueuse/core'

const { classes, timestamp } = defineProps<{ classes?: string; timestamp: number }>()

const publishedDate = computed(() => {
  return new Date(timestamp)
})
const displayDate = computed(() => {
  return formatTimeAgo(publishedDate.value)
})
</script>

<template>
  <span :class="['post-date text-faded', classes]" :title="publishedDate.toDateString()">
    {{ displayDate }}
  </span>
</template>
