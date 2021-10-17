import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Default from '../templates/Default'

Vue.use(VueRouter)

const routes = [
  {
    path: '/admin',
    name: 'Default',
    component: Default,
    redirect: 'Home',
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
    ]
  },
  
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue')
  },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    /* component: () => import( webpackChunkName: "about" '../views/About.vue') */
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
