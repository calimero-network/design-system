import type { Preview } from '@storybook/react-vite';
import { cssVariables } from '@calimero-network/mero-tokens';

// Inject CSS variables directly into the document
const style = document.createElement('style');
style.textContent = cssVariables + `
  /* Dark theme styles using Alert color scheme */
  body {
    font-family: var(--font-body, Inter, system-ui, sans-serif);
    background-color: var(--color-neutral-900);
    color: var(--color-neutral-300);
  }
  
  /* Dark theme for charts */
  .dark {
    background-color: var(--color-neutral-900);
    color: var(--color-neutral-300);
  }
  
  /* Ensure Storybook canvas has dark background */
  .sb-show-main {
    background-color: var(--color-neutral-900) !important;
  }
  
  /* Dark theme for Storybook UI */
  .os-content {
    background-color: var(--color-neutral-900) !important;
  }
`;
document.head.appendChild(style);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      options: {
        // 👇 Dark theme options using Alert color scheme
        dark: { name: 'Dark', value: 'var(--color-neutral-900)' },
        primary: { name: 'Primary', value: 'var(--color-background-primary)' },
        secondary: { name: 'Secondary', value: 'var(--color-background-secondary)' },
        tertiary: { name: 'Tertiary', value: 'var(--color-background-tertiary)' },
        brand: { name: 'Brand', value: 'var(--color-background-brand)' },
        light: { name: 'Light', value: '#FFFFFF' },
      },
    }
  },
  initialGlobals: {
    backgrounds: { value: 'dark' },
  },
};

export default preview;