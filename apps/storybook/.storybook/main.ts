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
        alias: {
          '@calimero-network/mero-tokens': '/Users/chefsale/workspace/calimero/design-system/packages/tokens/src/index.ts',
          '@calimero-network/mero-ui': '/Users/chefsale/workspace/calimero/design-system/packages/ui/src/index.ts',
          '@calimero-network/mero-icons': '/Users/chefsale/workspace/calimero/design-system/packages/icons/src/index.ts',
          '@calimero-network/mero-charts': '/Users/chefsale/workspace/calimero/design-system/packages/charts/src/index.ts',
        },
      },
    });
  },
};
export default config;
