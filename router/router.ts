import path from 'path'
import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../pages/HomePage.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/LoginPage.vue')
  },
  {
    path: '/user-not-found',
    name: 'userNotFound',
    component: () => import('../pages/UserNotFound.vue')
  },
  {
    path: '/expired-link',
    name: 'expiredLink',
    component: () => import('../pages/ExpiredLink.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
