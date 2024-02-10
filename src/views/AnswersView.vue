<script setup>
    import {  useRouter } from 'vue-router';
    import { useQuizStore } from '@/store/quizStore'

    const router = useRouter();
    const store = useQuizStore();   

    const questionData = store.getQuestionData;

    const startNewQuiz = () => {
        store.resetQuestions();
        router.replace({ name: 'start' });
    }  

</script>

<template>
    <div class="inner-container">
    <header>
        <h1>You scored {{ store.getScore }} out of {{ store.getQuestionCount }}</h1>
        <button class="lg-purple-btn" @click="startNewQuiz">Play Again</button>
   </header>
   <main>
        <ul>
            <li v-for="question in questionData" :key="question.questionNo"
                class="text-div">
                <p>Question {{ question.questionNo }}</p>
                {{ question.questionText }}
                <hr>
                <div class="answers">
                    <div class="question-answer">
                        <p>Your Answer:
                        {{ store.getAnswerForQuestionLetter(question.questionNo, question.userAnswerLetter) }}</p>
                        <p>Correct Answer:
                        {{ store.getAnswerForQuestionLetter(question.questionNo, question.correctAnswerLetter) }}</p>
                    </div>
                    <div class="check">
                        <font-awesome-icon v-if="store.getIsCorrect(question.questionNo)"
                                           :icon="['fas', 'check']"
                                           class="correct" />
                        <font-awesome-icon v-else :icon="['fas', 'xmark']"
                                           class="incorrect" />
                    </div>
                </div>              
            </li>
        </ul>
   </main>
    </div>

</template>

<style scoped>

    .lg-purple-btn {
        padding: 0.65rem  
    }

    header {
        display: flex;
        flex-direction: column;  
        margin-top: 1.5rem;
    }      
   

    header h1 {
        order: 2;
        font-size: 1.35rem;
    }  

    header button {
        order: 1;
        max-width: 8rem;
        margin-left: auto;   
        margin-bottom: 1rem;    
    }  
    
    main {
        margin-top:2rem;
    }

    hr {
        margin-top: 1rem;
        margin-bottom: 1rem;
        color: #012746; 
    }

    .answers {
        display: flex;

    }

    .answers .question-answer {
        flex: 1 1 0;
    }

    .answers .check {
        flex: 0 0 auto;
        padding-right: 0.5rem;
    }

    .answers .correct {
        color: green;
        font-size: 2rem;
    }

    .answers .incorrect {
        color: red;
        font-size: 2rem;
    }

    @media screen and (min-width: 640px) {
        header {
             flex-direction: row; 
             justify-content: space-between;
             align-items: center;
             gap: 1rem;
        }

        header h1 {
            order: 1;
            margin-top: 0;
        }

        header button {
            order: 2;
            margin-bottom: 0;    
        }
    }
</style>