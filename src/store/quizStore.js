import { defineStore } from 'pinia';
import { fetchQuestions } from '@/services/questionService';

export const useQuizStore = defineStore('quiz', {
    state: () => {
        return {  
            questionData: [],  
            selectedCategory: null,
            selectedDifficulty: null,
            numberOfQuestions: 10,
            quizFinished: false           
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

        isQuizFinished: (state) => {
            return state.quizFinished
        },
        
        getQuestionData: (state) => {
            return [ ...state.questionData ]
        },

        getQuestion: (state) => {
            return (questionNo) => {  
                return state.questionData[questionNo]
            } 
        },

        getQuestionCount: (state) => {
            return state.numberOfQuestions
        },

        getAnswerForQuestionLetter: (state) => {
            return (questionNo, reqAnswerLetter) => {  
                let reqQuestionNo = questionNo - 1;
                let answer = state.questionData[reqQuestionNo].possibleAnswers
                             .find(a => a.answerLetter == reqAnswerLetter)
                return answer.answerText
            } 
        },

        getScore: (state) => {
            return state.questionData
                .filter(q => q.userAnswerLetter === q.correctAnswerLetter)
                .length;
        },

        getIsCorrect: (state) => {
            return (questionNo) => {   
                return state.questionData[questionNo-1].userAnswerLetter  
                        ==  state.questionData[questionNo-1].correctAnswerLetter 
            } 
        },        
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
                                                       this.selectedDifficulty,
                                                       this.numberOfQuestions);
                this.questionData = questions;
            } catch (error) {
                console.error('Error loading questions:', error);
               
            }
        },  
        setAnswer(questionNo, answer)  { 
            this.questionData[questionNo].userAnswerLetter = answer
        },
        
        resetQuestions() {
            this.questionData = []
            this.quizFinished = false
        },

        resetQuizFinished() {
            this.quizFinished = false
        },

        finishQuiz() {
            this.quizFinished = true
        },         

    }, 
    // persist: {
    //     storage: sessionStorage, 
    // },
     persist: true
});
