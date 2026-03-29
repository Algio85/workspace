import React from 'react';
import { ShadowTokens } from '../components/ShadowTokens';

const meta = {
  title: 'Foundations / Shadows',
  component: ShadowTokens,
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
Shadow tokens use two combined layers per elevation level — a **key light** and an **ambient light** shadow.

- **Key light** — the primary directional light source. Casts the sharpest, most defined shadow. Defines the shape and edge of the element.
- **Ambient light** — a soft, diffused light source. Fills in around the key shadow to create a sense of volume and depth.

Combining both layers produces more realistic, perceptually balanced elevation than a single shadow.

---

### Presets

Developers never reference key and ambient tokens separately. Instead they use a single preset token that applies both layers:

| Token | Preset | Use case |
|---|---|---|
| \`shadow.xs\` | Surface | Cards, panels, surface-level elements |
| \`shadow.sm\` | Non-modal | Dropdowns, tooltips, popovers |
| \`shadow.md\` | Sticky | Sticky headers, floating action bars |
| \`shadow.lg\` | Non-modal sticky | Non-modal elements on sticky surfaces |
| \`shadow.xl\` | Modal | Modals, dialogs, drawers |

---

### Color and opacity

Shadow color is always \`rgb(0 0 0)\` at \`0.08\` opacity in light mode.
The opacity token can be overridden per theme.

Click any row to copy the token name to clipboard.
        `.trim(),
      },
    },
  },
};

export default meta;

export const Default = {
  name: 'Shadow Tokens',
};