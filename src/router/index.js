import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Dashboard from '../views/Dashboard.vue'
import AdminPanel from '../views/AdminPanel.vue'
import AdminLogin from '../views/AdminLogin.vue'
import BioData from '../views/dashboard/BioData.vue'
import Passport from '../views/dashboard/Passport.vue'
import Academic from '../views/dashboard/Academic.vue'
import Service from '../views/dashboard/Service.vue'
import Bank from '../views/dashboard/Bank.vue'
import Summary from '../views/dashboard/Summary.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:appId/dashboard',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: 'biodata',
          name: 'bidata',
          component: BioData
        },
        {
          path: 'passport',
          name: 'passport',
          component: Passport
        },
        {
          path: 'academic',
          name: 'academic',
          component: Academic
        },
        {
          path: 'service',
          name: 'service',
          component: Service
        },
        {
          path: 'bank',
          name: 'bank',
          component: Bank
        },
        {
          path: 'summary',
          name: 'summary',
          component: Summary
        }
      ]
    },
    {
      path: '/admin',
      name: 'adminlogin',
      component: AdminLogin
    },
    {
      path: '/adminpanel',
      name: 'admin',
      component: AdminPanel
    }
  ]
})

export default router
