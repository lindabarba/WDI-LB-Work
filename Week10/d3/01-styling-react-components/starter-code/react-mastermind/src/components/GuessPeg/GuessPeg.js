import React from 'react';
import './GuessPeg.css';

const GuessPeg = (props) => {
  let style = {
    height: 50,
    width: 50,
    borderRadius: '50%',
    border: 0,
    margin: '0 5px'
  };
  return (
    <div style={Object.assign({}, style, {backgroundColor: props.color})}>
    </div>
  );
}

export default GuessPeg;
