import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index.js'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/pages/Index.vue')
    },
    {
      path: '/login',
      component: () => import('@/pages/Login.vue')
    },
    {
      path: '/detail/:blogId',
      component: () => import('@/pages/Detail.vue')
    },
    {
      path: '/edit/:blogId',
      component: () => import('@/pages/Edit.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/create',
      component: () => import('@/pages/Create.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/user/:userId',
      component: () => import('@/pages/User.vue'),
    },
    {
      path: '/my',
      component: () => import('@/pages/My.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/register',
      component: () => import('@/pages/Register.vue'),
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    store.dispatch('checkLogin').then((isLogin) => {
      if (!isLogin) {
        //如果从vuex中查询到没有登录
        next({
          path: '/login',
          query: { redirect: to.fullPath }
          // query存储本来要跳转到的页面，方便登录后重定向
        })
      } else {
        next()
      }
    })
  } else {
    next()
  }
})

export default router