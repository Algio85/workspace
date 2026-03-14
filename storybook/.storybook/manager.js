import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

const theme = create({
  base: 'light',
  brandTitle: ' ',
  brandUrl: '/',
  brandImage: '/Tao.svg',
  brandTarget: '_self',
});

addons.setConfig({ theme });