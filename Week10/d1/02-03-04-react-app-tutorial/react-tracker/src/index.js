import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board.js';
import './index.css';

ReactDOM.render(<Board />, document.getElementById('root'));


// FROM WHEN WE DEFINED BOARD IN THIS FILE
// INSTEAD WE IMPORTED (LINE 3)
// class Board extends Component {
//   render() {
//     return (
//         <div>
//         <h1>Hello World</h1>
//         <div>What Is UP</div>
//         </div>
//       )
    // this syntax also works:
    // return <div>
    //     <h1>Hello World</h1>
    //     <div>What Is UP</div>
    //     </div>
//   }
// };
