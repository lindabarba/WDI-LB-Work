/*Tic Tac Toe*/
/* event listeners */
//document.getElementById('table').addEventListener('click', click);
//document.getElementById('reset').addEventListener('click', reset);
document.querySelector('#table').addEventListener('click', click);
document.querySelector('#reset').addEventListener('click', start);

/* variables */
var array;
var currentPlayer;
var playerX = 'X';
var playerO = 'O';
var winner;
var message;

var messageEl = document.querySelector('#message');

/* functions */
function start() {
  array = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
  currentPlayer = playerX;
  winner = "";
  message = "";
  render();
}

function click(e) {
  var id = e.target.id;
  console.log(id)
  if (array[id]) return;
  var value = currentPlayer === playerX ? 1 : -1;
  array[id] = value;
  console.log(array);
  currentPlayer = currentPlayer === playerX ? playerO : playerX;
  message = "Player <strong>" + currentPlayer + "</strong>'s Turn";
  findWinner();
  render();
}

/* win logic */
function findWinner() {
  // horizontal
  if (array[0] + array[1] + array[2] === 3) winner = playerX;
  if (array[0] + array[1] + array[2] === -3) winner = playerO;
  if (array[3] + array[4] + array[5] === 3) winner = playerX;
  if (array[3] + array[4] + array[5] === -3) winner = playerO;
  if (array[6] + array[7] + array[8] === 3) winner = playerX;
  if (array[6] + array[7] + array[8] === -3) winner = playerO;
  // vertical
  if (array[0] + array[3] + array[6] === 3) winner = playerX;
  if (array[0] + array[3] + array[6] === -3) winner = playerO;
  if (array[1] + array[4] + array[7] === 3) winner = playerX;
  if (array[1] + array[4] + array[7] === -3) winner = playerO;
  if (array[2] + array[5] + array[8] === 3) winner = playerX;
  if (array[2] + array[5] + array[8] === -3) winner = playerO;
  // diagonal
  if (array[0] + array[4] + array[8] === 3) winner = playerX;
  if (array[0] + array[4] + array[8] === -3) winner = playerO;
  if (array[2] + array[4] + array[6] === 3) winner = playerX;
  if (array[2] + array[4] + array[6] === -3) winner = playerO;
  if (winner) {
    console.log(winner)
    message = winner === playerX ? "Player X wins." : "Player O wins.";
  } else {
    if (!array.includes(0)) message = "Rats, another cat's game!";
  }
}

function render(value) {
  messageEl.innerHTML = message;
  array.forEach(function(val, idx) {
    var cell = document.getElementById(idx);
    if (val) {
      cell.textContent = val === 1 ? "X" : "O";
    } else {
      cell.textContent = ' ';
    }
  });
  // if (value = 1) {
  //   document.getElementById(id).textContent = "X";
  //   return;
  // } else if (value = -1) {
  //   document.getElementById(id).textContent = "O";
  //   return;
  // } else {
  //   return;
  // }
}

start();
