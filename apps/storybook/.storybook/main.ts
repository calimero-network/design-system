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
    // Handle external modules for both dev and build
    if (config.build && config.build.rollupOptions) {
      config.build.rollupOptions.external = [
        'storybook/internal/preview/runtime',
        'storybook/internal/csf',
        'storybook/internal/*'
      ] as any;
    }
    
    // Add optimizeDeps configuration for dev mode
    if (!config.optimizeDeps) {
      config.optimizeDeps = {};
    }
    if (!config.optimizeDeps.exclude) {
      config.optimizeDeps.exclude = [];
    }
    config.optimizeDeps.exclude.push(
      'storybook/internal/preview/runtime',
      'storybook/internal/csf'
    );
    
    return config;
  }
};
export default config;