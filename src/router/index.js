import Vue from 'vue'
import Router from 'vue-router'
import kulud from '@/components/kulud'
import login from '@/components/login'
import kalender from '@/components/kalender'
import info from '@/components/info'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/kulud',
      name: 'kulud',
      component: kulud
    },
    {
      path: '/kalender',
      name: 'kalender',
      component: kalender
    },
    {
      path: '/',
      name: 'info',
      component: info
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
