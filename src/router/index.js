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
    // check if on /question/ route if not continue to route
    if (!to.path.startsWith('/question/')) {
        next()
        return
    }

    const store = useQuizStore()

    // questions are already in store continue
    if (store.questionData.length !== 0) {
        next()
        return
    }
  
    // Restore data from local storage if there is any there
    const storedState = localStorage.getItem('quiz') // Adjust the key if different

    // nothing is in local storage so go to start page
    if (!storedState) {
        next('/')
        return
    }

    // restore pinia state from local storage so quiz can be continued
    console.log('setting things up from stored state')
    const parsedState = JSON.parse(storedState)
    if (parsedState.quiz && parsedState.quiz.questions && parsedState.quiz.questions.length > 0) {
    // Restore questions to the store
        store.$patch(parsedState.quiz)
        next()
        return
    } else {
        // Redirect to root if no questions found in storage
        next('/')
        return
    }     

})

export default router
