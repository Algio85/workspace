import '../src/tokens/tokens.css';
import { ThemeDecorator } from './ThemeDecorator.jsx';

export const globalTypes = {
  // Palette globals — no toolbar, controlled from the Color Palette story
  'palette-1':  { defaultValue: '#2563EB' },
  'palette-2':  { defaultValue: '#4F46E5' },
  'palette-3':  { defaultValue: '#7C3AED' },
  'palette-4':  { defaultValue: '#DB2777' },
  'palette-5':  { defaultValue: '#DC2626' },
  'palette-6':  { defaultValue: '#EA580C' },
  'palette-7':  { defaultValue: '#D97706' },
  'palette-8':  { defaultValue: '#16A34A' },
  'palette-9':  { defaultValue: '#0D9488' },
  'palette-10': { defaultValue: '#0891B2' },
  'palette-11': { defaultValue: '#525252' },

  // Toolbar globals
  typescale: {
    name: 'Type scale',
    defaultValue: '1.2',
    toolbar: {
      icon: 'typography',
      items: [
        { value: '1.125', title: 'Compact  (1.125)' },
        { value: '1.2',   title: 'Default  (1.2)'   },
        { value: '1.25',  title: 'Medium   (1.25)'  },
        { value: '1.333', title: 'Large    (1.333)' },
        { value: '1.5',   title: 'Expressive (1.5)' },
      ],
      dynamicTitle: true,
    },
  },
  density: {
    name: 'Density',
    defaultValue: '1',
    toolbar: {
      icon: 'component',
      items: [
        { value: '0.75', title: 'Compact'     },
        { value: '1',    title: 'Comfortable' },
        { value: '1.25', title: 'Spacious'    },
      ],
      dynamicTitle: true,
    },
  },
  iconWeight: {
    name: 'Icon weight',
    defaultValue: 'regular',
    toolbar: {
      icon: 'star',
      items: [
        { value: 'thin',    title: 'Thin'    },
        { value: 'light',   title: 'Light'   },
        { value: 'regular', title: 'Regular' },
        { value: 'bold',    title: 'Bold'    },
        { value: 'fill',    title: 'Fill'    },
        { value: 'duotone', title: 'Duotone' },
      ],
      dynamicTitle: true,
    },
  },
};

/** @type { import('@storybook/react').Preview } */
const preview = {
  decorators: [ThemeDecorator],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f5f5f5' },
        { name: 'dark',  value: '#0f0f0f' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
