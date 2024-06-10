<script setup lang="ts">
import { ref } from 'vue'
import Menubar from 'primevue/menubar'
import { useRouter } from 'vue-router'

const router = useRouter()

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => {
      router.push({ name: 'Home' })
    }
  },
  {
    label: 'Categories',
    command: () => {
      router.push({ name: 'Category' })
    }
  },
  {
    label: 'Forums',
    command: () => {
      router.push({ name: 'Forum' })
    }
  },
  {
    label: 'Threads',
    command: () => {
      router.push({ name: 'Thread' })
    }
  }
])
</script>

<template>
  <header class="header bg-surface-100 p-2">
    <Menubar :model="items">
      <template #start>
        <img class="logo" src="../assets/img/vueschool-logo.svg" alt="" />
      </template>
    </Menubar>
  </header>
</template>
