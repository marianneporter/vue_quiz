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

    }
});