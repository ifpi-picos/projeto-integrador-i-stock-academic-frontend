import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Default from '../templates/Default'

Vue.use(VueRouter)

const routes = [
  {
    path: '/default',
    name: 'Default',
    component: Default,
    redirect: 'Home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home
      },

      {
        path: '/list-wallets',
        name: 'ListWallets',
        component: () => import('../views/ListWallets.vue')
      },
    ]
  },

  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },

  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue')
  },

  {
    path: '/add-wallet',
    name: 'AddWallet',
    component: () => import('../components/AddWallet.vue')
  },

  {
    path: '*',
    name: '404',
    component: () => import('@/views/404.vue')
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

router.beforeEach((to, from, next) => {
  try {
    const HOME = '/home'
    const LOGIN = '/'

    const token = localStorage.getItem('application-token')

    if (token) {
      if (to.path === LOGIN) {
        next({path: HOME})
      }
    } else {
      if (to.path !== LOGIN)
      next({path: LOGIN})
    }
    next()

  } catch (error) {
    console.error(error)
  }
})

export default router
