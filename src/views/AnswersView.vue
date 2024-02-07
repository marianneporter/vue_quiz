<script setup>
    import {  useRouter } from 'vue-router';
    import { useQuizStore } from '@/store/quizStore'

    const router = useRouter();
    const store = useQuizStore();   

    const startNewQuiz = () => {
        store.resetQuestions();
        router.replace({ name: 'start' });
    }  

</script>

<template>
    <header>
        <h1>You scored {{ store.getScore }} out of {{ store.getQuestionCount }}</h1>
        <button class="lg-purple-btn" @click="startNewQuiz">Play Again</button>
   </header>
</template>

<style scoped>

    .lg-purple-btn {
        padding: 0.65rem  
    }

    header {
        display: flex;
        flex-direction: column;        
    }

    header h1 {
        order: 2;
        font-size: 1.35rem;
        margin-top: 1rem;
    }

    header button {
        order: 1;
        max-width: 8rem;
        margin-left: auto;
       
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
        }
    }
</style>