import React from 'react';
import { RadioGroup } from '../components/RadioButton/RadioGroup';

const DEFAULT_OPTIONS = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const meta = {
  title: 'Components / RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f5f5f5' },
        { name: 'dark',  value: '#0f0f0f' },
      ],
    },
  },
  argTypes: {
    groupLabel: { control: 'text' },
    required:   { control: 'boolean' },
    showHint:   { control: 'boolean' },
    hint:       { control: 'text' },
  },
  args: {
    groupLabel:   'Group label',
    required:     false,
    showHint:     false,
    hint:         'Hint text',
    options:      DEFAULT_OPTIONS,
    defaultValue: 'option1',
  },
};

export default meta;

export const Default = { name: 'Default' };

export const WithRequired = {
  name: 'With required',
  args: {
    groupLabel:   'Pick an option',
    required:     true,
    options:      DEFAULT_OPTIONS,
    defaultValue: 'option1',
  },
};

export const WithHint = {
  name: 'With hint',
  args: {
    groupLabel:   'Notification frequency',
    showHint:     true,
    hint:         'Choose how often you want to be notified',
    options: [
      { value: 'realtime', label: 'Real-time' },
      { value: 'daily',    label: 'Daily digest' },
      { value: 'weekly',   label: 'Weekly digest' },
      { value: 'never',    label: 'Never' },
    ],
    defaultValue: 'daily',
  },
};

export const WithDisabledOption = {
  name: 'With disabled option',
  args: {
    groupLabel: 'Plan',
    options: [
      { value: 'free',       label: 'Free' },
      { value: 'pro',        label: 'Pro' },
      { value: 'enterprise', label: 'Enterprise', disabled: true },
    ],
    defaultValue: 'free',
  },
};
