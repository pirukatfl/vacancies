import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '../pages/HomePage.vue'

const routes = [{ path: '/', component: HomeView }]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
