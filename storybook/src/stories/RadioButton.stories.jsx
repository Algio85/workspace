import React from 'react';
import { RadioButton } from '../components/RadioButton/RadioButton';

const meta = {
  title: 'Components / RadioButton',
  component: RadioButton,
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
    docs: {
      description: {
        component: 'Single radio button — use RadioGroup to manage mutual exclusion between multiple options.\n\n[Figma](https://www.figma.com/design/WrV3bhb7Rbkbp5D8sxbMD0/Components?node-id=175-586)',
      },
    },
  },
  argTypes: {
    selected: { control: 'boolean' },
    state:    { control: 'select', options: ['idle', 'hover', 'press', 'disabled'] },
    label:    { control: 'text' },
    required: { control: 'boolean' },
  },
  args: {
    selected: false,
    state:    'idle',
    label:    'Label',
    required: false,
  },
};

export default meta;

export const Default = { name: 'Default' };

export const Selected = {
  name: 'Selected',
  args: { selected: true, label: 'Selected option' },
};

export const WithRequired = {
  name: 'With required',
  args: { label: 'Accept terms', required: true },
};

export const AllStates = {
  name: 'All states',
  render: () => {
    const states = ['idle', 'hover', 'press', 'disabled'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {[false, true].map(selected => (
          <div key={String(selected)}>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 10, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
              {selected ? 'Selected' : 'Unselected'}
            </p>
            <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
              {states.map(state => (
                <RadioButton key={state} selected={selected} state={state} label={state} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
