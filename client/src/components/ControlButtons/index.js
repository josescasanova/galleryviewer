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
          <select>
            <option value="">Filter by Dimentions</option>
            {props.dimentions.map((dimention) => (
              <option value={dimention} key={dimention}>{dimention}</option>
            ))}
          </select>
        </fieldset>
      </form>
    </div>
  );
}

export default ControlButtons;
