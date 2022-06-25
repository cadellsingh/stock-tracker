import Vue from 'vue'
import VueRouter from 'vue-router'
import StockPage from '../views/StockPage.vue'
import Account from '../views/Account.vue'
import Index from '../views/LandingPage.vue'
import User from '../views/User.vue'
import Watchlist from '@/views/Watchlist.vue'
import Simulator from '../views/Simulator.vue'
// import Reports from '../views/Reports.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', // * this seems like the way
    name: 'Index',
    component: Index
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    children: [
      {
        path: 'account',
        name: 'Account',
        component: Account
      },
      {
        path: 'watchlist',
        name: 'Watchlist',
        component: Watchlist
      },
      {
        path: 'stockPage',
        name: 'StockPage',
        component: StockPage
      },
      {
        path: 'simulator',
        name: 'Simulator',
        component: Simulator
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
