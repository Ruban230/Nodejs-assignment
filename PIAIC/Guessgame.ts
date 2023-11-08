import * as readline from 'readline';


const minNumber = 1;
const maxNumber = 100; // Set the range for the random number

const secretNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
let attempts = 3; // Number of attempts allowed

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const playGame = () => {
  rl.question(`Guess the number between ${minNumber} and ${maxNumber}: `, (input) => {
    const guessedNumber = parseInt(input);

    if (guessedNumber === secretNumber) {
      console.log('Congratulations! You guessed the number correctly!');
      rl.close();
      return;
    } else if (guessedNumber < secretNumber) {
      console.log('Try a higher number.');
    } else {
      console.log('Try a lower number.');
    }

    attempts--;
    if (attempts > 0) {
      console.log(`You have ${attempts} attempts left.`);
      playGame(); // Recursive call for next attempt
    } else {
      console.log(`Sorry, the number was ${secretNumber}. Try again next time!`);
      rl.close();
    }
  });
};

playGame();
