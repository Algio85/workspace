import React, { useState } from 'react';
import { theme } from '../tokens/theme.js';

const SHADOW_MAP = {
  base:    'none',
  raised:  '0px 1px 4px 0px rgba(0,0,0,0.10), 0px 2px 8px 0px rgba(0,0,0,0.10)',
  sticky:  '0px 2px 8px 0px rgba(0,0,0,0.10), 0px 3px 12px 0px rgba(0,0,0,0.10)',
  overlay: '0px 3px 12px 0px rgba(0,0,0,0.10), 0px 4px 16px 0px rgba(0,0,0,0.10)',
  modal:   '0px 2px 8px 0px rgba(0,0,0,0.10), 0px 6px 24px 0px rgba(0,0,0,0.10)',
  toast:   '0px 4px 16px 0px rgba(0,0,0,0.10), 0px 6px 24px 0px rgba(0,0,0,0.10)',
  tooltip: '0px 1px 4px 0px rgba(0,0,0,0.10), 0px 2px 8px 0px rgba(0,0,0,0.10)',
};

const ELEVATION_TOKENS = [
  { name: 'base',    value: 0,   description: 'Default, no stacking',    shadowToken: 'none',      shadow: SHADOW_MAP.base    },
  { name: 'raised',  value: 10,  description: 'Cards, dropdowns',         shadowToken: 'shadow.xs', shadow: SHADOW_MAP.raised  },
  { name: 'sticky',  value: 100, description: 'Sticky headers, toolbars', shadowToken: 'shadow.sm', shadow: SHADOW_MAP.sticky  },
  { name: 'overlay', value: 200, description: 'Overlays, backdrops',      shadowToken: 'shadow.md', shadow: SHADOW_MAP.overlay },
  { name: 'modal',   value: 300, description: 'Modals, dialogs',          shadowToken: 'shadow.lg', shadow: SHADOW_MAP.modal   },
  { name: 'toast',   value: 400, description: 'Notifications, toasts',    shadowToken: 'shadow.xl', shadow: SHADOW_MAP.toast   },
  { name: 'tooltip', value: 500, description: 'Tooltips',                 shadowToken: 'shadow.xs', shadow: SHADOW_MAP.tooltip },
];

function ElevationRow({ name, value, description, shadowToken, shadow }) {
  const [copied, setCopied] = useState(false);
  const tokenName = `elevation.${name}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(tokenName).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    });
  };

  return (
    <div
      onClick={handleCopy}
      title={`Copy: ${tokenName}`}
      style={{
        display: 'grid',
        gridTemplateColumns: '160px 60px 160px 120px 1fr',
        alignItems: 'center',
        gap: theme.spacing.lg,
        padding: `${theme.spacing.md}px ${theme.spacing.md}px`,
        borderRadius: theme.spacing.xxs,
        cursor: 'pointer',
        transition: 'background 0.12s',
        background: copied ? '#f0fdf4' : 'transparent',
        borderBottom: `1px solid ${theme.border.subtle}`,
      }}
      onMouseEnter={e => { if (!copied) e.currentTarget.style.background = theme.bg.hover; }}
      onMouseLeave={e => { if (!copied) e.currentTarget.style.background = copied ? '#f0fdf4' : 'transparent'; }}
    >
      <span style={{ fontFamily: theme.font, fontSize: 11, color: copied ? '#16a34a' : theme.text.subtle, transition: 'color 0.2s' }}>
        {copied ? '✓ copied' : tokenName}
      </span>
      <span style={{ fontFamily: theme.font, fontSize: 11, color: theme.text.subtlest }}>{value}</span>
      <span style={{ fontFamily: theme.font, fontSize: 10, color: theme.text.subtlest }}>{description}</span>
      <span style={{ fontFamily: theme.font, fontSize: 10, color: theme.accent.default }}>{shadowToken}</span>
      <div style={{ display: 'flex', alignItems: 'center', padding: `${theme.spacing.sm}px 0` }}>
        <div style={{
          width: 80, height: 48,
          borderRadius: theme.spacing.xs,
          background: '#ffffff',
          boxShadow: shadow,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontFamily: theme.font, fontSize: 9, color: theme.text.subtlest }}>{value}</span>
        </div>
      </div>
    </div>
  );
}

export function ElevationTokens() {
  return (
    <div style={{ background: theme.bg.page, minHeight: '100vh', padding: `${theme.spacing.xxl}px`, fontFamily: theme.font }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap" />

      <div style={{ marginBottom: theme.spacing.xxl }}>
        <h1 style={{ fontFamily: theme.font, fontSize: 26, fontWeight: 300, color: theme.text.default, letterSpacing: '-0.02em', marginBottom: theme.spacing.xxs }}>
          Elevation
        </h1>
        <p style={{ fontFamily: theme.font, fontSize: 10, color: theme.text.subtlest, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Z-index scale · 7 levels · linked to shadow tokens · click row to copy token name
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '160px 60px 160px 120px 1fr',
        gap: theme.spacing.lg,
        padding: `0 ${theme.spacing.md}px ${theme.spacing.xs}px`,
        borderBottom: `1px solid ${theme.border.default}`,
        marginBottom: 0,
      }}>
        {['Token', 'z-index', 'Use case', 'Shadow', 'Preview'].map(h => (
          <span key={h} style={{ fontFamily: theme.font, fontSize: 9, color: theme.text.subtlest, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</span>
        ))}
      </div>

      {ELEVATION_TOKENS.map(t => (
        <ElevationRow key={t.name} {...t} />
      ))}
    </div>
  );
}

export default ElevationTokens;