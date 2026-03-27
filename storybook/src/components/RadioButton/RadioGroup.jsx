import React, { useState } from 'react';
import { RadioButton } from './RadioButton';
import './RadioGroup.css';

/**
 * RadioGroup — Tao Design System
 *
 * Wraps RadioButton components and manages mutual exclusion.
 * Figma: https://www.figma.com/design/WrV3bhb7Rbkbp5D8sxbMD0/Components?node-id=175-674
 *
 * Props:
 *   groupLabel — label shown above the group
 *   required   — shows (required) marker next to group label
 *   showHint   — shows hint text below the group label
 *   hint       — hint text content
 *   options    — array of { value, label, disabled? }
 *   value      — controlled selected value
 *   defaultValue — uncontrolled default selected value
 *   onChange   — callback(value) when selection changes
 *   name       — HTML name attribute for the radio group
 */

export function RadioGroup({
  groupLabel    = 'Group label',
  required      = false,
  showHint      = false,
  hint          = 'Hint text',
  options       = [],
  value,
  defaultValue,
  onChange,
  name,
  className,
}) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? (options[0]?.value || ''));

  const selectedValue = value !== undefined ? value : internalValue;
  const groupName     = name || `radio-group-${groupLabel.toLowerCase().replace(/\s+/g, '-')}`;

  const handleChange = (optionValue) => {
    if (value === undefined) setInternalValue(optionValue);
    onChange?.(optionValue);
  };

  return (
    <div
      className={['radio-group', className || ''].filter(Boolean).join(' ')}
      role="radiogroup"
      aria-labelledby={`${groupName}-label`}
      aria-required={required}
    >
      {/* Header */}
      <div className="radio-group__header">
        <div className="radio-group__label-row">
          <span
            id={`${groupName}-label`}
            className="radio-group__label"
          >
            {groupLabel}
          </span>
          {required && (
            <span className="radio-group__required" aria-hidden="true">
              (required)
            </span>
          )}
        </div>
        {showHint && (
          <span className="radio-group__hint">{hint}</span>
        )}
      </div>

      {/* Options */}
      <div className="radio-group__options">
        {options.map((option) => (
          <RadioButton
            key={option.value}
            id={`${groupName}-${option.value}`}
            name={groupName}
            value={option.value}
            label={option.label}
            selected={selectedValue === option.value}
            state={option.disabled ? 'disabled' : 'idle'}
            onChange={() => handleChange(option.value)}
          />
        ))}
      </div>
    </div>
  );
}

export default RadioGroup;
