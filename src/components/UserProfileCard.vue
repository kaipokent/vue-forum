<script setup lang="ts">
import { computed } from 'vue'
import type { User } from '@/utils/types.ts'
import { pluralize } from '@/utils/pluralize.ts'

const { user } = defineProps<{ user: User }>()
import { countObjectProperties } from '@/utils/countObjectProperties.ts'

const userPostsCount = computed(() => countObjectProperties(user.posts))
const userThreadsCount = computed(() => countObjectProperties(user.threads))
</script>

<template>
  <div class="col-3 push-top">
    <div class="profile-card flex flex-col">
      <img :src="user.avatar" alt="" class="avatar-xlarge self-center" />

      <h1 class="title">{{ user.username }}</h1>

      <p class="text-lead">{{ user.name }}</p>

      <p class="text-justify">
        <span v-if="user.bio">{{ user.bio }}</span>
        <span v-else>No bio specified.</span>
      </p>

      <span class="online">{{ user.username }} is online</span>

      <div class="stats">
        <span>{{ pluralize(userPostsCount, 'post') }}</span>
        <span>{{ pluralize(userThreadsCount, 'thread') }}</span>
      </div>

      <hr />

      <p v-if="user.website" class="text-large text-center">
        <i class="fa fa-globe"></i> <a :href="user.website">{{ user.website }}</a>
      </p>
    </div>

    <p class="text-xsmall text-faded text-center">
      Member since june 2003, last visited 4 hours ago
    </p>

    <div class="text-center">
      <hr />
      <a href="edit-profile.html" class="btn-green btn-small">Edit Profile</a>
    </div>
  </div>
</template>

<style scoped></style>
