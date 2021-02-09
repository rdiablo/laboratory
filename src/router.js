import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Flow from './views/Flow'
import Kanban from './views/Kanban'
import Task from './views/Task'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
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
