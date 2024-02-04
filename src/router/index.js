import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/StartView.vue'
import QuestionView from '../views/QuestionView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/',
        name: 'start',
        component: StartView
    },
    {
        path: '/question/:questionNo',
        name: 'question',
        component: QuestionView
      },
  ]
})

export default router
