<script setup lang="ts">
import { computed, ref } from 'vue'
import type { User } from '@/utils/types.ts'
import { pluralize } from '@/utils/pluralize.ts'
import { countObjectProperties } from '@/utils/countObjectProperties.ts'
import { useCloned, useDateFormat, useTimeAgo } from '@vueuse/core'
import Button from 'primevue/button'
import { useUsersStore } from '@/stores/UsersStore.ts'

const { user } = defineProps<{ user: User }>()

const usersStore = useUsersStore()
const memberSince = useDateFormat(user.registeredAt * 1000, 'MMMM YYYY')
const lastVisited = useTimeAgo(user.lastVisitAt * 1000)
const { cloned: activeUser } = useCloned(user)

const editing = ref(false)

const userPostsCount = computed(() => countObjectProperties(user.posts))
const userThreadsCount = computed(() => countObjectProperties(user.threads))

const enableEdit = () => {
  editing.value = true
}

const cancel = () => {
  editing.value = false
}

const updateUser = () => {
  usersStore.updateUser(activeUser.value)
  cancel()
}
</script>

<template>
  <div class="col-3 push-top">
    <div class="profile-card flex flex-col">
      <img :src="user.avatar" alt="" class="avatar-xlarge self-center" />

      <FormKit
        v-if="editing"
        id="userEdit"
        name="userEdit"
        type="form"
        v-model="activeUser"
        @submit="updateUser"
      >
        <FormKit
          type="text"
          name="username"
          label="Username"
          :value="activeUser.username"
          validation="required"
        />
        <FormKit
          type="text"
          label="Name"
          name="name"
          :value="activeUser.name"
          validation="required"
        />
        <FormKit
          type="textarea"
          name="bio"
          label="Bio"
          placeholder="Write a few words about yourself"
          :help="`${activeUser.bio ? activeUser.bio.length : 0} / 120`"
          validation="length:0,120"
          validation-visibility="live"
          :validation-messages="{
            length: 'We don\'t need an essay...'
          }"
        />
        <FormKit
          type="email"
          name="email"
          label="Email"
          :value="activeUser.email"
          validation="required|email"
        />
        <FormKit
          type="text"
          name="website"
          label="Website"
          :value="activeUser.website"
          validation="url"
        />
        <template #actions="{ state }">
          <div class="flex space-between mr-5">
            <Button label="Cancel" :disabled="state.loading" @click="cancel" />
            <Button type="submit" label="Save" :disabled="state.loading" />
          </div>
        </template>
      </FormKit>

      <template v-else>
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
        <Button class="ml-5" label="Edit profile" @click="enableEdit" />
      </template>
    </div>

    <p class="text-xsmall text-faded text-center">
      Member since {{ memberSince }}, last visited {{ lastVisited }}
    </p>

    <hr />
  </div>
</template>
