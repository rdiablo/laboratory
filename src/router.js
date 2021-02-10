import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Flow from './views/Flow'
import Kanban from './views/Kanban'
import Task from './views/Task'

import Auth from './views/Auth'
import Signin from './views/Signin'
import SigninIdentifier from './views/SigninIdentifier'
import SigninPassword from './views/SigninPassword'
import Signup from './views/Signup'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/auth',
      component: Auth,
      children: [
        {
          path: 'signin',
          component: Signin,
          username: '',
          children: [
            {
              path: 'identifier',
              name: 'signin',
              component: SigninIdentifier
            }, {
              path: 'password',
              name: 'password',
              component: SigninPassword
            }
          ]
        }, {
          path: 'signup',
          component: Signup,
          name: 'signup'
        }
      ]
    },
    {
      path: '*',
      redirect: { name: 'signin' }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },{
      path: '/flow',
      name: 'flow',
      component: Flow
    },{
      path: '/kanban',
      name: 'kanban',
      component: Kanban
    },{
      path: '/task',
      name: 'task',
      component: Task
    },
  ]
})
