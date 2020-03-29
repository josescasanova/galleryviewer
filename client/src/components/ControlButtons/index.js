import React from 'react';
import './ControlButtons.css';

function ControlButtons(props) {
  return (
    <div className="control-buttons">
      <button
      // TODO styling colors
        className={`button ${props.isGrayscaleToggled ? 'button-outline' : ''}`}
        onClick={props.onGrayScaleToggle}>
        {props.isGrayscaleToggled ? 'Color me!' : 'Turn me Gray!'}
      </button>
      <form>
        <fieldset>
          <select
            value={props.selectedDimension}
            onChange={props.onDimensionsToggle}>
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

export default ControlButtons;
