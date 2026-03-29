import { resolveTokens } from './resolve.js';
import textTokens from './semantic/text.json';
import surfaceTokens from './semantic/surfaces.json';
import shades from './shades.json';

const text    = resolveTokens(textTokens,    '', shades);
const surface = resolveTokens(surfaceTokens, '', shades);

const SPACING = {
  xxs:  4,
  xs:   8,
  sm:   12,
  md:   16,
  lg:   24,
  xl:   32,
  xxl:  48,
  xxxl: 64,
};

export const theme = {
  bg: {
    page:    surface['surface.neutral.subtlest']  || '#f5f5f5',
    surface: surface['surface.neutral.subtle']    || '#ebebeb',
    raised:  surface['surface.neutral.subtlest']  || '#ffffff',
    sunken:  surface['surface.neutral.default']   || '#e5e5e5',
    hover:   surface['surface.neutral.subtle']    || '#f0f0f0',
    active:  surface['surface.neutral.default']   || '#e5e5e5',
  },
  text: {
    default:  text['text.default']  || '#111111',
    subtle:   text['text.subtle']   || '#555555',
    subtlest: text['text.subtlest'] || '#999999',
    inverse:  text['text.inverse']  || '#ffffff',
  },
  border: {
    default: surface['surface.neutral.bold']    || '#d4d4d4',
    subtle:  surface['surface.neutral.default'] || '#e5e5e5',
  },
  accent: {
    default: text['text.brand-1'] || '#2563EB',
  },
  spacing: SPACING,
  font: "'DM Sans', system-ui, sans-serif",
};
