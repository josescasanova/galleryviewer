import React from 'react';
import './Grid.css';

function Grid(props) {
  const columnCount = props.columns || 2;
  const rows = [];
  let row = [];
  React.Children.forEach(props.children, (child, index) => {
    const count = index + 1;
    row.push(child);
    if (count % columnCount === 0) {
      rows.push(row);
      row = [];
    }
  });
  return (
    <div className="grid container">
      {rows.map((row) => (
        <div className="row">
          {row.map(child => (
            <div className="column">
              {child}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Grid;
