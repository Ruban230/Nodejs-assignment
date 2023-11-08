import * as readline from 'readline';

interface Question {
  text: string;
  options: string[];
}

const extroversionQuestions: Question[] = [
  {
    text: 'Do you usually feel comfortable in social settings and large gatherings?',
    options: ['Yes', 'No'],
  },
  // Add more extroversion questions...
];

const introversionQuestions: Question[] = [
  {
    text: 'Do you need some alone time to recharge after social interactions?',
    options: ['Yes', 'No'],
  },
  // Add more introversion questions...
];

function askQuestion(question: Question): Promise<number> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`${question.text} (${question.options.join(' / ')}): `, (answer) => {
      const optionIndex = question.options.indexOf(answer.trim());
      if (optionIndex !== -1) {
        resolve(optionIndex);
      } else {
        console.log('Invalid input. Please select a valid option.');
        resolve(-1);
      }
      rl.close();
    });
  });
}

async function askQuestions(questions: Question[]): Promise<number> {
  let score = 0;
  for (const question of questions) {
    const answer = await askQuestion(question);
    if (answer === -1) {
      return -1; // Exit if an invalid input is given
    }
    score += answer;
  }
  return score;
}

async function determinePersonality() {
  const extroversionScore = await askQuestions(extroversionQuestions);
  if (extroversionScore === -1) {
    return;
  }

  const introversionScore = await askQuestions(introversionQuestions);
  if (introversionScore === -1) {
    return;
  }

  if (extroversionScore > introversionScore) {
    console.log('The person seems more extroverted.');
  } else if (introversionScore > extroversionScore) {
    console.log('The person seems more introverted.');
  } else {
    console.log('It is inconclusive.');
  }
}

determinePersonality();
