import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

interface Question {
  text: string;
  options: string[];
  correctOption: number;
}

const quiz: Question[] = [
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
  {
    text: "What does TypeScript compile to?",
    options: ["C++", "JavaScript", "Java"],
    correctOption: 1,
  },
  {
    text: "Which keyword is used to declare a variable in TypeScript?",
    options: ["var", "let", "const"],
    correctOption: 2,
  },
  {
    text: "Which of the following is a TypeScript primitive type?",
    options: ["object", "symbol", "array"],
    correctOption: 1,
  },
  {
    text: "What is the role of 'tsc' command in TypeScript?",
    options: ["Transpile TypeScript code to JavaScript", "Run TypeScript code directly", "Test TypeScript code"],
    correctOption: 0,
  },
  {
    text: "Which TypeScript feature is used for enforcing explicit type-checking during compile time?",
    options: ["Type Assertion", "Type Inference", "Type Annotations"],
    correctOption: 2,
  },
  {
    text: "What is a 'tsconfig.json' used for in TypeScript?",
    options: ["Managing npm packages", "Configuring TypeScript compiler options", "Defining React components"],
    correctOption: 1,
  },
  {
    text: "Which operator is used for strict null checking in TypeScript?",
    options: ["===", "?", "!"],
    correctOption: 0,
  },
  {
    text: "What does 'strict' mode do in TypeScript?",
    options: ["Enforces strict mode for runtime behavior", "Enables all strict type-checking options", "Ignores all type errors"],
    correctOption: 1,
  },
  {
    text: "Which TypeScript concept allows a type to be based on another type?",
    options: ["Type Extension", "Type Inheritance", "Type Declaration"],
    correctOption: 1,
  },
  {
    text: "What is the purpose of 'unknown' type in TypeScript?",
    options: ["Represents a known data type", "Represents values that could be anything", "Denotes a generic type"],
    correctOption: 1,
  }, {
    text: "What does TypeScript compile to?",
    options: ["C++", "JavaScript", "Java"],
    correctOption: 1,
  },
  {
    text: "Which keyword is used to declare a variable in TypeScript?",
    options: ["var", "let", "const"],
    correctOption: 2,
  },
  {
    text: "Which of the following is a TypeScript primitive type?",
    options: ["object", "symbol", "array"],
    correctOption: 1,
  },
  {
    text: "What is the role of 'tsc' command in TypeScript?",
    options: ["Transpile TypeScript code to JavaScript", "Run TypeScript code directly", "Test TypeScript code"],
    correctOption: 0,
  },
  {
    text: "Which TypeScript feature is used for enforcing explicit type-checking during compile time?",
    options: ["Type Assertion", "Type Inference", "Type Annotations"],
    correctOption: 2,
  },
  {
    text: "What is a 'tsconfig.json' used for in TypeScript?",
    options: ["Managing npm packages", "Configuring TypeScript compiler options", "Defining React components"],
    correctOption: 1,
  },
  {
    text: "Which operator is used for strict null checking in TypeScript?",
    options: ["===", "?", "!"],
    correctOption: 0,
  },
  {
    text: "What does 'strict' mode do in TypeScript?",
    options: ["Enforces strict mode for runtime behavior", "Enables all strict type-checking options", "Ignores all type errors"],
    correctOption: 1,
  },
  {
    text: "Which TypeScript concept allows a type to be based on another type?",
    options: ["Type Extension", "Type Inheritance", "Type Declaration"],
    correctOption: 1,
  },
  {
    text: "What is the purpose of 'unknown' type in TypeScript?",
    options: ["Represents a known data type", "Represents values that could be anything", "Denotes a generic type"],
    correctOption: 1,
  }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;

function displayQuestion() {
  const question = quiz[currentQuestionIndex];
  console.log(question.text);
  question.options.forEach((option, index) => {
    console.log(`${index + 1}. ${option}`);
  });
  rl.question('Your answer (enter the option number): ', (answer) => {
    const selectedOption = parseInt(answer, 10);
    if (!isNaN(selectedOption)) {
      if (selectedOption === question.correctOption + 1) {
        console.log("Correct!\n");
        correctAnswers++;
      } else {
        console.log(`Incorrect. The correct answer is ${question.options[question.correctOption]}\n`);
      }
      currentQuestionIndex++;
      if (currentQuestionIndex < quiz.length) {
        displayQuestion();
      } else {
        showResult();
      }
    } else {
      console.log("Invalid input. Please enter the option number.");
      displayQuestion();
    }
  });
}

function showResult() {
  console.log(`Quiz completed! You got ${correctAnswers} out of ${quiz.length} questions correct.`);
  rl.close();
}

// Start the quiz
displayQuestion();
