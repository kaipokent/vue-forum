import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue')
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/thread/:id',
      name: 'Thread',
      component: () => import('@/views/ThreadView.vue')
    },
    {
      path: '/thread/:id/edit',
      name: 'ThreadEdit',
      component: () => import('@/views/ThreadEditView.vue'),
      props: true
    },
    {
      path: '/forum/:id',
      name: 'Forum',
      component: () => import('@/views/ForumView.vue')
    },
    {
      path: '/forum/:id/new/',
      name: 'ThreadCreate',
      component: () => import('@/views/ThreadCreateView.vue'),
      props: true
    },
    {
      path: '/category/:id',
      name: 'Category',
      component: () => import('@/views/CategoryView.vue')
    },
    {
      path: '/me',
      name: 'Profile',
      component: () => import('@/views/ProfileView.vue')
    }
  ]
})

export default router
