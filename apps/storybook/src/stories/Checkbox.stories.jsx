import React from 'react';
import { Checkbox } from '../components/Checkbox/Checkbox';

const meta = {
  title: 'Components / Checkbox',
  component: Checkbox,
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
        component: `
Checkbox — 2 checked states × 4 interaction states = 8 Figma variants.

[Figma →](https://www.figma.com/design/WrV3bhb7Rbkbp5D8sxbMD0/Components?node-id=175-338)
        `.trim(),
      },
    },
  },
  argTypes: {
    checked:  { control: 'boolean' },
    state:    { control: 'select', options: ['idle', 'hover', 'press', 'disabled'] },
    label:    { control: 'text' },
    required: { control: 'boolean' },
  },
  args: {
    checked:  false,
    state:    'idle',
    label:    'Label',
    required: false,
  },
};

export default meta;

export const Default = { name: 'Default' };

export const Interactive = {
  name: 'Interactive',
  render: () => {
    const [checked, setChecked] = React.useState(false);
    return (
      <Checkbox
        checked={checked}
        label="Click to toggle"
        onChange={() => setChecked(c => !c)}
      />
    );
  },
};

export const WithRequired = {
  name: 'With required',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Checkbox label="Accept terms" required />
      <Checkbox label="Subscribe" required checked />
    </div>
  ),
};

export const AllStates = {
  name: 'All states',
  render: () => {
    const states = ['idle', 'hover', 'press', 'disabled'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {[false, true].map(checked => (
          <div key={String(checked)}>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 10, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
              {checked ? 'Checked' : 'Unchecked'}
            </p>
            <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
              {states.map(state => (
                <Checkbox key={state} checked={checked} state={state} label={state} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
