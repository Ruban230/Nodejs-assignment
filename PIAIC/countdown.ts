import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getFutureDate() {
  return new Promise<string>((resolve) => {
    rl.question('Enter the future date and time (YYYY-MM-DD HH:MM:SS): ', (answer) => {
      resolve(answer);
    });
  });
}

async function startCountdown() {
  const futureDateInput = await getFutureDate();
  const futureDate = new Date(futureDateInput);

  if (isNaN(futureDate.getTime())) {
    console.log('Invalid date format. Please use YYYY-MM-DD HH:MM:SS.');
    rl.close();
    return;
  }

  const interval = setInterval(() => {
    const currentTime = new Date().getTime();
    const timeRemaining = futureDate.getTime() - currentTime;

    if (timeRemaining <= 0) {
      clearInterval(interval);
      console.log('Countdown expired!');
      rl.close();
    } else {
      const seconds = Math.floor(timeRemaining / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      const formattedTime = `${days}d ${hours % 24}h ${minutes % 60}m ${seconds % 60}s`;
      console.log(`Countdown: ${formattedTime}`);
    }
  }, 1000);
}

startCountdown();
