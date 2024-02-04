import { defineStore } from 'pinia';
import { fetchQuestions } from '@/services/questionService';

export const useQuizStore = defineStore('quiz', {
    state: () => {
        return {  
            questionData: [],  
            selectedCategory: null,
            selectedDifficulty: null           
        };
    },
    getters: {
        isCategorySelected: (state) => {
            return (category) =>
             { 
                return state.selectedCategory === category                
             };
        },
        isDifficultySelected: (state) => {
            return (difficulty) =>
            {
                return state.selectedDifficulty === difficulty
            };
        },
        getQuestion: (state) => {
            return (questionNo) => {
                console.log(`state.questionData ${state.questionData}`)
                console.log(`Accessing question at index: ${questionNo}, Total questions: ${state.questionData.length}`);
                console.log(`what i'm hoping to return ${state.questionData[questionNo]}`) 
                return state.questionData[questionNo]
            } 
        }
    },
    actions: {
        setCategory(category) {
            this.selectedCategory = category;
        },
        setDifficulty(difficulty) {
            this.selectedDifficulty = difficulty;
        },   
        async loadQuestions() {
            try {
                const questions = await fetchQuestions(this.selectedCategory, 
                                                       this.selectedDifficulty);
                this.questionData = questions;
            } catch (error) {
                console.error('Error loading questions:', error);
               
            }
        },  
        setAnswer(questionNo, answer)  {
            this.questionData[questionNo] = answer
        } 

    },
    persist: {
        storage: sessionStorage
    }
});
