import React from 'react';

class PageButton extends React.PureComponent {
  handleClickButton = () => {
    // TODO push ?p=X
    this.props.onClickButton(this.props.page);
  }

  render() {
    return (
      <button
        className={`button ${this.props.isActive ? '' : 'button-clear'}`}
        onClick={this.handleClickButton}>
        {this.props.page}
      </button>
    );
  }
}

export default PageButton;
