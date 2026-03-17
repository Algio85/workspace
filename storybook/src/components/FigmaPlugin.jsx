import React from 'react';
import { theme } from '../tokens/theme.js';

const FONT = theme.font;

const COLLECTIONS = [
  { file: 'tokens/base/shades.json',       collection: 'Colors/Shades',     description: 'All 16 shades per palette + brand tokens' },
  { file: 'tokens/base/spacing.json',      collection: 'Spacing',           description: 'Spacing scale — 8 steps' },
  { file: 'tokens/base/borders.json',      collection: 'Borders',           description: 'Border radius and border width' },
  { file: 'tokens/base/typography.json',   collection: 'Typography',        description: 'Type scale — size and config' },
  { file: 'tokens/base/opacity.json',      collection: 'Opacity',           description: 'Opacity scale — 10 steps' },
  { file: 'tokens/base/motion.json',       collection: 'Motion',            description: 'Duration and easing tokens' },
  { file: 'tokens/base/elevation.json',    collection: 'Elevation',         description: 'Z-index scale' },
  { file: 'tokens/semantic/surfaces.json', collection: 'Semantic/Surfaces', description: 'Surface color tokens' },
  { file: 'tokens/semantic/text.json',     collection: 'Semantic/Text',     description: 'Text color tokens' },
  { file: 'tokens/semantic/borders.json',  collection: 'Semantic/Borders',  description: 'Border color tokens' },
  { file: 'tokens/semantic/states.json',   collection: 'Semantic/States',   description: 'Interactive state tokens' },
];

function Step({ number, title, detail }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: theme.spacing.md, padding: theme.spacing.xs + 'px 0' }}>
      <div style={{
        width: 24, height: 24, borderRadius: '50%',
        background: theme.accent.default,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, marginTop: 2,
      }}>
        <span style={{ fontFamily: FONT, fontSize: 11, color: theme.text.inverse, fontWeight: 600 }}>{number}</span>
      </div>
      <div>
        <div style={{ fontFamily: FONT, fontSize: 13, color: theme.text.default, fontWeight: 500 }}>{title}</div>
        {detail && (
          <div style={{ fontFamily: FONT, fontSize: 11, color: theme.text.subtlest, marginTop: 2 }}>
            <code style={{ fontFamily: 'monospace', color: theme.accent.default, background: theme.bg.surface, padding: '1px 4px', borderRadius: 3 }}>{detail}</code>
          </div>
        )}
      </div>
    </div>
  );
}

function CollectionRow({ file, collection, description }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '240px 160px 1fr',
      alignItems: 'center',
      gap: theme.spacing.lg,
      padding: theme.spacing.sm + 'px ' + theme.spacing.md + 'px',
      borderBottom: '1px solid ' + theme.border.subtle,
    }}>
      <code style={{ fontFamily: 'monospace', fontSize: 11, color: theme.accent.default }}>{file}</code>
      <span style={{ fontFamily: FONT, fontSize: 11, color: theme.text.default, fontWeight: 500 }}>{collection}</span>
      <span style={{ fontFamily: FONT, fontSize: 11, color: theme.text.subtlest }}>{description}</span>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 style={{
      fontFamily: FONT, fontSize: 16, fontWeight: 500,
      color: theme.text.default,
      marginBottom: theme.spacing.md,
      paddingBottom: theme.spacing.xs,
      borderBottom: '1px solid ' + theme.border.subtle,
    }}>
      {children}
    </h2>
  );
}

function InfoBox({ children }) {
  return (
    <div style={{
      padding: theme.spacing.sm + 'px ' + theme.spacing.md + 'px',
      background: theme.bg.surface,
      borderRadius: theme.spacing.xs,
      border: '1px solid ' + theme.border.subtle,
      fontFamily: FONT, fontSize: 12,
      color: theme.text.subtle,
      marginTop: theme.spacing.md,
    }}>
      {children}
    </div>
  );
}

function FigmaPlugin() {
  return (
    <div style={{ background: theme.bg.page, minHeight: '100vh', padding: theme.spacing.xxl + 'px', fontFamily: FONT }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap" />

      <div style={{ marginBottom: theme.spacing.xxl }}>
        <h1 style={{ fontFamily: FONT, fontSize: 26, fontWeight: 300, color: theme.text.default, letterSpacing: '-0.02em', marginBottom: theme.spacing.xxs }}>
          Figma Token Pusher
        </h1>
        <p style={{ fontFamily: FONT, fontSize: 10, color: theme.text.subtlest, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Sync design tokens between code and Figma variables
        </p>
      </div>

      <section style={{ marginBottom: theme.spacing.xxl }}>
        <SectionTitle>Install the plugin</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.xs }}>
          <Step number="1" title="Open Figma desktop app" />
          <Step number="2" title="Go to Plugins → Development → Import plugin from manifest" />
      <Step number="3" title="Select the manifest file" detail="figma-plugin/manifest.json" />
          <Step number="4" title="Run the plugin" detail="Plugins → Development → Tao Token Pusher" />
        </div>
        <InfoBox>
          The plugin is a local development plugin — it only works on your machine. To share it with your team you need to publish it to the Figma community or share the plugin folder directly.
        </InfoBox>
      </section>

      <section style={{ marginBottom: theme.spacing.xxl }}>
        <SectionTitle>Push tokens to Figma</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.xs }}>
          <Step number="1" title="Run the build script to bundle tokens into the plugin" detail="npm run build-plugin" />
          <Step number="2" title="Open the plugin in Figma" />
          <Step number="3" title="Select the token collections you want to push" />
          <Step number="4" title="Click Push selected to Figma" />
        </div>
  <InfoBox>
          Every variable will have its CSS code syntax set automatically — in Dev Mode developers will see var(--tao-...) for every token. Descriptions from the token files are also pushed as variable descriptions in Figma.
        </InfoBox>
      </section>

      <section style={{ marginBottom: theme.spacing.xxl }}>
        <SectionTitle>When to rebuild the plugin bundle</SectionTitle>
        <p style={{ fontFamily: FONT, fontSize: 13, color: theme.text.subtle, lineHeight: 1.6, marginBottom: theme.spacing.md }}>
          Run npm run build-plugin every time you add or modify token values, add new token files, or run npm run generate-shades.
        </p>
      </section>

      <section style={{ marginBottom: theme.spacing.xxl }}>
        <SectionTitle>Token files to Figma collections</SectionTitle>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '240px 160px 1fr',
          gap: theme.spacing.lg,
          padding: '0 ' + theme.spacing.md + 'px ' + theme.spacing.xs + 'px',
          borderBottom: '1px solid ' + theme.border.default,
          marginBottom: 0,
        }}>
          {['Token file', 'Collection name', 'Contents'].map(function(h) {
            return <span key={h} style={{ fontFamily: FONT, fontSize: 9, color: theme.text.subtlest, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</span>;
          })}
        </div>
        {COLLECTIONS.map(function(c) {
          return <CollectionRow key={c.file} file={c.file} collection={c.collection} description={c.description} />;
        })}
      </section>

      <section>
        <SectionTitle>Full Code to Figma workflow</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.xs }}>
          <Step number="1" title="Edit token JSON files" detail="tokens/base/ or tokens/semantic/" />
          <Step number="2" title="Regenerate color shades" detail="npm run generate-shades" />
          <Step number="3" title="Build CSS and JS output" detail="npm run build-tokens" />
          <Step number="4" title="Rebuild the plugin bundle" detail="npm run build-plugin" />
          <Step number="5" title="Push to Figma using the plugin" />
          <Step number="6" title="Designers apply variables to components in Figma" />
          <Step number="7" title="Developers inspect in Dev Mode and see var(--tao-...) for every token" />
        </div>
      </section>
    </div>
  );
}

export default FigmaPlugin;
