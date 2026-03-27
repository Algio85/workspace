import React, { useState } from 'react';
import './Checkbox.css';

// Checked box image assets from Figma (valid for 7 days from generation)
// Replace with local SVG assets for production
const imgCheckedIdle     = "https://www.figma.com/api/mcp/asset/3972a18b-7046-4c23-98c8-9233b0fef948";
const imgCheckedHover    = "https://www.figma.com/api/mcp/asset/f41eba7a-6a0d-4fff-9f92-807d402db083";
const imgCheckedPress    = "https://www.figma.com/api/mcp/asset/599c6acd-15cc-4f92-9ce4-76c01bc8ae12";
const imgCheckedDisabled = "https://www.figma.com/api/mcp/asset/d7ead72c-061c-488e-a78e-9820b5138462";

export function Checkbox({
  checked        = false,
  defaultChecked,
  state: forcedState, // only used for Storybook docs / static snapshots
  label          = 'Label',
  required       = false,
  id,
  onChange,
  className,
}) {
  // Internal interaction state — driven by real mouse events
  const [interactionState, setInteractionState] = useState('idle');
  // Support both controlled and uncontrolled checked
  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? checked);

  // If forcedState is passed (Storybook), use it; otherwise use real interaction
  const state      = forcedState || interactionState;
  const isChecked  = forcedState ? checked : internalChecked;
  const isDisabled = state === 'disabled';
  const isHover    = state === 'hover';
  const isPress    = state === 'press';
  const isIdle     = state === 'idle';

  const inputId = id || `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}`;

  const handleMouseEnter = () => { if (!isDisabled) setInteractionState('hover'); };
  const handleMouseLeave = () => { if (!isDisabled) setInteractionState('idle'); };
  const handleMouseDown  = () => { if (!isDisabled) setInteractionState('press'); };
  const handleMouseUp    = () => { if (!isDisabled) setInteractionState('hover'); };

  const handleChange = (e) => {
    if (!isDisabled) {
      setInternalChecked(e.target.checked);
      onChange?.(e);
    }
  };

  const boxClass = [
    'checkbox__box',
    isChecked
      ? 'checkbox__box--checked'
      : isDisabled
        ? 'checkbox__box--disabled'
        : isPress
          ? 'checkbox__box--press'
          : isHover
            ? 'checkbox__box--hover'
            : 'checkbox__box--idle',
  ].join(' ');

  return (
    <label
      htmlFor={inputId}
      className={[
        'checkbox',
        isDisabled ? 'checkbox--disabled' : '',
        className || '',
      ].filter(Boolean).join(' ')}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <input
        id={inputId}
        type="checkbox"
        className="checkbox__input"
        checked={isChecked}
        disabled={isDisabled}
        required={required}
        aria-checked={isChecked}
        aria-required={required}
        aria-label={label}
        onChange={handleChange}
      />

      <span className={boxClass} aria-hidden="true">
        {/* Checked idle + disabled: flat image */}
        {isChecked && (isIdle || isDisabled) && (
          <img
            alt=""
            className="checkbox__img"
            src={isDisabled ? imgCheckedDisabled : imgCheckedIdle}
          />
        )}
        {/* Checked hover + press: image with bleed for focus ring */}
        {isChecked && (isHover || isPress) && (
          <span className="checkbox__img-bleed">
            <img
              alt=""
              className="checkbox__img"
              src={isPress ? imgCheckedPress : imgCheckedHover}
            />
          </span>
        )}
      </span>

      <span className="checkbox__label-group">
        <span className={[
          'checkbox__label',
          isDisabled ? 'checkbox__label--disabled' : '',
        ].filter(Boolean).join(' ')}>
          {label}
        </span>
        {required && (
          <span className="checkbox__required" aria-hidden="true">(required)</span>
        )}
      </span>
    </label>
  );
}

export default Checkbox;
