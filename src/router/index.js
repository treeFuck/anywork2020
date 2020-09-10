import Vue from 'vue'
import VueRouter from 'vue-router'
import SynRouter from './SynRouter'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/Login.vue')
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/Index/Index.vue')
  },
  {
    path: '/exercise',
    name: 'exercise',
    component: () => import ("../views/Index/exercise/exercise")
  },
  {
    path: '/menu',
    name: 'menu',
    redirect: '/menu/personal',
    component: () => import('../views/Menu/Menu.vue'),
    children: [
      {
        path: 'personal',
        name: 'personal',
        component: () => import('../views/Menu/personal/personal.vue')
      },
      {
        path: 'newPassword',
        name: 'newPassword',
        component: () => import('../views/Menu/newPassword/newPassword')
      },
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/404/404.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.NODE_ENV === 'production'
      ? process.env.VUE_APP_STATICURL
      : '/'
})

export default router
