import React from 'react';
import PageButton from './components/PageButton';

import './Paginator.css';

function Paginator(props) {
  if (!props.count) return null;
  const pages = Math.ceil(props.count / props.offset);
  let pageLabels = [];
  for (let i = 1; i <= pages; i++) {
    pageLabels.push(i)
  }

  return (
    <div className="paginator">
      {pageLabels.map((page) => (
        <PageButton
          isActive={props.currentPage === page}
          key={page}
          page={page}
          onClickButton={props.onClickPageButton}
        />
      ))}
    </div>
  );
}

export default Paginator;
