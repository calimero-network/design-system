import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';

const config: StorybookConfig = {
  // ... existing config
  viteFinal: (config) => mergeConfig(config, {
    resolve: {
      alias: {
        '@calimero-network/mero-tokens': path.resolve(__dirname, '../../packages/mero-tokens/src'), // Relative from .storybook/ to the tokens package
      },
    },
  }),
};

export default config;
