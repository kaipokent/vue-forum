<script setup lang="ts">
import { useUsersStore } from '@/stores/UsersStore.ts'
import { ref, watchEffect } from 'vue'
import PostList from '@/components/PostList.vue'
import UserProfileCard from '@/components/UserProfileCard.vue'

const usersStore = useUsersStore()

const user = ref(usersStore.authUser)

watchEffect(() => {
  user.value = usersStore.authUser
})
</script>

<template>
  <div class="flex-grid">
    <UserProfileCard :user="user" />

    <div class="col-7 push-top">
      <div class="profile-header">
        <span class="text-lead"> Joker's recent activity </span>
        <a href="#">See only started threads?</a>
      </div>

      <hr />
      <PostList v-if="user.posts" :posts="user.posts" />
    </div>
  </div>
</template>
