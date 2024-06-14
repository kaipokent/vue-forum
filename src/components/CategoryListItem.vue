<script setup lang="ts">
import { computed } from 'vue'
import type { Category } from '@/utils/types.ts'
import ForumList from '@/components/ForumList.vue'
import { useForumsStore } from '@/stores/ForumsStore.ts'

const { category } = defineProps<{ category: Category }>()

const forumsStore = useForumsStore()

const forumsForCategory = computed(() => {
  return forumsStore.forumsList.filter((forum) => forum.categoryId === category.id)
})
</script>

<template>
  <div class="forum-list p-0 bg-white">
    <h2 class="list-title">
      <RouterLink :to="{ name: 'Category', params: { id: category.id } }">
        {{ category.name }}
      </RouterLink>
    </h2>

    <ForumList :forums="forumsForCategory" />
  </div>
</template>
