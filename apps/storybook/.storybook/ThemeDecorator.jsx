import React, { useEffect } from 'react';
import { useGlobals } from '@storybook/preview-api';
import { applyTheme } from '../src/tokens/themeEngine.js';

const PALETTE_KEYS = [
  'palette-1','palette-2','palette-3','palette-4','palette-5','palette-6',
  'palette-7','palette-8','palette-9','palette-10','palette-11',
];

export function ThemeDecorator(Story, context) {
  const [globals] = useGlobals();

  const palettes = Object.fromEntries(
    PALETTE_KEYS.map(k => [k, globals[k]]).filter(([, v]) => v)
  );

  useEffect(() => {
    applyTheme({
      palettes,
      typescaleRatio: globals.typescale    || '1.2',
      densityFactor:  globals.density      || '1',
    });
  }, [
    ...PALETTE_KEYS.map(k => globals[k]),
    globals.typescale,
    globals.density,
  ]);

  return <Story {...context} />;
}
