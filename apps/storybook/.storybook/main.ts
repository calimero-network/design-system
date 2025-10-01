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
        '@calimero-network/mero-tokens': path.resolve(__dirname, '../../packages/tokens/src'),
        '@calimero-network/mero-ui': path.resolve(__dirname, '../../packages/ui/src'),
        '@calimero-network/mero-charts': path.resolve(__dirname, '../../packages/charts/src'),
        '@calimero-network/mero-icons': path.resolve(__dirname, '../../packages/icons/src'),
      },
    },
    // Ensure no conflicting plugins or optimizations
    optimizeDeps: {
      include: [
        '@calimero-network/mero-tokens', 
        '@calimero-network/mero-ui',
        '@calimero-network/mero-charts',
        '@calimero-network/mero-icons'
      ],
    },
    build: {
      rollupOptions: {
        external: (id) => {
          // Don't externalize our local packages
          if (id.startsWith('@calimero-network/mero-')) {
            return false;
          }
          return false;
        },
      },
    },
  }),
};

export default config;
