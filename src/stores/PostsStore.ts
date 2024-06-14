import { defineStore } from 'pinia'
import type { Post } from '@/utils/types.ts'
import { useDatabaseList, useDatabaseObject } from 'vuefire'
import { postsRef } from '@/firebaseConfig.ts'
import { computed } from 'vue'

export const usePostsStore = defineStore('posts', () => {
  const posts = useDatabaseObject<Record<string, Post>>(postsRef)
  const postsList = useDatabaseList<Post>(postsRef)

  const post = computed(() => (id: string) => {
    return posts.value ? posts.value[id] : null
  })
  // function addPost(post: Post) {
  //   this.posts[post.id] = post
  // }
  return { posts, postsList, post }
})
