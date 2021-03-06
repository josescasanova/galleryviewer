import React from 'react';
import './ControlButtons.css';

class ControlButtons extends React.PureComponent {
  handleChange = (event) => {
    this.props.onDimensionsToggle(event.target.value);
  }

  render() {
    const props = this.props;
    return (
      <div className="control-buttons">
        <button
          className={`button ${props.isGrayscaleToggled ? 'button-outline' : ''}`}
          onClick={props.onGrayScaleToggle}>
          {props.isGrayscaleToggled ? 'Toggle Color' : 'Toggle Grayscale'}
        </button>
        <form>
          <fieldset>
            <select
              value={props.selectedDimension}
              onChange={this.handleChange}>
              <option value="">Filter by Dimensions</option>
              {props.dimensions.map((dimension) => (
                <option value={dimension} key={dimension}>{dimension}</option>
              ))}
            </select>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default ControlButtons;
