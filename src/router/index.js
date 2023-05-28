import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/translater',
      name: 'translater',
      component: () => import('../views/translater.vue')
    },
    {
      path: '/QRcodeGenerater',
      name: 'QRcodeGenerater',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/QRcodeGenerater.vue')
    }
  ]
})

export default router
