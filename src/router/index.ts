import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import MealPage from '../views/MealPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/meal',
  },
  {
    path: '/meal',
    name: 'Meal',
    component: MealPage,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
