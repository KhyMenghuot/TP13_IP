import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import layout from '../components/layout/Layout.vue'
import listP from '../views/list_product.vue'

const router = new createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      
    },
    {path: '/product',
      name: 'product',
      component : () => import("../components/layout/Layout.vue")
    }, 
    {path: '/Admit',
    name: 'admit',
    component : () => import("../components/layout/Daskboard.vue")
  },
  ]
})

export default router
