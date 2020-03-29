import React from 'react';
import './Image.css';

function Image(props) {
  return (
    <img
      alt={props.label || 'Image'}
      className="image"
      src={props.source}
    />
  );
}

export default Image;
