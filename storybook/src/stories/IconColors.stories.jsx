import React from 'react';
import { IconColors } from '../components/IconColors';

const meta = {
  title: 'Foundations / Icons / Icon Colors',
  component: IconColors,
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
Semantic icon color tokens for the Tao design system.

Icons use the same semantic color tokens as text — \`text.*\` tokens apply directly to icon fills via \`color\` prop or CSS \`currentColor\`.

---

### Usage

\`\`\`jsx
import { WarningIcon } from '@phosphor-icons/react';

// Using a semantic token via CSS currentColor
<span style={{ color: 'var(--tao-text-danger)' }}>
  <WarningIcon size={20} weight="fill" color="currentColor" />
</span>

// Or passing the token value directly
<WarningIcon size={20} weight="fill" color="var(--tao-text-danger)" />
\`\`\`

### Token reference

| Token | Use case |
|---|---|
| \`text.default\` | Primary icons, default state |
| \`text.subtle\` | Secondary icons, supporting UI |
| \`text.subtlest\` | Placeholder, disabled icons |
| \`text.inverse\` | Icons on dark backgrounds |
| \`text.brand-1\` | Brand 1 colored icons |
| \`text.brand-2\` | Brand 2 colored icons |
| \`text.brand-3\` | Brand 3 colored icons |
| \`text.success\` | Success state icons |
| \`text.danger\` | Error / destructive icons |
| \`text.alert\` | Warning icons |
| \`text.info\` | Info icons |
| \`text.news\` | News icons |
| \`text.ai\` | AI-generated content icons |

Toggle weight per row to preview how thin, regular, bold, and fill weights look across each color.

Click any token name to copy it to clipboard.
        `.trim(),
      },
    },
  },
};

export default meta;

export const Default = {
  name: 'Icon Colors',
};
