import React, { useState } from 'react';
import { theme } from '../tokens/theme.js';

const OPACITY_TOKENS = [
  { name: '0',   value: 0,    description: 'Fully transparent' },
  { name: '8',   value: 0.08, description: 'Hover overlays' },
  { name: '12',  value: 0.12, description: 'Selected states' },
  { name: '16',  value: 0.16, description: 'Active/pressed' },
  { name: '24',  value: 0.24, description: 'Disabled borders' },
  { name: '32',  value: 0.32, description: 'Disabled backgrounds' },
  { name: '48',  value: 0.48, description: 'Medium overlays' },
  { name: '64',  value: 0.64, description: 'Strong overlays' },
  { name: '80',  value: 0.80, description: 'Near opaque' },
  { name: '100', value: 1,    description: 'Fully opaque' },
];

function OpacityRow({ name, value, description }) {
  const [copied, setCopied] = useState(false);
  const tokenName = `opacity.${name}`;

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
        gridTemplateColumns: '120px 60px 200px 1fr',
        alignItems: 'center',
        gap: theme.spacing.lg,
        padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
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

      <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
        {/* Opacity on color */}
        <div style={{
          width: 48, height: 32,
          borderRadius: theme.spacing.xxs,
          background: `rgba(37, 99, 235, ${value})`,
          border: `1px solid ${theme.border.subtle}`,
        }} />
        {/* Opacity on dark */}
        <div style={{
          width: 48, height: 32,
          borderRadius: theme.spacing.xxs,
          background: `rgba(0, 0, 0, ${value})`,
          border: `1px solid ${theme.border.subtle}`,
        }} />
        {/* Opacity bar */}
        <div style={{
          flex: 1, height: 12,
          borderRadius: theme.spacing.xxs,
          background: `linear-gradient(to right, transparent, rgba(37, 99, 235, ${value}))`,
          border: `1px solid ${theme.border.subtle}`,
        }} />
      </div>
    </div>
  );
}

export function OpacityScale() {
  return (
    <div style={{ background: theme.bg.page, minHeight: '100vh', padding: `${theme.spacing.xxl}px`, fontFamily: theme.font }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap" />

      <div style={{ marginBottom: theme.spacing.xxl }}>
        <h1 style={{ fontFamily: theme.font, fontSize: 26, fontWeight: 300, color: theme.text.default, letterSpacing: '-0.02em', marginBottom: theme.spacing.xxs }}>
          Opacity Scale
        </h1>
        <p style={{ fontFamily: theme.font, fontSize: 10, color: theme.text.subtlest, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          10 steps · used for overlays and state layers · click row to copy token name
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '120px 60px 200px 1fr',
        gap: theme.spacing.lg,
        padding: `0 ${theme.spacing.md}px ${theme.spacing.xs}px`,
        borderBottom: `1px solid ${theme.border.default}`,
        marginBottom: 0,
      }}>
        {['Token', 'Value', 'Use case', 'Preview'].map(h => (
          <span key={h} style={{ fontFamily: theme.font, fontSize: 9, color: theme.text.subtlest, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</span>
        ))}
      </div>

      {OPACITY_TOKENS.map(({ name, value, description }) => (
        <OpacityRow key={name} name={name} value={value} description={description} />
      ))}
    </div>
  );
}

export default OpacityScale;