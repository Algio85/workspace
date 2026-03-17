import React from 'react';
import FigmaPlugin from '../components/FigmaPlugin';

const meta = {
  title: 'Figma / Token Pusher',
  component: FigmaPlugin,
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
Documentation for the Tao Token Pusher Figma plugin.

The plugin syncs design tokens from the codebase to Figma variables, keeping design and code in sync.
Every variable gets its CSS code syntax set automatically so developers see \`var(--tao-...)\` in Dev Mode.
        `.trim(),
      },
    },
  },
};

export default meta;

export const Default = {
  name: 'Token Pusher',
};