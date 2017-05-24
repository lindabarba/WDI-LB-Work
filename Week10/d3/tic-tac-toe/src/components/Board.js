import React from 'react';
import Game from './Game';
import Square from './Square';

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Square value={this.state.squares[0]} />
          <Square />
          <Square />
        </div>
        <div className="row">
          <Square />
          <Square />
          <Square />
        </div>
        <div className="row">
          <Square />
          <Square />
          <Square />
        </div>
      </div>
    );
  }
}

export default Board;
