/* -- variables -- */
var choice; /*this will hold the click choice by table
  cell id*/
var result; /*this will hold the winner*/
var winner; /*this will determine if
var displayStatus = document.getElementById('status');*/
var playerX = "Player X";
var playerO = "Player O";



/* -- event listeners -- */
/* the listener should bubble up - handle both
 altering the square, passing info along, triggering
 next event */

/*this will listen for board choice click*/
document.getElementById('td').addEventListener('click', handleChoice);

/*this will listen for reset click*/
var button = document.querySelector('button');
button.addEventListener('click', handleReset);

/* -- functions -- */
function initialize() {
  playerTurn = playerX;
}

function playerTurn() {
  //code to determine player turn
}

/*displayStatus will state the player's turn,
  or the player who won, or if the game is over (cat)*/
function displayStatus() {
  if (playerTurn = "Player X"){
    //display is "Player X"
  } else if (playerTurn = "Player O") {
    //display is "Player O"
  } else if (gameOver === true) {
    //display is winner
  } else {
    //display is "Player X"
  }
}

/*gameOver will determine if and which player won*/
function gameOver() {
  if (winner = "Player X") {

  }
}

/*claimSquare will assign a square to a player if the
  player clicks on it*/
function claimSquare() {
  //if (winner) {
    //do nothing
  //} else if (playerX) {
  //  choice = "X";
  //} else {
  //  choice = "O";
  console.log("Hello");
  //}
}

/*resetGame will clear board if button clicked*/
function handleReset(evt) {
  //clear board code
}

/*handleChoice is an event listener for in-game clicks*/
function handleChoice(evt) {
  if (evt.target.id === 'button') return;
  else if (evt.target.id === 'td') {
  switch (choice) {
    case 'a':
      claimSquare();
      break;
    case 'b':
      claimSquare();
      break;
    case 'c':
      claimSquare();
      break;
    case 'd':
      claimSquare();
      break;
    case 'e':
      claimSquare();
      break;
    case 'f':
      claimSquare();
      break;
    case 'g':
      claimSquare();
      break;
    case 'h':
      claimSquare();
      break;
    case 'i':
      claimSquare();
      break;
    default:
      resetGame();
  }
 }
  displayStatus();
}
