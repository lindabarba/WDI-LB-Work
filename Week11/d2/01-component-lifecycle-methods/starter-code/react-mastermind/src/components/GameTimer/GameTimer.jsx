import React, {Component} from 'react';
import './GameTimer.css';

// no semi-colon on class
class GameTimer extends Component {

  formatElapsedTime(seconds) {
    function pad(val, places) {
      var s = val.toString();
      return '0'.repeat(places - s.length) + s;
    }
    return `${pad(Math.floor(seconds / 60), 2)}:${pad(seconds % 60, 2)}`;
  }

  /* ----- Lifecycle Methods ---- */

  componentDidMount() {
    this.timerId = setInterval(
      //if we needed to pass arguments to the below function we would
      // declare this as a function
      // TURN THIS INTO ARROW FUNCTION AND PASS BOOLEAN VALUE OF isTiming
      this.props.handleTick,
      1000
    );
  }

  componentWillUnmount() {
    console.log('unmount');
    clearInterval(this.timerId);
  }

  render() {
    return (
      <div className='GameTimer'>{this.formatElapsedTime(this.props.elapsedTime)}</div>
    );
  }
}

export default GameTimer;
