"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.question('Please enter a paragraph: ', function (paragraph) {
    // Remove white spaces from the paragraph
    var paragraphWithoutSpaces = paragraph.replace(/\s/g, '');
    // Count the number of characters
    var characterCount = paragraphWithoutSpaces.length;
    // Count the number of words by splitting the paragraph by spaces
    var words = paragraph.trim().split(/\s+/);
    var wordCount = words.length;
    console.log("Character count (excluding spaces): ".concat(characterCount));
    console.log("Word count: ".concat(wordCount));
    rl.close();
});
