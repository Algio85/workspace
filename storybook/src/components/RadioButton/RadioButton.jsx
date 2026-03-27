import React, { useState } from 'react';
import './RadioButton.css';

// Radio button image assets from Figma (valid for 7 days from generation)
// Replace with local SVG assets for production
// Unselected states
const imgUnselectedIdle     = "https://www.figma.com/api/mcp/asset/078d1d64-dbb1-4c51-a2a0-cf24494110ed";
const imgUnselectedHover    = "https://www.figma.com/api/mcp/asset/e91822c8-de4c-4b9e-bf0f-df83c56cfda2";
const imgUnselectedPress    = "https://www.figma.com/api/mcp/asset/246e9487-2d2d-44f7-8dff-b5e414db1a94";
const imgUnselectedDisabled = "https://www.figma.com/api/mcp/asset/85b86a49-dc20-447d-8225-5bd5a5252ac0";
// Selected states
const imgSelectedIdle       = "https://www.figma.com/api/mcp/asset/4a31c40d-040e-438a-a53b-7ccacc247a60";
const imgSelectedHover      = "https://www.figma.com/api/mcp/asset/351f739d-fd44-460b-9937-d5d24d489c72";
const imgSelectedPress      = "https://www.figma.com/api/mcp/asset/07ec0d0b-2e07-4c2d-9ff1-4f6aa550cc06";
const imgSelectedDisabled   = "https://www.figma.com/api/mcp/asset/eb2976be-0231-4e61-8fbe-f0d487691495";

export function RadioButton({
  selected        = false,
  defaultSelected,
  state,              // only for Storybook static snapshots
  label           = 'Label',
  required        = false,
  id,
  name,
  value,
  onChange,
  className,
}) {
  const [internalSelected, setInternalSelected] = useState(defaultSelected ?? selected);
  const isSelected = state ? selected : internalSelected;
  const isDisabled = state === 'disabled';
  const isIdle     = !state || state === 'idle';
  const isHover    = state === 'hover';
  const isPress    = state === 'press';

  const inputId = id || `radio-${label.toLowerCase().replace(/\s+/g, '-')}`;

  const handleChange = (e) => {
    if (!isDisabled) {
      setInternalSelected(e.target.checked);
      onChange?.(e);
    }
  };

  // Pick the right image asset based on selected + state
  const isIdleOrDisabled = isIdle || isDisabled;
  const isHoverOrPress   = isHover || isPress;

  const imgFlat = isSelected
    ? (isDisabled ? imgSelectedDisabled : imgSelectedIdle)
    : (isDisabled ? imgUnselectedDisabled : imgUnselectedIdle);

  const imgBleed = isSelected
    ? (isPress ? imgSelectedPress : imgSelectedHover)
    : (isPress ? imgUnselectedPress : imgUnselectedHover);

  return (
    <label
      htmlFor={inputId}
      className={[
        'radio-button',
        isDisabled ? 'radio-button--disabled' : '',
        state === 'hover' ? 'radio-button--static-hover' : '',
        state === 'press' ? 'radio-button--static-press' : '',
        className || '',
      ].filter(Boolean).join(' ')}
    >
      <input
        id={inputId}
        type="radio"
        name={name}
        value={value}
        className="radio-button__input"
        checked={isSelected}
        disabled={isDisabled}
        required={required}
        aria-checked={isSelected}
        aria-required={required}
        aria-label={label}
        onChange={handleChange}
      />

      <span className="radio-button__radio" aria-hidden="true">
        {/* Flat image — idle and disabled */}
        {isIdleOrDisabled && (
          <img alt="" className="radio-button__img" src={imgFlat} />
        )}
        {/* Bleed image — hover and press */}
        {isHoverOrPress && (
          <span className="radio-button__img-bleed">
            <img alt="" className="radio-button__img" src={imgBleed} />
          </span>
        )}
      </span>

      <span className="radio-button__label-group">
        <span className={['radio-button__label', isDisabled ? 'radio-button__label--disabled' : ''].filter(Boolean).join(' ')}>
          {label}
        </span>
        {required && (
          <span className="radio-button__required" aria-hidden="true">(required)</span>
        )}
      </span>
    </label>
  );
}

export default RadioButton;
