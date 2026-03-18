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
Semantic type styles combining font size, weight and line height into a single token.

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

### How type styles relate to variables

Type styles and variables are **two separate concepts** in Figma, and they are not linked to each other.

The primitive size values (e.g. \`typography/size/xxxl = 33\`) exist as **Variables** in the \`Typography\` collection — raw numbers with no semantic intent attached. They are a lookup table, nothing more.

The composed styles (e.g. \`text/display/bold = { fontSize: 33, fontWeight: 700, lineHeight: 1.1 }\`) exist as **Text Styles** — static definitions with baked-in values. Figma has no variable type for typography composites, so font size, weight, and line height **cannot be bound to a variable** inside a Text Style. The value is copied in at push time, not referenced.

This means the two layers are connected only in the token source files. \`tokens/semantic/typography.json\` is the only place where the full semantic picture exists end-to-end.

> **Practical implication:** if the type scale changes, updating \`tokens/base/typography.json\` alone is not enough. You also need to re-run **Tao plugin → Styles → Push All Styles** to resync the Text Styles in Figma with the new values.

---

### Updating the type scale

1. Go to **Foundations / Typography**
2. Adjust base size and ratio until you're happy
3. Click **Export tokens.json** — copies the JSON to clipboard
4. Paste it into \`tokens/base/typography.json\`
5. Rebuild the plugin bundle: \`node scripts/build-plugin.js\`
6. In Figma, open the Tao plugin → **Styles** tab → **Push All Styles**

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
