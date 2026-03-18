import React from 'react';
import { TypeStyles } from '../components/TypeStyles';

const meta = {
  title: 'Foundations / Typography / Type Styles',
  component: TypeStyles,
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
Semantic type styles combining font size, weight, and line height into a single token.

9 styles × 3 weights = 27 tokens total.

| Style | Size | Use case |
|---|---|---|
| \`display\` | 33px | Hero headings, marketing |
| \`title-1\` | 28px | Page titles |
| \`title-2\` | 23px | Section headings |
| \`title-3\` | 19px | Sub-section headings |
| \`title-4\` | 16px | Card titles, panel headings |
| \`body\` | 16px | Default body text |
| \`body-sm\` | 13px | Secondary body text |
| \`label\` | 13px | UI labels, form labels |
| \`label-sm\` | 11px | Captions, helper text |

Each style has 3 weights: **light** (300), **regular** (400), **bold** (700).

---

### Variables vs Text Styles in Figma

Typography exists as two separate artifacts in Figma — Variables and Text Styles — and they are not linked to each other.

The primitive size values (e.g. \`typography/size/xxxl = 33\`) are pushed as **Variables** in the Typography collection. They are raw numbers with no semantic intent — a lookup table for dimensions, nothing more.

The composed styles (e.g. \`text/display/bold\`) are pushed as **Text Styles** with baked-in values for font size, weight, and line height. Figma has no variable type for typography composites, so these properties cannot be bound to a variable inside a Text Style. The value is resolved and copied in at push time, not referenced.

The only place where the full semantic picture exists end-to-end is the token source file: \`tokens/semantic/typography.json\`.

> If the type scale changes, updating \`tokens/base/typography.json\` alone is not enough. You also need to re-run **Tao Token Pusher → Styles → Push All Styles** to resync the Text Styles in Figma.

Click any row to copy the token name to clipboard.
        `.trim(),
      },
    },
  },
};

export default meta;

export const Default = {
  name: 'Type Styles',
};
