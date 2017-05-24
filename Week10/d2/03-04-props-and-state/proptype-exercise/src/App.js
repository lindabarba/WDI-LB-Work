import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Parent extends Component {
  constructor() {
    super();

  }
  render(){
    return (
      <App name="string" />
    )
  }
}

class App extends Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

App.propTypes = {
  name: PropTypes.object
}

export default Parent;
