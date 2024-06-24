<script setup lang="ts">
import { ref } from 'vue'
import Menubar from 'primevue/menubar'
import Menu from 'primevue/menu'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useUsersStore } from '@/stores/UsersStore.ts'

const router = useRouter()
const usersStore = useUsersStore()

const user = ref(usersStore.authUser)
const userMenu = ref()
const userMenuItems = ref([
  {
    items: [
      {
        label: 'View profile',
        command: () => {
          router.push({ name: '/profile/' })
        }
      },
      {
        label: 'Log out'
      }
    ]
  }
])
const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => {
      router.push({ name: '/' })
    }
  },
  {
    label: 'Categories',
    command: () => {
      // router.push({ name: 'category' })
    }
  },
  {
    label: 'Forums',
    command: () => {
      // router.push({ name: 'forum' })
    }
  },
  {
    label: 'Threads',
    command: () => {
      // router.push({ name: 'Thread' })
    }
  }
])

const toggle = (event: MouseEvent) => {
  userMenu.value.toggle(event)
}
</script>

<template>
  <header class="header bg-surface-100 p-2">
    <Menubar :model="items">
      <template #start>
        <img class="logo" src="../assets/img/vueschool-logo.svg" alt="" />
      </template>
      <template #end>
        <div class="navbar-user flex items-center gap-2">
          <Button
            type="button"
            text
            plain
            @click="toggle"
            aria-haspopup="true"
            aria-controls="overlay_menu"
          >
            <img class="avatar-small" :src="user.avatar" alt="" />
            <div class="hide-mobile">{{ user.name }}</div>
          </Button>
          <Menu ref="userMenu" id="overlay_menu" :model="userMenuItems" :popup="true" />
        </div>
      </template>
    </Menubar>
  </header>
</template>
