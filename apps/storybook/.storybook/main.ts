import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@calimero-network/mero-ui': path.resolve(__dirname, '../../../packages/ui/src'),
          '@calimero-network/mero-tokens': path.resolve(__dirname, '../../../packages/tokens/src'),
          '@calimero-network/mero-charts': path.resolve(__dirname, '../../../packages/charts/src'),
          '@calimero-network/mero-icons': path.resolve(__dirname, '../../../packages/icons/src'),
        },
      },
    });
  },
};

export default config;
