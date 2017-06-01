import React, {Component} from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: null
    }
  }
}

render() {
  return {
    <div>
      <Search />
    </div>
  }
}

export default App;
