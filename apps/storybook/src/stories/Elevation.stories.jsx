import React from 'react';
import { ElevationTokens } from '../components/ElevationTokens';

const meta = {
  title: 'Foundations / Elevation',
  component: ElevationTokens,
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
Elevation tokens define the z-index stacking order for UI layers.

| Token | z-index | Use case |
|---|---|---|
| \`elevation.base\` | 0 | Default, no stacking context |
| \`elevation.raised\` | 10 | Cards, dropdowns, popovers |
| \`elevation.sticky\` | 100 | Sticky headers, floating toolbars |
| \`elevation.overlay\` | 200 | Overlays, backdrops |
| \`elevation.modal\` | 300 | Modals, dialogs, drawers |
| \`elevation.toast\` | 400 | Notifications, toasts, snackbars |
| \`elevation.tooltip\` | 500 | Tooltips |

---

### Usage

\`\`\`css
/* Card */
z-index: var(--tao-elevation-raised);

/* Sticky header */
z-index: var(--tao-elevation-sticky);

/* Modal */
z-index: var(--tao-elevation-modal);

/* Toast notification */
z-index: var(--tao-elevation-toast);
\`\`\`

Click any row to copy the token name to clipboard.
        `.trim(),
      },
    },
  },
};

export default meta;

export const Default = {
  name: 'Elevation',
};