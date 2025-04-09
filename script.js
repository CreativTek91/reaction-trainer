const box = document.getElementById('box');
const startButton = document.getElementById('startButton');
const result = document.getElementById('result');

let startTime;
let timeoutId;
let countdownInterval;
let countdown;
let isReady = false;

function getRandomDelay(min = 2000, max = 5000) {
  return Math.floor(Math.random() * (max - min) + min);
}

function startGame() {
  box.style.backgroundColor = '#ccc';
  result.textContent = '';
  isReady = false;

  const delay = getRandomDelay(); // z. B. 3793 ms
  countdown = Math.floor(delay / 1000); // z. B. 3 Sekunden sichtbar

  box.textContent = `${countdown}...`;

  // Aktualisiere jede Sekunde den Countdown sichtbar
  countdownInterval = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      box.textContent = `Noch ${countdown}sek ...`;
    }
  }, 1000);

  // Warten, bis der Button grün wird
  timeoutId = setTimeout(() => {
    clearInterval(countdownInterval);
    box.style.backgroundColor = 'green';
    box.textContent = 'Jetzt!';
    startTime = Date.now();
    isReady = true;
  }, delay);
}

box.addEventListener('click', () => {
  if (!isReady) {
    clearTimeout(timeoutId);
    clearInterval(countdownInterval);
    result.textContent = 'Zu früh! Versuch es nochmal.';
    box.textContent = 'Fehler!';
    box.style.backgroundColor = 'red';
    isReady = false;
  } else {
    const reactionTime = Date.now() - startTime;
    result.textContent = `Deine Reaktionszeit: ${reactionTime} ms`;
    box.textContent = 'Geschafft!';
    box.style.backgroundColor = 'blue';
    isReady = false;
  }
});

startButton.addEventListener('click', startGame);
