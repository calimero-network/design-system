import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../../packages/charts/src/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [],
  "framework": {
    "name": '@storybook/react-vite',
    "options": {}
  },
  "viteFinal": async (config) => {
    // Only apply external configuration for build mode, not dev mode
    if (config.build && config.build.rollupOptions) {
      config.build.rollupOptions.external = [
        'storybook/internal/preview/runtime',
        'storybook/internal/csf'
      ] as any;
    }
    
    return config;
  }
};
export default config;