import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-a11y"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      optimizeDeps: {
        include: [
          "@tiptap/react",
          "@tiptap/starter-kit",
          "@tiptap/extension-text-style",
          "@tiptap/extension-color",
          "@tiptap/extension-text-align",
          "@tiptap/extension-underline",
          "@tiptap/extension-link",
          "react",
          "react-dom",
        ],
      },
      build: {
        commonjsOptions: {
          include: [/node_modules/],
        },
        rollupOptions: {
          external: [],
        },
      },
      resolve: {
        dedupe: ["@tiptap/react", "@tiptap/core", "react", "react-dom"],
        alias: {
          react: "react",
          "react-dom": "react-dom",
          "use-sync-external-store/shim":
            "use-sync-external-store/shim/index.js",
        },
      },
      define: {
        "process.env.NODE_ENV": JSON.stringify(
          process.env.NODE_ENV || "production",
        ),
      },
    });
  },
};

export default config;
