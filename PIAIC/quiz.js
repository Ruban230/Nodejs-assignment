"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
var quiz = [
    {
        text: "What is TypeScript?",
        options: ["A programming language", "A JavaScript framework", "A CSS preprocessor"],
        correctOption: 0,
    },
    {
        text: "Which of the following is a data type in TypeScript?",
        options: ["int", "number", "string"],
        correctOption: 1,
    },
    // Add more questions...
];
var currentQuestionIndex = 0;
var correctAnswers = 0;
function displayQuestion() {
    var question = quiz[currentQuestionIndex];
    console.log(question.text);
    question.options.forEach(function (option, index) {
        console.log("".concat(index + 1, ". ").concat(option));
    });
    rl.question('Your answer (enter the option number): ', function (answer) {
        var selectedOption = parseInt(answer, 10);
        if (!isNaN(selectedOption)) {
            if (selectedOption === question.correctOption + 1) {
                console.log("Correct!\n");
                correctAnswers++;
            }
            else {
                console.log("Incorrect. The correct answer is ".concat(question.options[question.correctOption], "\n"));
            }
            currentQuestionIndex++;
            if (currentQuestionIndex < quiz.length) {
                displayQuestion();
            }
            else {
                showResult();
            }
        }
        else {
            console.log("Invalid input. Please enter the option number.");
            displayQuestion();
        }
    });
}
function showResult() {
    console.log("Quiz completed! You got ".concat(correctAnswers, " out of ").concat(quiz.length, " questions correct."));
    rl.close();
}
// Start the quiz
displayQuestion();
