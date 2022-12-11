import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue')
    },
    {
        path: '/',
        name: 'home',
        component: () => import('../views/HomeView.vue')
    },
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
            // console.log(localStorage.getItem('login'));
            if (localStorage.getItem('login') === 'true') {
                next()
            } else {
                next('/profile')
            }
        }
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    // history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
