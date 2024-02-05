<script setup>
    import { useRoute, useRouter } from 'vue-router';
    import { useQuizStore } from '@/store/quizStore'    

    import { computed, watch, ref } from 'vue'

    const route = useRoute();
    const router = useRouter();
    const store = useQuizStore();   

    // set initial values of question number and get 1st question
    const questionNo = ref(+route.params.questionNo)
  
    // set up computed property for question to obtain reactivity
    const question = computed(() => store.getQuestion(questionNo.value - 1))  
 
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
        console.log(answerLetter)
        selectedAnswer.value = answerLetter
        store.setAnswer(questionNo.value - 1, answerLetter)
    }

    const finishQuiz = () => {
        console.log('finish quiz clicked!')
        router.replace({ name: 'results' });
    }

</script>


<template>
    <div class="question-page">
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
                 v-if="questionNo != 1" type="submit" name="action" 
                 value="previous" class="prev-btn">
                <font-awesome-icon :icon="['fas', 'backward']" /> Previous</RouterLink>         
         
            <RouterLink  :to="{ name: 'question', params: { questionNo: questionNo + 1 }}" 
                v-if="questionNo !=10" type="submit" name="action" value="next" class="next-btn">
                Next <font-awesome-icon :icon="['fas', 'forward']" /></RouterLink> 
                
            <button v-if="questionNo == 10" class="finish-button"
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
        margin-top: 3rem;
    }
    .text-div {
        padding: 0.75rem;
        width: 100%;
        margin-bottom: 0.5rem;
        background-color: white;
        color: #012746;
     
        border-radius: 0.4rem;
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

    
.finish-button {
    background-color: #a56cc1;
    border: 2px solid white;
    color: #f0f0f0; 
    padding: 0.75rem 2rem;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1.1rem;
    font-weight: 600;   
    cursor: pointer;
    border-radius: 8px;
    transition: background-color 0.3s, color 0.3s;
}
</style>