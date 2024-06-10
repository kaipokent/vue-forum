<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheNavbar from '@/components/TheNavbar.vue'
</script>

<template>
  <TheNavbar />
  <main class="bg-surface-100 pb-8">
    <div class="flex justify-center flex-wrap">
      <RouterView />
    </div>
  </main>
</template>
