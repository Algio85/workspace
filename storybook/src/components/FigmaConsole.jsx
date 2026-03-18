import React from 'react';
import { theme } from '../tokens/theme.js';

const FONT = theme.font;

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

function CapabilityRow({ capability, description }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '200px 1fr',
      alignItems: 'flex-start',
      gap: theme.spacing.lg,
      padding: theme.spacing.sm + 'px ' + theme.spacing.md + 'px',
      borderBottom: '1px solid ' + theme.border.subtle,
    }}>
      <span style={{ fontFamily: FONT, fontSize: 12, color: theme.text.default, fontWeight: 500 }}>{capability}</span>
      <span style={{ fontFamily: FONT, fontSize: 12, color: theme.text.subtlest }}>{description}</span>
    </div>
  );
}

function FigmaConsole() {
  return (
    <div style={{ background: theme.bg.page, minHeight: '100vh', padding: theme.spacing.xxl + 'px', fontFamily: FONT }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap" />

      <div style={{ marginBottom: theme.spacing.xxl }}>
        <h1 style={{ fontFamily: FONT, fontSize: 26, fontWeight: 300, color: theme.text.default, letterSpacing: '-0.02em', marginBottom: theme.spacing.xxs }}>
          Figma Console
        </h1>
        <p style={{ fontFamily: FONT, fontSize: 10, color: theme.text.subtlest, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Desktop Bridge plugin by Southleft · AI-powered Figma canvas writes
        </p>
      </div>

      <section style={{ marginBottom: theme.spacing.xxl }}>
        <SectionTitle>What is this?</SectionTitle>
        <p style={{ fontFamily: FONT, fontSize: 13, color: theme.text.subtle, lineHeight: 1.7, marginBottom: theme.spacing.md }}>
          Figma Console is a Figma Desktop Bridge plugin developed by Southleft. It creates a WebSocket tunnel between Claude and the Figma desktop app, allowing Claude to write directly into the Figma canvas — creating and modifying components, applying variables, and interacting with the file programmatically.
        </p>
        <p style={{ fontFamily: FONT, fontSize: 13, color: theme.text.subtle, lineHeight: 1.7 }}>
          This is the second plugin in the Tao design system toolchain. Where the Tao Token Pusher handles syncing tokens and styles from code into Figma, Figma Console enables AI-assisted component creation and canvas manipulation in real time.
        </p>
        <InfoBox>
          The Figma Console plugin is a third-party tool maintained by Southleft, not part of the Tao codebase. It is listed here as an official part of the Tao design system workflow.
        </InfoBox>
      </section>

      <section style={{ marginBottom: theme.spacing.xxl }}>
        <SectionTitle>Install the plugin</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.xs }}>
          <Step number="1" title="Open Figma desktop app" />
          <Step number="2" title="Go to Plugins → Development → Import plugin from manifest" />
          <Step number="3" title="Select the Figma Console manifest file from Southleft" detail="figma-console-plugin/manifest.json" />
          <Step number="4" title="Run the plugin" detail="Plugins → Development → Figma Console" />
        </div>
        <InfoBox>
          The Desktop Bridge only works in the Figma desktop app — not in the browser version. The plugin must be running and paired before Claude can write to the canvas.
        </InfoBox>
      </section>

      <section style={{ marginBottom: theme.spacing.xxl }}>
        <SectionTitle>Pairing with Claude</SectionTitle>
        <p style={{ fontFamily: FONT, fontSize: 13, color: theme.text.subtle, lineHeight: 1.7, marginBottom: theme.spacing.md }}>
          Each session requires a pairing code to authenticate the WebSocket connection between Claude and Figma. This is by design — the code is ephemeral and tied to the current session.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.xs }}>
          <Step number="1" title="Open the Figma Console plugin in Figma desktop" />
          <Step number="2" title="A pairing code will be displayed in the plugin panel" />
          <Step number="3" title="Paste the code into your Claude conversation" />
          <Step number="4" title="Claude will confirm the connection and can now write to your file" />
        </div>
        <InfoBox>
          The pairing code expires when the plugin panel is closed or the Figma session ends. You will need to generate a new code each time you open a new session. Keep the plugin panel open while working to avoid re-pairing.
        </InfoBox>
      </section>

      <section style={{ marginBottom: theme.spacing.xxl }}>
        <SectionTitle>What Claude can do via Figma Console</SectionTitle>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '200px 1fr',
          gap: theme.spacing.lg,
          padding: '0 ' + theme.spacing.md + 'px ' + theme.spacing.xs + 'px',
          borderBottom: '1px solid ' + theme.border.default,
          marginBottom: 0,
        }}>
          {['Capability', 'Description'].map(function(h) {
            return <span key={h} style={{ fontFamily: FONT, fontSize: 9, color: theme.text.subtlest, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</span>;
          })}
        </div>
        <CapabilityRow capability="Create components" description="Generate Figma components from scratch based on specs or token definitions" />
        <CapabilityRow capability="Apply variables" description="Bind Tao token variables to component properties and fills" />
        <CapabilityRow capability="Modify nodes" description="Rename, resize, reorder, and update existing layers and frames" />
        <CapabilityRow capability="Set styles" description="Apply text styles and effect styles to nodes on the canvas" />
        <CapabilityRow capability="Read file structure" description="Inspect the current file to understand what exists before making changes" />
        <CapabilityRow capability="Batch operations" description="Perform multiple canvas operations in a single Claude conversation turn" />
      </section>

      <section style={{ marginBottom: theme.spacing.xxl }}>
        <SectionTitle>How it fits into the Tao workflow</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.xs }}>
          <Step number="1" title="Edit token JSON files" detail="tokens/base/ or tokens/semantic/" />
          <Step number="2" title="Build and push tokens using the Tao Token Pusher plugin" />
          <Step number="3" title="Open Figma Console and pair with Claude" />
          <Step number="4" title="Ask Claude to create or update components using the pushed variables" />
          <Step number="5" title="Review the result in Figma and iterate" />
        </div>
        <InfoBox>
          The two plugins are complementary. Token Pusher owns the token sync layer. Figma Console owns the canvas write layer. They do not overlap — Token Pusher cannot create components, and Figma Console does not manage token collections.
        </InfoBox>
      </section>

    </div>
  );
}

export default FigmaConsole;
