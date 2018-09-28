import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Map from './views/Map.vue'
import Despesa from './views/Despesa.vue'
import Pessoa from './views/Pessoa.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: `/${(new Date()).getFullYear()}/1`
    },
    {
      path: '/despesa/:year/:code',
      name: 'despesa',
      components: {
        default: Despesa,
        map: Map
      }
    },
    {
      path: '/pessoa/:viewingUser',
      name: 'pessoa',
      component: Pessoa
    },
    {
      path: '/sobre',
      name: 'about',
      // components: About
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/:year/:page?',
      name: 'home',
      components: {
        default: Home,
        map: Map
      }
    }
  ]
})
