import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Please enter a paragraph: ', (paragraph) => {
  // Remove white spaces from the paragraph
  const paragraphWithoutSpaces = paragraph.replace(/\s/g, '');

  // Count the number of characters
  const characterCount = paragraphWithoutSpaces.length;

  // Count the number of words by splitting the paragraph by spaces
  const words = paragraph.trim().split(/\s+/);
  const wordCount = words.length;

  console.log(`Character count (excluding spaces): ${characterCount}`);
  console.log(`Word count: ${wordCount}`);

  rl.close();
});

