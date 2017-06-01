import React, { Component } from 'react';
import './App.css';
// Must import components used in the JSX
import GameBoard from './components/GameBoard/GameBoard';
import ColorPicker from './components/ColorPicker/ColorPicker';
import NewGameButton from './components/NewGameButton/NewGameButton';

let headFootStyle = {
  height: 50,
  padding: 10,
  margin: '15px 0',
  color: 'grey',
  fontSize: 18,
  textAlign: 'center'
};

class App extends Component {
  constructor(props) {
    super(props);
    let colors = ['#155765', '#57652A', '#AB9353', '#4D2C3D'];
    // write function that sets state to this when new game happens
    // if newGame clicked, reset/initialize
    // eventListener for newGameClick
    // this.setState({});

    // colorPicker: function in App > passes arg via props to component
    // component has click listening waiting for props to be 'filled'
    // filled props to App

    this.state = {
      colors,
      code: this.genCode(colors.length),
      selColorIdx: 0,
      guesses: [this.getNewGuess()]
    };
  }

  getNewGuess() {
    return {
      code: [null, null, null, null],
      score: {
        perfect: 0,
        almost: 0
      }
    };
  }

  genCode(size) {
    return new Array(size).fill().map(dummy => Math.floor(Math.random() * size));
  }

  getWinTries() {
    // if winner, return num guesses, otherwise 0 (no winner)
    let lastGuess = this.state.guesses.length - 1;
    return this.state.code.join() === this.state.guesses[lastGuess].code.join() ? lastGuess + 1 : 0;
  }

  /*-------- Callback Methods ---------*/

  handleColorSelection = (colorIdx) => {
    // when setting state, provide object - this is merged w/existing
    this.setState({selColorIdx: colorIdx});
  }

  newGameClick = () => {
    // this.setState({guesses: });
  }

  render() {
    let winTries = this.getWinTries();
    return (
      <div className="App">
        <header style={headFootStyle}>R E A C T &nbsp;&nbsp; M A S T E R M I N D</header>
        <div className="App-game">
          <GameBoard
            guesses={this.state.guesses}
            colors={this.state.colors}
          />
          <div className="App-controls">
            <ColorPicker
              handleColorSelection={this.handleColorSelection}
              selColorIdx={this.state.selColorIdx}
              colors={this.state.colors}
            />
            <NewGameButton />
          </div>
        </div>
        <footer style={headFootStyle}>{(winTries ? `You Won in ${winTries} Guesses!` : 'Good Luck!')}</footer>
      </div>
    );
  }
}

export default App;
