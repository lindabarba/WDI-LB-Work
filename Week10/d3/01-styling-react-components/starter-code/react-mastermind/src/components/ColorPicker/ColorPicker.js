import React from 'react';
import './ColorPicker.css';

const ColorPicker = (props) => {
    let style = {
      height: 50,
      width: 50,
      borderRadius: '50%',
      border: 0,
      margin: 5
    };
  return (
    <div className="ColorPicker">
      {props.colors.map((color, idx) =>
        <button style={Object.assign({}, style, {backgroundColor: color})} key={color}></button>
      )}
    </div>
  );
}

export default ColorPicker;
