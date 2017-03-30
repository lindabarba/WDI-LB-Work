/*--- variables ---*/
var array = [];
var playerX = 'Player X';
var playerO = 'Player O';
var currentPlayer = 'Player X';
var winner = '';

/*--- event listeners ---*/
//document.getElementById('#cell').addEventListener('click', handleClick);
document.querySelector('#cell').addEventListener('click', handleClick);
//document.getElementById('#reset').addEventListener('click', handleReset);
document.querySelector('#reset').addEventListener('click', handleReset);

/*--- functions ---*/
/* function to start/initialize game */
function start() {
  array =
  [0, 0, 0, 0, 0, 0, 0, 0, 0];
}

function handleClick(event) {
  if (event.target.id === 'reset') return;
  else if (evt.target.id === 'cell')
  /*
  function click(e){
  id = e.target.id;
  if (!id) {return} // prevent adding extra element at the end of hte array
  var value = 0;
  if (currentPlayer === player1) {
    value = 1;
  } else {
    value = -1;
  }
  array[id] = value;
  renderTable(e.target.id);
  winCondition();
  if (checkTie()) {
    console.log('tie')
  }*/
  console.log("hello");
}

/* function to determine winner
  ideally this will also display winner */
function getWinner() {

}

/* function to reset board */
function handleReset() {
  console.log("goodbye");
}

/* this goes last so all code can load.
    call start function to initialize new game */
start();
