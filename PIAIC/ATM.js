"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var faker = require("faker");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var numberOfUsers = 5; // Number of random users to generate
var users = [];
for (var i = 0; i < numberOfUsers; i++) {
    var user = {
        id: faker.datatype.number(100000).toString(),
        pin: faker.datatype.number(9999).toString().padStart(4, '0'),
        balance: faker.datatype.number({ min: 100, max: 10000 }) // Random balance between $100 and $10,000
    };
    users.push(user);
}
var currentUser = null;
function displayMenu() {
    console.log('\nATM Menu:');
    console.log('1. Check Balance');
    console.log('2. Withdraw');
    console.log('3. Deposit');
    console.log('4. Exit');
}
function login() {
    rl.question('Enter User ID: ', function (userId) {
        rl.question('Enter PIN: ', function (pin) {
            currentUser = users.find(function (user) { return user.id === userId && user.pin === pin; }) || null;
            if (currentUser) {
                console.log("Welcome, User ".concat(currentUser.id));
                displayMenu();
                handleMenu();
            }
            else {
                console.log('Invalid User ID or PIN. Please try again.');
                login();
            }
        });
    });
}
function handleMenu() {
    rl.question('Select an option: ', function (option) {
        switch (option) {
            case '1':
                console.log("Your balance: $".concat(currentUser.balance.toFixed(2)));
                displayMenu();
                handleMenu();
                break;
            case '2':
                rl.question('Enter withdrawal amount: $', function (amount) {
                    var withdrawal = parseFloat(amount);
                    if (!isNaN(withdrawal) && withdrawal > 0 && withdrawal <= currentUser.balance) {
                        currentUser.balance -= withdrawal;
                        console.log("Withdrawal successful. Your new balance: $".concat(currentUser.balance.toFixed(2)));
                    }
                    else {
                        console.log('Invalid amount or insufficient funds. Please try again.');
                    }
                    displayMenu();
                    handleMenu();
                });
                break;
            case '3':
                rl.question('Enter deposit amount: $', function (amount) {
                    var deposit = parseFloat(amount);
                    if (!isNaN(deposit) && deposit > 0) {
                        currentUser.balance += deposit;
                        console.log("Deposit successful. Your new balance: $".concat(currentUser.balance.toFixed(2)));
                    }
                    else {
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
