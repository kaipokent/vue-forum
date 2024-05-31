import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/thread/:id',
      name: 'threadView',
      component: () => import('@/views/ThreadView.vue')
    }
  ]
})

export default router
