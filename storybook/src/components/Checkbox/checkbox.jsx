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
  state,          // only for Storybook static snapshots
  label          = 'Label',
  required       = false,
  id,
  onChange,
  className,
}) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? checked);
  const isChecked  = state ? checked : internalChecked;
  const isDisabled = state === 'disabled';

  const inputId = id || `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}`;

  const handleChange = (e) => {
    if (!isDisabled) {
      setInternalChecked(e.target.checked);
      onChange?.(e);
    }
  };

  return (
    <label
      htmlFor={inputId}
      className={[
        'checkbox',
        isDisabled    ? 'checkbox--disabled'    : '',
        // Static state overrides for Storybook docs only
        state === 'hover' ? 'checkbox--static-hover' : '',
        state === 'press' ? 'checkbox--static-press' : '',
        className || '',
      ].filter(Boolean).join(' ')}
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

      <span className="checkbox__box" aria-hidden="true">
        {/* Checked idle + disabled: flat image */}
        {isChecked && (!state || state === 'idle' || state === 'disabled') && (
          <img
            alt=""
            className="checkbox__img"
            src={isDisabled ? imgCheckedDisabled : imgCheckedIdle}
          />
        )}
        {/* Checked hover: image with bleed */}
        {isChecked && state === 'hover' && (
          <span className="checkbox__img-bleed">
            <img alt="" className="checkbox__img" src={imgCheckedHover} />
          </span>
        )}
        {/* Checked press: image with bleed */}
        {isChecked && state === 'press' && (
          <span className="checkbox__img-bleed">
            <img alt="" className="checkbox__img" src={imgCheckedPress} />
          </span>
        )}
      </span>

      <span className="checkbox__label-group">
        <span className={['checkbox__label', isDisabled ? 'checkbox__label--disabled' : ''].filter(Boolean).join(' ')}>
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