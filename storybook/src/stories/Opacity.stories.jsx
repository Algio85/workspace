import React from 'react';
import { OpacityScale } from '../components/OpacityScale';

const meta = {
  title: 'Foundations / Opacity',
  component: OpacityScale,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
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
Opacity scale tokens used for overlays, state layers, and transparency effects.

| Token | Value | Use case |
|---|---|---|
| \`opacity.0\` | 0 | Fully transparent |
| \`opacity.8\` | 0.08 | Hover overlays |
| \`opacity.12\` | 0.12 | Selected states |
| \`opacity.16\` | 0.16 | Active/pressed states |
| \`opacity.24\` | 0.24 | Disabled borders |
| \`opacity.32\` | 0.32 | Disabled backgrounds |
| \`opacity.48\` | 0.48 | Medium overlays |
| \`opacity.64\` | 0.64 | Strong overlays |
| \`opacity.80\` | 0.80 | Near opaque |
| \`opacity.100\` | 1 | Fully opaque |

---

### Usage with states

Opacity tokens are combined with color tokens to create state layers:

\`\`\`css
/* Hover state */
background: rgb(from var(--tao-color-shade-palette-11-1) r g b / var(--tao-opacity-8));

/* Selected state */
background: rgb(from var(--tao-color-shade-palette-1-1) r g b / var(--tao-opacity-12));
\`\`\`

Click any row to copy the token name to clipboard.
        `.trim(),
      },
    },
  },
};

export default meta;

export const Default = {
  name: 'Opacity Scale',
};