import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      optimizeDeps: {
        include: [
          '@tiptap/react',
          '@tiptap/starter-kit',
          '@tiptap/extension-text-style',
          '@tiptap/extension-color',
          '@tiptap/extension-text-align',
          '@tiptap/extension-underline',
          '@tiptap/extension-link',
        ],
      },
      build: {
        commonjsOptions: {
          include: [/node_modules/],
        },
        rollupOptions: {
          external: (id) => {
            // Don't externalize Tiptap packages
            if (id.includes('@tiptap/')) {
              return false;
            }
            return false;
          },
        },
      },
      resolve: {
        dedupe: ['@tiptap/react', '@tiptap/core'],
      },
    });
  },
};

export default config;
