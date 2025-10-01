import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  "addons": [],
  "framework": {
    "name": '@storybook/react-vite',
    "options": {}
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        
      },
    });
  },
};
export default config;
