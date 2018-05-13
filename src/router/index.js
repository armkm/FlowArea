import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Create from '@/components/Create'
import Edit from '@/components/Edit.vue'
import Profile from '@/components/Profile.vue'
import Test from '@/components/Test.vue'
import uploadTest from '@/components/uploadTest.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/t',
            name: 'Test',
            component: Test
        },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
      {
          path: '/login',
          name: 'login',
          component: Login
      },
      {
          path: '/audition',
          name: 'create',
          component: Create
      },
        {
            path:'/edit/:key',
            component: Edit,
            name:'edit',
            meta: {requireAuth: true}
        },
        {
            path:'/profile/:key',
            component: Profile,
            name:'profile',
            meta: {requireAuth: true}
        },
        {
            path:'/ti',
            component: uploadTest,
            name:'uploadTest',
            meta: {requireAuth: true}
        },

  ]
})
