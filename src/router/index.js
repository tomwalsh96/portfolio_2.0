import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from '@/firebase/init'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../views/Projects.vue')
  },
  {
    path: '/projects/:id',
    name: 'readMore',
    component: () => import('../views/ReadMore.vue')
  },
  {
    path: '/skills',
    name: 'skills',
    component: () => import('../views/Skills.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/admin/Login.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin/Admin.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/:id',
    name: 'projectAdmin',
    component: () => import('../views/admin/ProjectAdmin.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login')
  // else if (!requiresAuth && currentUser) next('comics')
  else next()
})

export default router
