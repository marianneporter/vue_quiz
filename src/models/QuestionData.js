export class QuestionData {
    questionNo;
    questionText;
    correctAnswerLetter;
    userAnswerLetter = "";
    possibleAnswers = [];   

    isCorrect() {
       return true;
    }
}