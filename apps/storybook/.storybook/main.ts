import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'], // Verify paths match your structure
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'], // Adjust based on your addons
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: (config) => mergeConfig(config, {
    resolve: {
      alias: {
        '@calimero-network/mero-tokens': path.resolve(process.cwd(), 'packages/tokens/src'),
        '@calimero-network/mero-ui': path.resolve(process.cwd(), 'packages/ui/src'),
        '@calimero-network/mero-charts': path.resolve(process.cwd(), 'packages/charts/src'),
        '@calimero-network/mero-icons': path.resolve(process.cwd(), 'packages/icons/src'),
      },
    },
  }),
};

export default config;
