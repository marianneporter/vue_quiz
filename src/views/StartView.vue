<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { categories, difficulties } from '@/constants/options.js'
import { defaults } from '@/constants/defaults'
import { useQuizStore } from '@/store/quizStore'

const store = useQuizStore();

const router = useRouter();

onMounted(() => {
    store.setCategory(defaults.category);
    store.setDifficulty(defaults.difficulty);
    store.setNumberOfQuestions(defaults.numberOfQuestions)
});

const changeSelectedCategory
    = (category) => store.setCategory(category)

const changeSelectedDifficulty
    = (difficulty) => store.setDifficulty(difficulty)

const getQuestionsAndNavigate = async () => {
    await store.loadQuestions()
    router.push({ name: 'question', params: { questionNo: 1 } });
}


</script>

<template>
    <div class="start-page inner-container">
        <h1 class="centered">Welcome to Vue Quiz!</h1>
        
        <div class="option-group">
            <h3 class="centered">Select a category</h3>
            <div v-for="(categoryName, category) in categories" :key="category">
                <button class="outline-button" :class="{ 'selected-outline-button': store.isCategorySelected(category) }"
                    @click="changeSelectedCategory(category)">
                    {{ categoryName }}
                </button>
            </div>
        </div>

        <div class="option-group">
            <h3 class="centered">Select a difficulty</h3>
            <div v-for="difficulty in difficulties" :key="difficulty">
                <button class="outline-button"
                    :class="{ 'selected-outline-button': store.isDifficultySelected(difficulty) }"
                    @click="changeSelectedDifficulty(difficulty)">
                    {{ difficulty }}
                </button>
            </div>
        </div>
        <div class="centered">
            <button @click="getQuestionsAndNavigate" class="action-button">Play</button>
        </div>
    </div>
</template>

<style scoped>
/* .start-page {
    margin-top: 5%;
} */

.start-page h3 {
    margin-top: 1rem;
    margin-bottom: 0.1rem;
}

.action-button {
    margin-top: 1.5rem;
}

.option-group {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
}

</style>
