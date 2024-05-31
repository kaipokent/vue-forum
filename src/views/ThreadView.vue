<script setup lang="ts">
import { threads, users, posts } from '../data.json'
import { useRoute } from 'vue-router'
const route = useRoute()

const thread = threads[route.params.id]
</script>

<template>
  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>

    <div class="post-list">
      <div v-for="postId in thread.posts" :key="posts[postId]['.key']" class="post">
        <div class="user-info">
          <a href="#" class="user-name">{{ users[posts[postId].userId].name }}</a>

          <a href="#">
            <img class="avatar-large" :src="users[posts[postId].userId].avatar" alt="" />
          </a>

          <p class="desktop-only text-small">107 posts</p>
        </div>

        <div class="post-content">
          <div>
            {{ posts[postId].text }}
          </div>
        </div>

        <div class="post-date text-faded">6 hours ago</div>
      </div>
    </div>
  </div>
</template>
