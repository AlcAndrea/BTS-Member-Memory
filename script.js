// BTS Data: 7 Members + 1 Group Card (8 total pairs / 16 cards)
const members = [
  { name: "RM", role: "Leader / Rapper", icon: "🐨" },
  { name: "Jin", role: "Vocalist", icon: "🐹" },
  { name: "Suga", role: "Rapper", icon: "🐱" },
  { name: "j-hope", role: "Main Dancer / Rapper", icon: "🐿️" },
  { name: "Jimin", role: "Main Dancer / Vocalist", icon: "🐥" },
  { name: "V", role: "Vocalist", icon: "🐻" },
  { name: "Jungkook", role: "Main Vocalist", icon: "🐰" },
  { name: "BTS", role: "ARMY Forever", icon: "💜" }
];

let cards = [];
let flippedCards = [];
let moves = 0;
let matches = 0;
let lockBoard = false;

// DOM Elements
const grid = document.getElementById('grid');
const movesDisplay = document.getElementById('moves');
const matchesDisplay = document.getElementById('matches');
const resetButton = document.getElementById('reset-btn');

// Initialize or Restart Game
function initGame() {
  grid.innerHTML = '';
  flippedCards = [];
  moves = 0;
  matches = 0;
  lockBoard = false;
  movesDisplay.innerText = moves;
  matchesDisplay.innerText = matches;

  // Duplicate array to make pairs and shuffle (Fisher-Yates)
  cards = [...members, ...members];
  shuffle(cards);

  // Generate HTML elements dynamically
  cards.forEach((member, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.index = index;
    cardElement.dataset.name = member.name;

    cardElement.innerHTML = `
      <div class="card-inner">
        <div class="card-back">⟭⟬</div>
        <div class="card-front">
          <div class="avatar">${member.icon}</div>
          <div class="name">${member.name}</div>
          <div class="role">${member.role}</div>
        </div>
      </div>
    `;

    cardElement.addEventListener('click', flipCard);
    grid.appendChild(cardElement);
  });
}

// Fisher-Yates Shuffle Algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Card Flip Event Handler
function flipCard() {
  if (lockBoard) return;
  if (this.classList.contains('flipped') || this.classList.contains('matched')) return;

  this.classList.add('flipped');
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

// Match Evaluation Logic
function checkMatch() {
  moves++;
  movesDisplay.innerText = moves;
  const [card1, card2] = flippedCards;
  const isMatch = card1.dataset.name === card2.dataset.name;

  if (isMatch) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matches++;
    matchesDisplay.innerText = matches;
    flippedCards = [];

    if (matches === members.length) {
      setTimeout(() => alert(`Congratulations! You cleared the board in ${moves} moves! 🎉`), 500);
    }
  } else {
    lockBoard = true;
    // Delay before un-flipping unmatched cards
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
      lockBoard = false;
    }, 1000);
  }
}

// Event Listeners & Startup
resetButton.addEventListener('click', initGame);
initGame();