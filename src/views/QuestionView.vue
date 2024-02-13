<script setup>
    import { useRoute, useRouter } from 'vue-router';
    import { useQuizStore } from '@/store/quizStore'    

    import { computed, watch, ref, onMounted } from 'vue'

    const store = useQuizStore();  
    const route = useRoute();
    const router = useRouter();    

    onMounted(() => {
        console.log('in onMounted of question view')
        if (store.isQuizFinished) {
            router.push({ name: 'results' })
        }
    }); 

    // set initial values of question number and get 1st question
    const questionNo = ref(+route.params.questionNo)
  
    // set up computed property for question to obtain reactivity
    const question = computed(() => store.getQuestion(questionNo.value - 1)) 
    const questionCount = store.getQuestionCount; 
 
    const selectedAnswer = ref(null);

    // Watch for changes in the route parameters and update questionNo 
    // computed property for the question will then automatically change
    watch(() => route.params.questionNo, (newQuestionNo) => {
        if (store.getQuestion(newQuestionNo -1)) {
            questionNo.value = +newQuestionNo  
            selectedAnswer.value = question.value.userAnswerLetter 
        }
    });

    const answerSelected = (answerLetter) => {
        selectedAnswer.value = answerLetter
        store.setAnswer(questionNo.value - 1, answerLetter)
    }

    const finishQuiz = () => {
        store.finishQuiz()
        router.replace({ name: 'results' });
    }

</script>


<template>
    <div class="question-page inner-container">
        <h1 class="text-div question">Question: {{ questionNo }}</h1>
        <p class="text-div question-text">Q. {{ question.questionText }}</p>
        <ul class="answer-options">
            <li v-for="(answer, index) in question.possibleAnswers"
                                        :key="index" @click="answerSelected(answer.answerLetter)"
                                        :class="{'selected-answer': answer.answerLetter === selectedAnswer}"
                                        class="text-div" >
                {{ answer.answerLetter }}. {{ answer.answerText }}
            </li>
        </ul>
        <div class="navigate">
            
            <RouterLink :to="{ name: 'question', params: { questionNo: questionNo - 1 }}"
                 v-if="questionNo != 1" class="prev-btn">
                <font-awesome-icon :icon="['fas', 'backward']" /> Previous</RouterLink>         
         
            <RouterLink  :to="{ name: 'question', params: { questionNo: questionNo + 1 }}" 
                v-if="questionNo != questionCount"  class="next-btn">
                Next <font-awesome-icon :icon="['fas', 'forward']" /></RouterLink> 
                
            <button v-if="questionNo == questionCount" class="primary-btn"
                    @click="finishQuiz">Finish</button>           
            
        </div>
    </div>

</template>

<style scoped>
    .question-page {
        display: flex;
        flex-direction: column;
        justify-items: space-around;       
    }

    .question {
        margin-bottom: 1rem;
    }
 
    .question-text {
        margin-bottom: 1.5rem; 
    }

    .answer-options {
        list-style-type: none;
    }

    .selected-answer {
        background-color: #C9A2E5;       
        font-weight: 600;
        color: black;
    }

    .navigate {
        margin-top: 0.5rem;
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    .navigate .prev-btn {
        margin-right: auto;
    }

    .navigate .next-btn {
        margin-left: auto;
    }

    .navigate .prev-btn, .navigate .next-btn {
        color: white;
        background-color: transparent;
    }

    @media screen and (min-width: 768px) {
        .question-page {
            margin-top: 5rem;
        }
    }

 
</style>