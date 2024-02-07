import { defineStore } from 'pinia';
import { fetchQuestions } from '@/services/questionService';

export const useQuizStore = defineStore('quiz', {
    state: () => {
        return {  
            questionData: [],  
            selectedCategory: null,
            selectedDifficulty: null,
            numberOfQuestions: 10           
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
                return state.questionData[questionNo]
            } 
        },
        getQuestionCount: (state) => {
            return state.numberOfQuestions
        },
        getScore: (state) => {
            return state.questionData
                .filter(q => q.userAnswerLetter === q.correctAnswerLetter)
                .length;
        }
    },
    actions: {
        setCategory(category) {
            this.selectedCategory = category;
        },
        setDifficulty(difficulty) {
            this.selectedDifficulty = difficulty;
        },   
        setNumberOfQuestions(numberOfQuestions) {
            this.numberOfQuestions = numberOfQuestions
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
            this.questionData[questionNo].userAnswerLetter = answer
        },
        resetQuestions() {
            this.questionData = [];
        } 

    }, 
    persist: {
        storage: sessionStorage, 
    },
  //  persist: true
});
