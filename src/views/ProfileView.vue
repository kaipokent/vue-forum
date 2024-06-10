<script setup lang="ts">
import { useUsersStore } from '@/stores/UsersStore.ts'
import { computed, ref } from 'vue'
import { pluralize } from '@/utils/pluralize.ts'
import PostList from '@/components/PostList.vue'
import { countObjectProperties } from '@/utils/countObjectProperties.ts'
import UserProfileCard from '@/components/UserProfileCard.vue'

const usersStore = useUsersStore()

const user = ref(usersStore.authUser)
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
