<script setup lang="ts">
import { computed } from 'vue'
import { useTimeAgo } from '@vueuse/core'

const { classes, timestamp } = defineProps<{ classes?: string; timestamp: number }>()

const publishedDate = computed(() => {
  return new Date(timestamp)
})

const displayDate = useTimeAgo(publishedDate.value)
</script>

<template>
  <span :class="['post-date text-faded', classes]" :title="publishedDate.toDateString()">
    {{ displayDate }}
  </span>
</template>
