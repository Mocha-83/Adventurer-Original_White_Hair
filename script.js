const homeScreen = document.getElementById('home-screen');
const gameScreen = document.getElementById('game-screen');
const originalCharacterButton = document.getElementById('original-character');
const newCharacterButton = document.getElementById('new-character');
const adventurer = document.getElementById('adventurer');
const monstersContainer = document.getElementById('monsters');
const scoreDisplay = document.getElementById('score');
const topScoreDisplay = document.getElementById('top-score');

let score = 0;
let topScore = 0;
let gameInterval;
let scoreInterval;

// Character selection
originalCharacterButton.addEventListener('click', () => {
  startGame('original');
});

newCharacterButton.addEventListener('click', () => {
  startGame('new');
});

function startGame(character) {
  // Hide home screen and show game screen
  homeScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');

  // Set adventurer appearance based on selection
  adventurer.className = character;

  // Reset score
  score = 0;
  scoreDisplay.textContent = score;

  // Clear existing monsters
  monstersContainer.innerHTML = '';

  // Create a new monster every 2 seconds
  gameInterval = setInterval(() => {
    const monster = document.createElement('div');
    monster.classList.add('monster');
    monstersContainer.appendChild(monster);

    // Check if the monster reaches the castle
    monster.addEventListener('animationend', () => {
      if (monster.parentElement) {
        alert(`Monster reached the castle! Your score: ${score}`);
        restartGame();
      }
    });
  }, 2000);

  // Increase score every second
  scoreInterval = setInterval(() => {
    score++;
    scoreDisplay.textContent = score;

    // Update top score if the current score is higher
    if (score > topScore) {
      topScore = score;
      topScoreDisplay.textContent = topScore;
    }
  }, 1000);
}

function restartGame() {
  clearInterval(gameInterval);
  clearInterval(scoreInterval);
  homeScreen.classList.remove('hidden');
  gameScreen.classList.add('hidden');
}