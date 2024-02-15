<script setup>
    import {  useRouter } from 'vue-router';
    import { useQuizStore } from '@/store/quizStore'   
    import { ref, computed } from 'vue'

    const router = useRouter();
    const store = useQuizStore();   

    const questionData = store.getQuestionData;

    const currentFilter = ref('all');

    const filteredQuestions = computed(() => {
        switch (currentFilter.value) {
            case 'all':
                return questionData;
            case 'incorrect':
                return questionData.filter(question => !store.getIsCorrect(question.questionNo));
            case 'correct':
                return questionData.filter(question => store.getIsCorrect(question.questionNo));
            default:
                return questionData;
        }
    });

    const startNewQuiz = () => {
        store.resetQuestions();
        router.replace({ name: 'start' });
    }  

</script>

<template>
    <div class="inner-container">
    <header>
        <h1>You scored {{ store.getScore }} out of {{ store.getQuestionCount }}</h1>
        <button class="action-btn" @click="startNewQuiz">Play Again</button>

   </header>
        <main>
            <div class="filter-btns">
                <h3>Your Results</h3>
                <button class="outline-btn"
                        :class="{'primary-btn': currentFilter === 'all'}"                     
                        @click="currentFilter = 'all'">
                        See All
                </button>
                <button class="outline-btn"
                        :class="{'primary-btn': currentFilter === 'incorrect'}"    
                        @click="currentFilter = 'incorrect'">
                        Incorrect Only
                </button>
                <button class="outline-btn"
                        :class="{'primary-btn': currentFilter === 'correct'}"    
                        @click="currentFilter = 'correct'">
                    Correct Only
                </button>
            </div>
            <ul>
                <li v-for="question in filteredQuestions" :key="question.questionNo"
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
            <div class="bottom-btn-container">
                <button class="action-btn"  @click="startNewQuiz">Play Again</button>
            </div>
            
        </main>
    </div>

</template>

<style scoped>

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
        margin-bottom: 0.25rem;    
    }  
    
    main {
        margin-top:2rem;
    }

    main .filter-btns {
        display: flex;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;
        margin-bottom: 0.75rem;  
    }

    main .filter-btns h3 {
        width: 100%;
        text-align: center;
    }

    main .primary-btn {
        padding: 2px 7px;
     
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

    .action-btn {  
        padding: 0.75rem 1rem;
    }

    .bottom-btn-container {          
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }

    .bottom-btn-container .action-btn {
        width:  100%;
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
            max-width: none;  
        }
        main .filter-btns h3 {
           width: auto;
        }  

        .action-btn {  
            padding: 0.75rem 2.5rem;
        }   
        
        .bottom-btn-container .action-btn {
            width:  auto;
        }
    }
</style>