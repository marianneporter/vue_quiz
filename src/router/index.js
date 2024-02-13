import { createRouter, createWebHistory } from 'vue-router'
import { useQuizStore } from '@/store/quizStore'
import StartView from '../views/StartView.vue'
import QuestionView from '../views/QuestionView.vue'
import ResultsView from '../views/ResultsView.vue'
import AnswersView from '../views/AnswersView.vue'

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
    {
        path: '/results',
        name: 'results',
        component: ResultsView
    },
    {
        path: '/answers',
        name: 'answers',
        component: AnswersView
    },   
  ]
})

router.beforeEach((to, from, next) => {
    if (to.path.startsWith('/question/')) {
      const store = useQuizStore()
      if (store.questionData.length === 0) {
        // Attempt to restore state from local storage
        const storedState = localStorage.getItem('quiz') 
        if (storedState) {
          const parsedState = JSON.parse(storedState)
          if (parsedState.quiz && parsedState.quiz.questions && parsedState.quiz.questions.length > 0) {
            // Restore pinia store
            store.$patch(parsedState.quiz)
            next()
          } else {
            // Redirect to root if no questions found in storage
            next('/')
          }
        } else {
          // Redirect to root if no persisted state found
          next('/')
        }
      } else {
        // Proceed if questions already in store
        next()
      }
    } else {
      next()
    }
  })

export default router
