"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var minNumber = 1;
var maxNumber = 10; // Set the range for the random number
var secretNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
var attempts = 3; // Number of attempts allowed
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
var playGame = function () {
    rl.question("Guess the number between ".concat(minNumber, " and ").concat(maxNumber, ": "), function (input) {
        var guessedNumber = parseInt(input);
        if (guessedNumber === secretNumber) {
            console.log('Congratulations! You guessed the number correctly!');
            rl.close();
            return;
        }
        else if (guessedNumber < secretNumber) {
            console.log('Try a higher number.');
        }
        else {
            console.log('Try a lower number.');
        }
        attempts--;
        if (attempts > 0) {
            console.log("You have ".concat(attempts, " attempts left."));
            playGame(); // Recursive call for next attempt
        }
        else {
            console.log("Sorry, the number was ".concat(secretNumber, ". Try again next time!"));
            rl.close();
        }
    });
};
playGame();
