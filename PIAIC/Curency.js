"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function convertCurrency(amount, baseCurrency, targetCurrency) {
    // Define exchange rates (manually or fetch from an external source)
    var exchangeRates = {
        USD: 1.0,
        EUR: 0.85,
        GBP: 0.73,
        JPY: 110.0,
        // Add more currencies and their exchange rates as needed
    };
    // Check if the base and target currencies are valid
    if (!exchangeRates[baseCurrency] || !exchangeRates[targetCurrency]) {
        throw new Error('Invalid currency codes.');
    }
    // Perform the currency conversion
    var rate = exchangeRates[targetCurrency] / exchangeRates[baseCurrency];
    return amount * rate;
}
function main() {
    rl.question('Enter the amount in your base currency: ', function (amount) {
        rl.question('Enter your base currency (e.g., USD, EUR): ', function (baseCurrency) {
            rl.question('Enter the target currency (e.g., USD, EUR): ', function (targetCurrency) {
                try {
                    var convertedAmount = convertCurrency(parseFloat(amount), baseCurrency.toUpperCase(), targetCurrency.toUpperCase());
                    console.log("".concat(amount, " ").concat(baseCurrency, " is equal to ").concat(convertedAmount, " ").concat(targetCurrency));
                }
                catch (error) {
                    console.error(error.message);
                }
                finally {
                    rl.close();
                }
            });
        });
    });
}
// Call the main function to convert currency
main();
