import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from '@ionic/vue-router'
import { useUserStore } from './store'

const privateRoute: RouteRecordRaw['beforeEnter'] = function (_to, _from, next) {
  const userStore = useUserStore()
  if (!userStore.isAuthenticated) {
    next({ name: 'login' })
  }
  else {
    next()
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/account',
    name: 'account',
    component: () => import('@/views/Account.vue'),
    beforeEnter: privateRoute,
  },
  {
    path: '/support',
    name: 'support',
    component: () => import('@/views/Support.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/Signup.vue'),
  },
  { path: '/', redirect: 'login' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
