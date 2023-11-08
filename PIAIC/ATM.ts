import * as readline from 'readline';
import * as faker from 'faker';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Generate random user data
interface User {
  id: string;
  pin: string;
  balance: number;
}

const numberOfUsers = 5; // Number of random users to generate
const users: User[] = [];

for (let i = 0; i < numberOfUsers; i++) {
  const user: User = {
    id: faker.datatype.number(100000).toString(), // Random 5-digit user ID
    pin: faker.datatype.number(9999).toString().padStart(4, '0'), // 4-digit PIN
    balance: faker.datatype.number({ min: 100, max: 10000 }) // Random balance between $100 and $10,000
  };
  users.push(user);
}

let currentUser: User | null = null;

function displayMenu() {
  console.log('\nATM Menu:');
  console.log('1. Check Balance');
  console.log('2. Withdraw');
  console.log('3. Deposit');
  console.log('4. Exit');
}

function login() {
  rl.question('Enter User ID: ', (userId) => {
    rl.question('Enter PIN: ', (pin) => {
      currentUser = users.find((user) => user.id === userId && user.pin === pin) || null;

      if (currentUser) {
        console.log(`Welcome, User ${currentUser.id}`);
        displayMenu();
        handleMenu();
      } else {
        console.log('Invalid User ID or PIN. Please try again.');
        login();
      }
    });
  });
}

function handleMenu() {
  rl.question('Select an option: ', (option) => {
    switch (option) {
      case '1':
        console.log(`Your balance: $${currentUser!.balance.toFixed(2)}`);
        displayMenu();
        handleMenu();
        break;
      case '2':
        rl.question('Enter withdrawal amount: $', (amount) => {
          const withdrawal = parseFloat(amount);
          if (!isNaN(withdrawal) && withdrawal > 0 && withdrawal <= currentUser!.balance) {
            currentUser!.balance -= withdrawal;
            console.log(`Withdrawal successful. Your new balance: $${currentUser!.balance.toFixed(2)}`);
          } else {
            console.log('Invalid amount or insufficient funds. Please try again.');
          }
          displayMenu();
          handleMenu();
        });
        break;
      case '3':
        rl.question('Enter deposit amount: $', (amount) => {
          const deposit = parseFloat(amount);
          if (!isNaN(deposit) && deposit > 0) {
            currentUser!.balance += deposit;
            console.log(`Deposit successful. Your new balance: $${currentUser!.balance.toFixed(2)}`);
          } else {
            console.log('Invalid amount. Please try again.');
          }
          displayMenu();
          handleMenu();
        });
        break;
      case '4':
        console.log('Goodbye!');
        rl.close();
        break;
      default:
        console.log('Invalid option. Please try again.');
        displayMenu();
        handleMenu();
        break;
    }
  });
}

console.log('Welcome to the ATM Simulation');
login();
