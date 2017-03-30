/*---variables---*/
var array = [];
var player1 = "red";
var player2 = "blue";
var currentPlayer = player1;
var winner = "";

/*---event listeners---*/
document.querySelector('#table').addEventListener('click', click);
document.querySelector('.reset').addEventListener('click', reset);

/*---functions---*/
function start() {
  array = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ]
}

function click(e) {
  var id = e.target.id;
  if (!id) {return} //prevent adding extra element at end of id
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
  }


}

function renderTable(id) {
  var color = currentPlayer;
  if (id) {
    if (document.getElementById(id).classList.contains('blue')) {return}
    if (document.getElementById(id).classList.contains('red')) {return}
    switchs();
    document.getElementById(id).classList.add(color)
  }
}

function reset() {
  console.log('reset')
  document.querySelectorAll('.cell').forEach(function(cell) {
    cell.classList.remove('blue');
    cell.classList.remove('red');
  });
  document.querySelector('#player1').classList.remove('blue');
  document.querySelector('#player1').classList.remove('red');
  document.querySelector('#player2').classList.remove('blue');
  document.querySelector('#player2').classList.remove('red');
}

function switchs() {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  }
  else {
    currentPlayer = player1;
  }
}

function winCondition() {
//  for (var y = 0; y < 3; y++) {
//    for (var i = 0; i < 2; i++) {
//      array[i+y];
//    }
//  }
  if (array[0] + array[1] + array[2] === 3) winner = player1;
  if (array[0] + array[1] + array[2] === -3) winner = player2;
  if (array[3] + array[4] + array[5] === 3) winner = player1;
  if (array[3] + array[4] + array[5] === -3) winner = player2;
  if (array[6] + array[7] + array[8] === 3) winner = player1;
  if (array[6] + array[7] + array[8] === -3) winner = player2;
  if (array[0] + array[3] + array[6] === 3) winner = player1;
  if (array[0] + array[3] + array[6] === -3) winner = player2;
  if (array[1] + array[4] + array[7] === 3) winner = player1;
  if (array[1] + array[4] + array[7] === -3) winner = player2;
  if (array[2] + array[5] + array[8] === 3) winner = player1;
  if (array[2] + array[5] + array[8] === -3) winner = player2;
  if (array[0] + array[4] + array[8] === 3) winner = player1;
  if (array[0] + array[4] + array[8] === -3) winner = player2;
  if (array[2] + array[4] + array[6] === 3) winner = player1;
  if (array[2] + array[4] + array[6] === -3) winner = player2;
  if (winner === player1) document.querySelector('#player1').classList.add('red');
  if (winner === player2) document.querySelector('#player2').classList.add('blue');
 }

function checkTie() {
  if (!winner) {
  var isTie = false;
  console.log(array)
  for (var i = 0; array.length; i++) {
    if (array[i] === 0) {
      isTie = false;
    } else {
      isTie = true;
      return;
    }
  }
  return isTie;
  }
}
//tie logic - 9 valid clicks OR all cells have value AND no winner

start();
