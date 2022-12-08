import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/join',
    name: 'join',
    component: () => import('../views/JoinView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('login') === 'true') {
        next()
      } else {
        next('/profile')
      }
    }
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    component: () => import(/* webpackChunkName: "forbidden" */ '../views/forbidden.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
