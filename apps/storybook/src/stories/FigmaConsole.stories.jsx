import React from 'react';
import FigmaConsole from '../components/FigmaConsole';

const meta = {
  title: 'Figma / Console',
  component: FigmaConsole,
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
Documentation for the Figma Console Desktop Bridge plugin by Southleft.

Figma Console is a third-party plugin that creates a WebSocket tunnel between Claude and the Figma desktop app.
It is an official part of the Tao design system workflow and complements the Tao Token Pusher plugin.

- **Token Pusher** — syncs token values into Figma as Variables, Text Styles, and Effect Styles
- **Figma Console** — enables Claude to write directly into the Figma canvas (components, nodes, properties)

The two plugins do not overlap. Together they cover the full code → Figma pipeline.
        `.trim(),
      },
    },
  },
};

export default meta;

export const Default = {
  name: 'Figma Console',
};
