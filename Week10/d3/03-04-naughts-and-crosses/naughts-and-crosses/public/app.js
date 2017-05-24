class Board {

  // Construtor method for Board class
  constructor() {
    this.state = Array(9).fill(null);
    this.turn = "X";
    this.winner = "";
    this.createBoard();
    this.addClickListener();
    this.render();
  }

  // Creating the board
  createBoard() {

    $('#root').append("<table id='board'></table>");

    // Adding rows to DOM
    const rows = `
      <tr class='row 0'></tr>
      <tr class='row 1'></tr>
      <tr class='row 2'></tr>
    `;

    $('#board').append(rows);

    // Adding cells to DOM
    const cells = [[0,1,2], [3,4,5], [6,7,8]].map((elem) => {
      return (
        `<td class="cell ${elem[0]}">
        </td><td class="cell ${elem[1]}"></td>
        <td class="cell ${elem[2]}"></td>
        `
      )
    });

    $.each($('.row'), function(index, elem) {
      $(elem).append(cells[index]);
    })
  }

  // Adding a click listener to each cell
  addClickListener() {
    $('.cell').click((e) => {
      if (e.target.innerHTML === "") {
        this.update(e);
      }
    })
  }

  // updates state
  update(e) {
    let cellID = parseInt(e.target.classList[1]);
    let stateCopy = this.state.slice();
    stateCopy[cellID] = this.turn;
    this.turn = this.turn === "X" ? "O" : "X";
    this.state = stateCopy;
    let winner = calculateWinner(this.state);

    if (winner === "X" && this.winner === "") {
      $('h1').append('<h3>X has Won</h3>');
      this.render();
      this.winner = "X";
      return;
    }

    if (winner === "O" && this.winner === "") {
      $('h1').append('<h3>O has Won</h3>');
      this.render();
      this.winner === "O";
      return
    }

    if (this.winner === "") {
      this.render();
    }

  }

  // renders on a board
  render() {
    let state = this.state;
    $.each($(".row .cell"), function(index, value) {
      $(value).html(state[index]);
    });
  }

};

function init() {
  let newGame = new Board();
}

init();
