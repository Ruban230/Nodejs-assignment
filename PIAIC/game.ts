import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Define your game's state
let currentLocation = "start";

const gameMap: Record<string, string> = {
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
function handleInput(input: string) {
  if (input === 'exit') {
    console.log('Thanks for playing!');
    rl.close();
  } else {
    const newLocation = currentLocation + '-' + input;
    if (gameMap[newLocation]) {
      currentLocation = newLocation;
      displayGame();
    } else {
      console.log("You can't go that way.");
    }
  }
}

// Start the game
displayGame();
rl.on('line', (input) => {
  handleInput(input.trim().toLowerCase());
});
