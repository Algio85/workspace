import React, { useState } from 'react';
import { theme } from '../tokens/theme.js';

const FONT = theme.font;

const SECTIONS = [
  {
    label:       'Foundations',
    storyId:     'foundations-colors-color-palette--full-palette',
    description: 'Color palettes, spacing, typography, motion, elevation and shadow tokens.',
    count:       '336 variables',
    accent:      theme.accent.default,
  },
  {
    label:       'Icons',
    storyId:     'foundations-icons--default',
    description: 'Phosphor icon library — 1300+ icons across 6 weights with semantic color tokens.',
    count:       '1300+ icons',
    accent:      '#722be1',
  },
  {
    label:       'Components',
    storyId:     'components-badgestatus--default',
    description: 'Production-ready React components bound to Tao tokens.',
    count:       '2 components',
    accent:      '#d71f21',
  },
  {
    label:       'Figma',
    storyId:     'figma-token-pusher--default',
    description: 'Custom plugin for syncing tokens and styles. Desktop Bridge for AI-assisted component building.',
    count:       '2 plugins',
    accent:      '#0d9488',
  },
];

const STATS = [
  { value: '336', label: 'Variables' },
  { value: '27',  label: 'Text styles' },
  { value: '5',   label: 'Effect styles' },
  { value: '11',  label: 'Collections' },
];

const COMMANDS = [
  {
    group: 'Token pipeline',
    items: [
      { cmd: 'npm run build',         desc: 'Generate shades → build tokens → sync to Storybook' },
      { cmd: 'npm run generate-shades', desc: 'Regenerate OKLCH color shades from base colors' },
      { cmd: 'npm run build-tokens',  desc: 'Run StyleDictionary — outputs build/css/tokens.css' },
      { cmd: 'npm run sync-tokens',   desc: 'Copy tokens to storybook/src/tokens/' },
      { cmd: 'npm run build-plugin',  desc: 'Bundle Figma plugin — outputs figma-plugin/ui.html' },
    ],
  },
  {
    group: 'Storybook',
    items: [
      { cmd: 'npm run storybook',          desc: 'Start Storybook on port 6006 (run from root)' },
      { cmd: 'npm run storybook-with-ui',  desc: 'Start Storybook + Story UI MCP server together' },
      { cmd: 'npm run chromatic',          desc: 'Deploy to Chromatic for visual testing' },
    ],
  },
  {
    group: 'Figma',
    items: [
      { cmd: 'npm run pull-from-figma', desc: 'Pull variables from Figma into token files' },
    ],
  },
];

const WORKFLOW = [
  { step: '01', title: 'Edit tokens',      desc: 'Edit files in tokens/base/ or tokens/semantic/' },
  { step: '02', title: 'Build',            desc: 'npm run build — compiles all tokens to CSS + JSON' },
  { step: '03', title: 'Push to Figma',    desc: 'Open Tao Token Pusher plugin → push variables + styles' },
  { step: '04', title: 'Build components', desc: 'Paste Figma link here → Claude generates component + CSS + story' },
  { step: '05', title: 'Commit + deploy',  desc: 'git push → Chromatic deploys automatically via GitHub Actions' },
];

const TOKEN_LAYERS = [
  { layer: 'Primitive', path: 'tokens/base/',      example: '--tao-color-shade-palette-1-8: #2a69f1', desc: 'Raw values — shades, spacing scale, type scale' },
  { layer: 'Semantic',  path: 'tokens/semantic/',  example: '--tao-surface-brand-1-strong: #2a69f1',   desc: 'Contextual meaning — surface, text, border, icon, state' },
  { layer: 'Component', path: 'tokens/components/', example: '--tao-button-primary-background-color',   desc: 'Component-specific tokens (planned)' },
];

function navigate(storyId) {
  try { window.parent.location.search = '?path=/story/' + storyId; }
  catch (e) { window.location.search = '?path=/story/' + storyId; }
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1400);
        });
      }}
      style={{
        all: 'unset',
        cursor: 'pointer',
        fontFamily: FONT,
        fontSize: 10,
        color: copied ? '#16a34a' : theme.text.subtlest,
        padding: '2px 6px',
        borderRadius: 4,
        background: copied ? '#f0fdf4' : theme.bg.surface,
        border: `1px solid ${copied ? '#86efac' : theme.border.subtle}`,
        transition: 'all 0.12s',
        flexShrink: 0,
      }}
    >
      {copied ? '✓' : 'copy'}
    </button>
  );
}

export function Introduction() {
  return (
    <div style={{ background: theme.bg.page, minHeight: '100vh', fontFamily: FONT, color: theme.text.default }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700&display=swap" />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div style={{
        padding: theme.spacing.xxxl + 'px',
        borderBottom: '1px solid ' + theme.border.subtle,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: theme.spacing.xxxl,
        alignItems: 'center',
      }}>
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '3px 10px', borderRadius: 100,
            background: theme.bg.surface, border: '1px solid ' + theme.border.subtle,
            marginBottom: theme.spacing.xl,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: theme.accent.default }} />
            <span style={{ fontFamily: FONT, fontSize: 10, color: theme.text.subtlest, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Alpha</span>
          </div>
          <h1 style={{ fontFamily: FONT, fontSize: 72, fontWeight: 300, lineHeight: 1, letterSpacing: '-0.03em', color: theme.text.default, margin: '0 0 ' + theme.spacing.sm + 'px' }}>
            Tao
          </h1>
          <p style={{ fontFamily: FONT, fontSize: 11, fontWeight: 400, color: theme.text.subtlest, margin: 0, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            Design System
          </p>
        </div>
        <div>
          <p style={{ fontFamily: FONT, fontSize: 16, fontWeight: 300, lineHeight: 1.7, color: theme.text.subtle, margin: '0 0 ' + theme.spacing.lg + 'px' }}>
            A token-based design system where AI is a core part of the workflow —
            not just a tool, but a collaborator. Built with Style Dictionary,
            Figma, React, and Claude.
          </p>
          <div style={{ display: 'flex', gap: theme.spacing.xs, flexWrap: 'wrap' }}>
            {['Style Dictionary', 'Figma', 'React', 'Chromatic', 'OKLCH', 'Phosphor'].map(tag => (
              <span key={tag} style={{
                fontFamily: FONT, fontSize: 10, color: theme.text.subtlest,
                background: theme.bg.surface, border: '1px solid ' + theme.border.subtle,
                borderRadius: 4, padding: '3px 8px', letterSpacing: '0.04em',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: '1px solid ' + theme.border.subtle }}>
        {STATS.map((stat, i) => (
          <div key={stat.label} style={{ padding: theme.spacing.xl + 'px ' + theme.spacing.xxxl + 'px', borderRight: i < STATS.length - 1 ? '1px solid ' + theme.border.subtle : 'none' }}>
            <div style={{ fontFamily: FONT, fontSize: 48, fontWeight: 300, color: theme.text.default, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: theme.spacing.xxs }}>
              {stat.value}
            </div>
            <div style={{ fontFamily: FONT, fontSize: 10, color: theme.text.subtlest, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Section cards ─────────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', borderBottom: '1px solid ' + theme.border.subtle }}>
        {SECTIONS.map((section, i) => (
          <div
            key={section.label}
            onClick={() => navigate(section.storyId)}
            style={{
              padding: theme.spacing.xxl + 'px ' + theme.spacing.xxxl + 'px',
              borderRight: i % 2 === 0 ? '1px solid ' + theme.border.subtle : 'none',
              borderBottom: i < 2 ? '1px solid ' + theme.border.subtle : 'none',
              background: 'transparent', transition: 'background 0.15s',
              position: 'relative', cursor: 'pointer',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = theme.bg.hover; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, width: 2, height: '100%', background: section.accent }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.sm }}>
              <span style={{ fontFamily: FONT, fontSize: 10, color: section.accent, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500 }}>{section.label}</span>
              <span style={{ fontFamily: FONT, fontSize: 10, color: theme.text.subtlest }}>{section.count}</span>
            </div>
            <p style={{ fontFamily: FONT, fontSize: 13, fontWeight: 300, lineHeight: 1.6, color: theme.text.subtle, margin: '0 0 ' + theme.spacing.md + 'px' }}>
              {section.description}
            </p>
            <span style={{ fontFamily: FONT, fontSize: 11, color: section.accent }}>Explore →</span>
          </div>
        ))}
      </div>

      {/* ── Token Architecture ────────────────────────────────────────────── */}
      <div style={{ padding: theme.spacing.xxxl + 'px', borderBottom: '1px solid ' + theme.border.subtle }}>
        <h2 style={{ fontFamily: FONT, fontSize: 11, fontWeight: 500, color: theme.text.subtlest, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: theme.spacing.xl }}>
          Token Architecture
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {TOKEN_LAYERS.map((layer, i) => (
            <div key={layer.layer} style={{
              display: 'grid', gridTemplateColumns: '100px 180px 1fr 1fr',
              alignItems: 'center', gap: theme.spacing.lg,
              padding: theme.spacing.sm + 'px ' + theme.spacing.md + 'px',
              borderBottom: i < TOKEN_LAYERS.length - 1 ? '1px solid ' + theme.border.subtle : 'none',
            }}>
              <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 500, color: theme.text.default }}>{layer.layer}</span>
              <span style={{ fontFamily: FONT, fontSize: 10, color: theme.text.subtlest, fontFamily: 'monospace' }}>{layer.path}</span>
              <span style={{ fontFamily: 'monospace', fontSize: 10, color: theme.accent.default, background: theme.bg.surface, padding: '2px 6px', borderRadius: 3 }}>{layer.example}</span>
              <span style={{ fontFamily: FONT, fontSize: 11, color: theme.text.subtle }}>{layer.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Workflow ──────────────────────────────────────────────────────── */}
      <div style={{ padding: theme.spacing.xxxl + 'px', borderBottom: '1px solid ' + theme.border.subtle }}>
        <h2 style={{ fontFamily: FONT, fontSize: 11, fontWeight: 500, color: theme.text.subtlest, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: theme.spacing.xl }}>
          Workflow
        </h2>
        <div style={{ display: 'flex', gap: 0, alignItems: 'flex-start' }}>
          {WORKFLOW.map((step, i) => (
            <div key={step.step} style={{ flex: 1, paddingRight: theme.spacing.lg, borderRight: i < WORKFLOW.length - 1 ? '1px solid ' + theme.border.subtle : 'none', paddingLeft: i > 0 ? theme.spacing.lg : 0 }}>
              <div style={{ fontFamily: FONT, fontSize: 10, color: theme.text.subtlest, letterSpacing: '0.08em', marginBottom: theme.spacing.xs }}>{step.step}</div>
              <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 500, color: theme.text.default, marginBottom: theme.spacing.xxs }}>{step.title}</div>
              <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 300, lineHeight: 1.5, color: theme.text.subtle }}>{step.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Commands ──────────────────────────────────────────────────────── */}
      <div style={{ padding: theme.spacing.xxxl + 'px', borderBottom: '1px solid ' + theme.border.subtle }}>
        <h2 style={{ fontFamily: FONT, fontSize: 11, fontWeight: 500, color: theme.text.subtlest, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: theme.spacing.xl }}>
          Commands
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: theme.spacing.xxl }}>
          {COMMANDS.map(group => (
            <div key={group.group}>
              <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 500, color: theme.text.subtlest, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: theme.spacing.sm }}>
                {group.group}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.xs }}>
                {group.items.map(item => (
                  <div key={item.cmd} style={{
                    padding: theme.spacing.sm + 'px',
                    background: theme.bg.surface,
                    borderRadius: theme.spacing.xs,
                    border: '1px solid ' + theme.border.subtle,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: theme.spacing.xs, marginBottom: 4 }}>
                      <code style={{ fontFamily: 'monospace', fontSize: 11, color: theme.accent.default }}>{item.cmd}</code>
                      <CopyButton text={item.cmd} />
                    </div>
                    <div style={{ fontFamily: FONT, fontSize: 11, color: theme.text.subtlest, lineHeight: 1.4 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <div style={{
        padding: theme.spacing.lg + 'px ' + theme.spacing.xxxl + 'px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontFamily: FONT, fontSize: 10, color: theme.text.subtlest, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Tao Design System</span>
        <span style={{ fontFamily: FONT, fontSize: 10, color: theme.text.subtlest }}>React · Style Dictionary · Figma · Chromatic</span>
      </div>
    </div>
  );
}

export default Introduction;