<script setup>
    import {  useRouter } from 'vue-router';
    import { useQuizStore } from '@/store/quizStore'

    const router = useRouter();
    const store = useQuizStore();   


</script>


<template>
    <div class="results-page">
        <p>Welcome to the Results Page</p>

    </div>

</template>

<style scoped>

</style>