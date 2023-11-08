"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

var currentLocation = "start";
var gameMap = {
    start: "You find yourself in a dark room. There's a door to the north. Where do you want to go?",
    north: "You enter a mysterious forest. A path leads deeper in. What's your next move?",
    forest: "You're deep in the forest. You see a glowing object to the east. What will you do?",
    east: "You found a treasure chest. You've won the game!",
};
// Function to display the game state
function displayGame() {
    console.log(gameMap[currentLocation]);
}
// Function to handle player input
function handleInput(input) {
    if (input === 'exit') {
        console.log('Thanks for playing!');
        rl.close();
    }
    else {
        var newLocation = currentLocation + '-' + input;
        if (gameMap[newLocation]) {
            currentLocation = newLocation;
            displayGame();
        }
        else {
            console.log("You can't go that way.");
        }
    }
}

displayGame();
rl.on('line', function (input) {
    handleInput(input.trim().toLowerCase());
});
