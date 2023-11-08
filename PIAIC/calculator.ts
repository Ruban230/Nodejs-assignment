import inquirer from 'inquirer';

const operations = ['Add', 'Subtract', 'Multiply', 'Divide'];

const askForOperation = async (): Promise<string> => {
  const { operation } = await inquirer.prompt([
    {
      type: 'list',
      name: 'operation',
      message: 'Choose an operation:',
      choices: operations,
    },
  ]);
  return operation;
};

const askForNumbers = async (): Promise<number[]> => {
  const { num1, num2 } = await inquirer.prompt([
    {
      type: 'number',
      name: 'num1',
      message: 'Enter the first number:',
    },
    {
      type: 'number',
      name: 'num2',
      message: 'Enter the second number:',
    },
  ]);
  return [num1, num2];
};

const calculate = async () => {
  const operation = await askForOperation();
  const [num1, num2] = await askForNumbers();

  let result: number;

  switch (operation) {
    case 'Add':
      result = num1 + num2;
      break;
    case 'Subtract':
      result = num1 - num2;
      break;
    case 'Multiply':
      result = num1 * num2;
      break;
    case 'Divide':
      if (num2 === 0) {
        console.log('Cannot divide by zero!');
        return;
      }
      result = num1 / num2;
      break;
    default:
      console.log('Invalid operation!');
      return;
  }

  console.log(`Result of ${operation}: ${result}`);
};

calculate();
