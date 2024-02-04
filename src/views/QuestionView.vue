<script setup>
    import { useRoute } from 'vue-router';
    import { useQuizStore } from '@/store/quizStore'    

    import { computed } from 'vue'

    const route = useRoute();
    const store = useQuizStore();   

    const questionNo = +route.params.questionNo
    const question = computed(() => store.getQuestion(questionNo - 1))  
  
    console.log(questionNo)
    console.log(question)
    console.log(question.value);
    console.log(question.value.questionText)

    const answerSelected = (answerLetter) => {
        console.log(answerLetter)
    }
</script>


<template>
    <div class="question-page">
        <h1 class="text-div">Question Number: {{ questionNo }}</h1>
        <ul>
            <!-- <li v-for="(answer, index) in question.value.possibleAnswers"
                                        :key="index" @click="answerSelected(answer.answerLetter)"
                class="text-div" >
                {{ answer.answerLetter }} {{ answer.answerText }}
            </li> -->
        </ul>
    </div>

</template>

<style scoped>
    .question-page {
        display: flex;
        flex-direction: column;
        justify-items: space-around;
    }
    .text-div {
        height: 3rem;
        width: 30rem;
        background-color: white;
        color: black;
    }

</style>