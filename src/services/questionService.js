import axios from 'axios';
import { QuestionData } from '@/models/QuestionData'

const BASE_URL = 'https://the-trivia-api.com/v2'; 

export const fetchQuestions = async (category, difficulty, noOfQuestions) => {
    try {
        const response = await axios.get(`${BASE_URL}/questions`, {
            params: { category, difficulty, limit: noOfQuestions },
        });       
       
       const formattedQuestions
         = response.data.map((question, index) => formatQuestion(question, index));        
   
       return formattedQuestions;
      
    } catch (error) {
        console.error('Error fetching questions:', error);
        throw error; 
    }
}

// get api data into simple QuestionData format ready for straightforward use in the app
function formatQuestion(question, index) {
    let formattedQuestion = new QuestionData();
    formattedQuestion.questionNo = index + 1;
    formattedQuestion.questionText = question.question.text;

    // Combine incorrect and correct answers, then randomize order
    let randomizedPossibleAnswers = randomizeAnswerOrder([...question.incorrectAnswers, question.correctAnswer]);

    const answerLetters = ['A', 'B', 'C', 'D'];
    formattedQuestion.possibleAnswers = randomizedPossibleAnswers.map((answer, index) => ({
        answerLetter: answerLetters[index],
        answerText: answer
    }));

    // Find the correct answer letter based on the text comparison
    let correctAnswerIndex = randomizedPossibleAnswers.indexOf(question.correctAnswer);
    formattedQuestion.correctAnswerLetter = answerLetters[correctAnswerIndex];

    formattedQuestion.userAnswerLetter = ''; // Initialize user answer
    return formattedQuestion;
}

function randomizeAnswerOrder(answers) {
    for (let i = answers.length - 1; i > 0; i--) {
        // Generate a random index between 0 and i
        const j = Math.floor(Math.random() * (i + 1));
        
        // Swap elements at indices i and j
        [answers[i], answers[j]] = [answers[j], answers[i]];
      }
      return answers; 
}
