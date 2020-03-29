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
    <div className="grid">
      {rows.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((child, columnIndex) => (
            <div className="column" key={columnIndex}>
              {child}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Grid;
