import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function convertCurrency(amount: number, baseCurrency: string, targetCurrency: string): number {
  // Define exchange rates (manually or fetch from an external source)
  const exchangeRates: { [key: string]: number } = {
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
  const rate = exchangeRates[targetCurrency] / exchangeRates[baseCurrency];
  return amount * rate;
}

function main() {
  rl.question('Enter the amount in your base currency: ', (amount) => {
    rl.question('Enter your base currency (e.g., USD, EUR): ', (baseCurrency) => {
      rl.question('Enter the target currency (e.g., USD, EUR): ', (targetCurrency) => {
        try {
          const convertedAmount = convertCurrency(parseFloat(amount), baseCurrency.toUpperCase(), targetCurrency.toUpperCase());
          console.log(`${amount} ${baseCurrency} is equal to ${convertedAmount} ${targetCurrency}`);
        } catch (error) {
          console.error(error.message);
        } finally {
          rl.close();
        }
      });
    });
  });
}

// Call the main function to convert currency
main();
