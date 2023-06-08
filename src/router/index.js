import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Fillout from '../components/Fillout.vue'
import DoubleCheck from '../components/DoubleCheck.vue'
import Statistics from '../components/Statistics.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/fillout/:formId',
      name: 'fillout',
      component: Fillout
    },
    {
      path: '/double-check/:formId',
      name: 'double-check',
      component: DoubleCheck
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: Statistics
    }
  ]
})

export default router
