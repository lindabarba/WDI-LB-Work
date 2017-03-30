/*Tic Tac Toe*/
/* event listeners */
document.querySelector('#table').addEventListener('click', click);
document.querySelector('#reset').addEventListener('click', reset);
// initialize variables
var array;
var currentPlayer;
var player1 = 'red';
var player2 = 'blue';
var winner;

// functions
function start() {
  array = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
  currentPlayer = player1;
  winner = "";
  //document.getElementById('table').addEventListener('click', click);
  //document.getElementById('reset').addEventListener('click', reset);
}

function click(e) {
  var id = e.target.id;
  if (!id) return; // stop if there is no id
  var value = currentPlayer === player1 ? 1 : -1;
  if (array[id] !== 0) return; // prevent from overriding current value
  array[id] = value; // assign value depending on currentPlayer at correct index of array
  console.log(array);
  findWinner();
  switchPlayer();
}

function switchPlayer() {
  currentPlayer = currentPlayer === player1 ? player2 : player1;
}

function findWinner() {
  // horizontal
  if (array[0] + array[1] + array[2] === 3) winner = player1;
  if (array[0] + array[1] + array[2] === -3) winner = player2;
  if (array[3] + array[4] + array[5] === 3) winner = player1;
  if (array[3] + array[4] + array[5] === -3) winner = player2;
  if (array[6] + array[7] + array[8] === 3) winner = player1;
  if (array[6] + array[7] + array[8] === -3) winner = player2;
  // vertical
  if (array[0] + array[3] + array[6] === 3) winner = player1;
  if (array[0] + array[3] + array[6] === -3) winner = player2;
  if (array[1] + array[4] + array[7] === 3) winner = player1;
  if (array[1] + array[4] + array[7] === -3) winner = player2;
  if (array[2] + array[5] + array[8] === 3) winner = player1;
  if (array[2] + array[5] + array[8] === -3) winner = player2;
  // diagonal
  if (array[0] + array[4] + array[8] === 3) winner = player1;
  if (array[0] + array[4] + array[8] === -3) winner = player2;
  if (array[2] + array[4] + array[6] === 3) winner = player1;
  if (array[2] + array[4] + array[6] === -3) winner = player2;

  if (winner) {
    console.log(winner)
    message = winner === player1 ? "Player 1 is the winner!" : "Player 2 is the Winner";
    document.querySelector('#winner').innerHTML = message;
    // stop players from adding more squares by removing event listener
    document.getElementById('table').removeEventListener('click', click);
  } else {
    // if there is NO winner, check for a tie
    checkForTie();
  }
}

function checkForTie() {
  // if there is any element === 0, it will return 0
  var checkForZero = array.find(function(el) {
    return el === 0;
  });
  // if checkForZero doesn't return 0, then there is a tie
  if (checkForZero !== 0) {
    document.querySelector('#winner').innerHTML = "We have a tie!";
  }
}

function reset() {
  // remove event listeners (they will stack)
  document.getElementById('table').removeEventListener('click', click);
  document.getElementById('reset').removeEventListener('click', reset);
  start();
}

start();
