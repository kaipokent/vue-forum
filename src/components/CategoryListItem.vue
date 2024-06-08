<script setup lang="ts">
import { computed } from 'vue'
import type { Category, Forum } from '@/utils/types.ts'
import ForumList from '@/components/ForumList.vue'
import { useForumsStore } from '@/stores/ForumsStore.ts'

const { category } = defineProps<{ category: Category }>()

const forums = useForumsStore()

const forumsForCategory = computed(() => {
  return forums.values.filter((forum: Forum) => forum.categoryId === category['.key'])
})
</script>

<template>
  <div class="forum-list p-0 bg-white">
    <h2 class="list-title">
      <RouterLink :to="{ name: 'Category', params: { id: category['.key'] } }">
        {{ category.name }}
      </RouterLink>
    </h2>

    <ForumList :forums="forumsForCategory" />
  </div>
</template>
