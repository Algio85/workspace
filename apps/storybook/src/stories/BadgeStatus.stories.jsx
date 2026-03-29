import React from 'react';
import { BadgeStatus } from '../components/BadgeStatus/BadgeStatus';
import { WarningIcon, CheckCircleIcon, InfoIcon, StarIcon } from '@phosphor-icons/react';

const meta = {
  title: 'Components / Badge Status',
  component: BadgeStatus,
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
Badge Status is a compact label component used to communicate status, category, or metadata at a glance.

9 semantic color variants, optional icon left/right, editable label.

---

### Variants

| Color | Surface token | Text token | Use case |
|---|---|---|---|
| \`neutral\` | \`surface/neutral/subtle\` | \`text/default\` | Default, inactive |
| \`brand-1\` | \`surface/brand-1/subtlest\` | \`text/brand-1\` | Primary brand |
| \`brand-2\` | \`surface/brand-2/subtlest\` | \`text/brand-2\` | Secondary brand |
| \`brand-3\` | \`surface/brand-3/subtlest\` | \`text/brand-3\` | Tertiary brand |
| \`success\` | \`surface/news/subtlest\` | \`text/news\` | Success, positive |
| \`danger\` | \`surface/danger/subtlest\` | \`text/danger\` | Error, destructive |
| \`alert\` | \`surface/alert/subtlest\` | \`text/alert\` | Warning |
| \`info\` | \`surface/info/subtlest\` | \`text/info\` | Informational |
| \`ai\` | \`surface/ai/subtlest\` | \`text/ai\` | AI-generated content |

### Figma
Component: [Components → Badge Status](https://www.figma.com/design/WrV3bhb7Rbkbp5D8sxbMD0/Components?node-id=118-448)
        `.trim(),
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['neutral', 'brand-1', 'brand-2', 'brand-3', 'success', 'danger', 'alert', 'info', 'ai'],
      description: 'Semantic color variant',
      table: { defaultValue: { summary: 'neutral' } },
    },
    label: {
      control: 'text',
      description: 'Badge label text',
      table: { defaultValue: { summary: 'Label' } },
    },
    iconLeft: {
      control: 'boolean',
      description: 'Show icon on the left',
      table: { defaultValue: { summary: false } },
    },
    iconRight: {
      control: 'boolean',
      description: 'Show icon on the right',
      table: { defaultValue: { summary: false } },
    },
  },
  args: {
    color: 'neutral',
    label: 'Label',
    iconLeft: false,
    iconRight: false,
  },
};

export default meta;

// ─── Default ──────────────────────────────────────────────────────────────────

const IconPlaceholder = ({ size = 11 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="currentColor">
    <path d="M6 0l1.5 4.5H12L8.25 7.5 9.75 12 6 9 2.25 12l1.5-4.5L0 4.5h4.5z" />
  </svg>
);

export const Default = {
  name: 'Default',
  render: (args) => (
    <BadgeStatus
      {...args}
      iconLeft={args.iconLeft ? <IconPlaceholder /> : null}
      iconRight={args.iconRight ? <IconPlaceholder /> : null}
    />
  ),
};

// ─── All variants ─────────────────────────────────────────────────────────────

export const AllVariants = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      {['neutral', 'brand-1', 'brand-2', 'brand-3', 'success', 'danger', 'alert', 'info', 'ai'].map(color => (
        <BadgeStatus key={color} color={color} label={color} />
      ))}
    </div>
  ),
};

// ─── With icons ───────────────────────────────────────────────────────────────

export const WithIcons = {
  args: {
    iconRight: true,
    iconLeft: true
  },
  name:'With icons',
  render:() => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <BadgeStatus color="success"  label="Completed"  iconLeft={<CheckCircleIcon size={11} weight="fill" />} />
        <BadgeStatus color="danger"   label="Failed"     iconLeft={<WarningIcon size={11} weight="fill" />} />
        <BadgeStatus color="info"     label="Info"       iconLeft={<InfoIcon size={11} weight="fill" />} />
        <BadgeStatus color="ai"       label="AI"         iconLeft={<StarIcon size={11} weight="fill" />} />
        <BadgeStatus color="neutral"  label="Draft"      iconRight={<InfoIcon size={11} weight="regular" />} />
        <BadgeStatus color="brand-1"  label="Active"     iconLeft={<CheckCircleIcon size={11} weight="regular" />} iconRight={<StarIcon size={11} weight="regular" />} />
      </div>
    </div>
  )
};

// ─── Full matrix ──────────────────────────────────────────────────────────────

export const FullMatrix = {
  name: 'Full matrix',
  parameters: { layout: 'fullscreen' },
  render: () => {
    const variants = ['neutral', 'brand-1', 'brand-2', 'brand-3', 'success', 'danger', 'alert', 'info', 'ai'];
    const labelStyle = { fontSize: 10, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'DM Sans, sans-serif', minWidth: 80 };
    return (
      <div style={{ padding: 32, background: '#f5f5f5', minHeight: '100vh', fontFamily: 'DM Sans, sans-serif' }}>
        <h2 style={{ fontSize: 13, fontWeight: 500, color: '#111', marginBottom: 24, letterSpacing: '-0.01em' }}>Badge Status — full matrix</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {variants.map(color => (
            <div key={color} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={labelStyle}>{color}</span>
              <BadgeStatus color={color} label="Label" />
              <BadgeStatus color={color} label="With icon L" iconLeft={<StarIcon size={11} weight="fill" />} />
              <BadgeStatus color={color} label="With icon R" iconRight={<StarIcon size={11} weight="fill" />} />
            </div>
          ))}
        </div>
      </div>
    );
  },
};
