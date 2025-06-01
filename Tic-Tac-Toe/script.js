const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restartBtn');

let currentPlayer = 'X';
let gameActive = true;

// Winning combinations (3 in a row)
const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

// Set up click events on each cell
cells.forEach(cell => {
  cell.addEventListener('click', handleClick, { once: true });
});

// Handle click on a cell
function handleClick(event) {
  const cell = event.target;

  if (!gameActive) return;

  cell.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (isDraw()) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    switchPlayer();
  }
}

// Switch players between X and O
function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Check if the current player has won
function checkWin(player) {
  return winPatterns.some(pattern => {
    return pattern.every(index => {
      return cells[index].textContent === player;
    });
  });
}

// Check if all cells are filled (draw)
function isDraw() {
  return [...cells].every(cell => cell.textContent !== '');
}

// Restart the game
restartButton.addEventListener('click', () => {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = "Player X's turn";
});
