<script setup>
    import {  useRouter, useRoute } from 'vue-router';   
    import { useQuizStore } from '@/store/quizStore'

    const router = useRouter();
    const route = useRoute();
    const store = useQuizStore();   

    const startNewQuiz = () => {
        store.resetQuestions();
        router.replace({ name: 'start' });
    }
    
</script>


<template>
    <div class="results-page inner-container">

        <h1>You scored {{ store.getScore }} out of {{ store.getQuestionCount }}</h1>
               
        <div class="btn-container">
            <RouterLink :to="{ name: 'answers' }" 
                     class="primary-btn">See Answers</RouterLink> 

            <button class="primary-btn"
                    @click="startNewQuiz">Play Again</Button> 
        </div> 
    </div>

</template>

<style scoped>

    h1 {
        margin: 2rem 0 1.5rem 0;
        text-align: center;      
    }
  
    .btn-container {
        display: flex;
        justify-content: center;
        gap: 1rem;
    }
   
    /* overrides from primary-btn class in main.css */
    .primary-btn {
        padding: 0;
        height: 2.5rem; 
        width: 9rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }   
</style>