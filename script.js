document.addEventListener('DOMContentLoaded', () => {
  const homeScreen = document.getElementById('home-screen');
  const gameScreen = document.getElementById('game-screen');
  const originalCharacterButton = document.getElementById('original-character');
  const newCharacterButton = document.getElementById('new-character');
  const adventurer = document.getElementById('adventurer');
  const monstersContainer = document.getElementById('monsters');
  const thornWallsContainer = document.getElementById('thorn-walls');
  const airShield = document.getElementById('air-shield');
  const scoreDisplay = document.getElementById('score');
  const topScoreDisplay = document.getElementById('top-score');

  let score = 0;
  let topScore = 0;
  let gameInterval;
  let scoreInterval;
  let monstersDefeated = 0;
  let thornWallsActive = false;
  let airShieldActive = false;

  // Character selection
  originalCharacterButton.addEventListener('click', () => {
    console.log('Original character selected'); // Debugging
    startGame('original');
  });

  newCharacterButton.addEventListener('click', () => {
    console.log('New character selected'); // Debugging
    startGame('new');
  });

  function startGame(character) {
    console.log('Game started with character:', character); // Debugging
    homeScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    adventurer.className = character;
    score = 0;
    monstersDefeated = 0;
    scoreDisplay.textContent = score;
    monstersContainer.innerHTML = '';

    gameInterval = setInterval(() => {
      console.log('Spawning monster'); // Debugging
      const monster = document.createElement('div');
      monster.classList.add('monster');
      monstersContainer.appendChild(monster);

      monster.addEventListener('animationend', () => {
        if (monster.parentElement) {
          alert(`Monster reached the castle! Your score: ${score}`);
          restartGame();
        }
      });
    }, 2000);

    scoreInterval = setInterval(() => {
      score++;
      scoreDisplay.textContent = score;
      if (score > topScore) {
        topScore = score;
        topScoreDisplay.textContent = topScore;
      }

      // Unlock abilities based on monsters defeated
      if (monstersDefeated >= 15 && monstersDefeated < 30) {
        adventurer.classList.add('flaming-katana');
      } else if (monstersDefeated >= 30 && monstersDefeated < 45) {
        adventurer.classList.add('icicles');
      } else if (monstersDefeated >= 45 && monstersDefeated < 60) {
        activateThornWalls();
      } else if (monstersDefeated >= 60) {
        activateAirShield();
      }
    }, 1000);
  }

  function restartGame() {
    clearInterval(gameInterval);
    clearInterval(scoreInterval);
    homeScreen.classList.remove('hidden');
    gameScreen.classList.add('hidden');
  }

  function activateThornWalls() {
    if (!thornWallsActive) {
      thornWallsActive = true;
      thornWallsContainer.innerHTML = '<div class="thorn-wall" style="left: 0;"></div><div class="thorn-wall" style="right: 0;"></div>';
      setTimeout(() => {
        thornWallsContainer.innerHTML = '';
        thornWallsActive = false;
      }, 15000);
    }
  }

  function activateAirShield() {
    if (!airShieldActive) {
      airShieldActive = true;
      airShield.style.display = 'block';
      setTimeout(() => {
        airShield.style.display = 'none';
        airShieldActive = false;
      }, 10000);
    }
  }
});