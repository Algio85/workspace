import React, { useState } from 'react';
import { theme } from '../tokens/theme.js';
import { resolveTokens } from '../tokens/resolve.js';
import textTokens from '../tokens/semantic/text.json';
import shades from '../tokens/shades.json';
import {
  ArrowRightIcon,
  WarningIcon,
  CheckCircleIcon,
  InfoIcon,
  StarIcon,
  HeartIcon,
  BellIcon,
  MagnifyingGlassIcon,
} from '@phosphor-icons/react';

const resolved = resolveTokens(textTokens, '', shades);

// Representative icons — one per semantic category feel
const ICONS = [
  { Icon: ArrowRightIcon,       label: 'ArrowRight' },
  { Icon: WarningIcon,          label: 'Warning' },
  { Icon: CheckCircleIcon,      label: 'CheckCircle' },
  { Icon: InfoIcon,             label: 'Info' },
  { Icon: StarIcon,             label: 'Star' },
  { Icon: HeartIcon,            label: 'Heart' },
  { Icon: BellIcon,             label: 'Bell' },
  { Icon: MagnifyingGlassIcon,  label: 'MagnifyingGlass' },
];

const TOKENS = [
  { name: 'default',  group: 'Neutral' },
  { name: 'subtle',   group: 'Neutral' },
  { name: 'subtlest', group: 'Neutral' },
  { name: 'inverse',  group: 'Neutral' },
  { name: 'brand-1',  group: 'Role' },
  { name: 'brand-2',  group: 'Role' },
  { name: 'brand-3',  group: 'Role' },
  { name: 'success',  group: 'Role' },
  { name: 'danger',   group: 'Role' },
  { name: 'alert',    group: 'Role' },
  { name: 'info',     group: 'Role' },
  { name: 'news',     group: 'Role' },
  { name: 'ai',       group: 'Role' },
];

const WEIGHTS = ['regular', 'bold', 'fill'];

function IconRow({ name }) {
  const [copied, setCopied] = useState(false);
  const [weight, setWeight] = useState('regular');
  const tokenName = `text.${name}`;
  const value = resolved[tokenName];
  const isInverse = name === 'inverse';

  const handleCopy = () => {
    navigator.clipboard?.writeText(tokenName).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    });
  };

  return (
    <div
      title={`Copy: ${tokenName}`}
      style={{
        display: 'grid',
        gridTemplateColumns: '160px 140px 1fr',
        alignItems: 'center',
        gap: theme.spacing.lg,
        padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
        borderRadius: theme.spacing.xs,
        transition: 'background 0.12s',
        background: copied ? '#f0fdf4' : 'transparent',
        borderBottom: `1px solid ${theme.border.subtle}`,
      }}
    >
      {/* Token name — click to copy */}
      <span
        onClick={handleCopy}
        style={{ fontFamily: theme.font, fontSize: 11, color: copied ? '#16a34a' : theme.text.subtle, transition: 'color 0.2s', cursor: 'pointer' }}
      >
        {copied ? '✓ copied' : tokenName}
      </span>

      {/* Color swatch + hex */}
      <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.xs }}>
        <div style={{
          width: 24, height: 24, borderRadius: theme.spacing.xs,
          background: value,
          border: `1px solid ${theme.border.subtle}`,
          flexShrink: 0,
        }} />
        <span style={{ fontFamily: theme.font, fontSize: 10, color: theme.text.subtlest }}>{value}</span>
      </div>

      {/* Icon preview */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing.md,
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.spacing.xs,
        background: isInverse ? theme.text.default : theme.bg.raised,
        border: `1px solid ${theme.border.subtle}`,
      }}>
        {/* Weight selector */}
        <div style={{ display: 'flex', gap: 4, marginRight: theme.spacing.xs }}>
          {WEIGHTS.map(w => (
            <button
              key={w}
              onClick={() => setWeight(w)}
              style={{
                all: 'unset',
                cursor: 'pointer',
                padding: '1px 6px',
                borderRadius: 3,
                fontFamily: theme.font,
                fontSize: 9,
                background: weight === w ? value : 'transparent',
                color: weight === w
                  ? (isInverse ? theme.text.default : theme.bg.page)
                  : (isInverse ? theme.bg.surface : theme.text.subtlest),
                border: `1px solid ${weight === w ? value : theme.border.subtle}`,
                transition: 'all 0.1s',
                letterSpacing: '0.04em',
              }}
            >
              {w}
            </button>
          ))}
        </div>

        {/* Icons */}
        {ICONS.map(({ Icon, label }) => (
          <Icon
            key={label}
            size={20}
            weight={weight}
            color={value}
          />
        ))}
      </div>
    </div>
  );
}

export function IconColors() {
  const groups = [...new Set(TOKENS.map(t => t.group))];

  return (
    <div style={{ background: theme.bg.page, minHeight: '100vh', padding: `${theme.spacing.xxl}px ${theme.spacing.xxl}px`, fontFamily: theme.font }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap" />

      <div style={{ marginBottom: theme.spacing.xxl }}>
        <h1 style={{ fontFamily: theme.font, fontSize: 26, fontWeight: 300, color: theme.text.default, letterSpacing: '-0.02em', marginBottom: theme.spacing.xxs }}>
          Icon Colors
        </h1>
        <p style={{ fontFamily: theme.font, fontSize: 10, color: theme.text.subtlest, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Semantic icon color tokens · click token name to copy · toggle weight per row
        </p>
      </div>

      {groups.map(group => (
        <div key={group} style={{ marginBottom: theme.spacing.xxl }}>
          <div style={{
            padding: `${theme.spacing.xxs}px ${theme.spacing.md}px`,
            background: theme.bg.surface,
            borderRadius: theme.spacing.xs,
            display: 'inline-block',
            marginBottom: theme.spacing.xs,
          }}>
            <span style={{ fontFamily: theme.font, fontSize: 9, color: theme.text.subtlest, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{group}</span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '160px 140px 1fr',
            gap: theme.spacing.lg,
            padding: `0 ${theme.spacing.md}px ${theme.spacing.xs}px`,
            borderBottom: `1px solid ${theme.border.default}`,
            marginBottom: 0,
          }}>
            {['Token', 'Value', 'Preview'].map(h => (
              <span key={h} style={{ fontFamily: theme.font, fontSize: 9, color: theme.text.subtlest, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</span>
            ))}
          </div>

          {TOKENS.filter(t => t.group === group).map(({ name }) => (
            <IconRow key={name} name={name} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default IconColors;
