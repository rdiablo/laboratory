import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Flow from './views/Flow'
import Kanban from './views/Kanban'
import Task from './views/Task'
import Finance from './views/Finance'
import Upload from './views/Upload'
import Auth from './views/Auth'
import Signin from './views/Signin'
import SigninIdentifier from './views/SigninIdentifier'
import SigninPassword from './views/SigninPassword'
import Signup from './views/Signup'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        need2Login: true
      }
    },
    {
      path: '/auth',
      component: Auth,
      children: [
        {
          path: 'signin',
          component: Signin,
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
    },{
      path: '/finance',
      name: 'finance',
      component: Finance
    },{
      path: '/upload',
      name: 'upload',
      component: Upload
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
      path: '*',
      redirect: { name: 'home' }
    },
  ]
})
