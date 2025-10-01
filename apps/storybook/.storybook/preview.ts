import type { Preview } from '@storybook/react-vite';
import { cssVariables } from '@calimero-network/mero-tokens';

// Inject CSS variables directly into the document
const style = document.createElement('style');
style.textContent = cssVariables + `
  /* Dark theme styles */
  body {
    font-family: var(--font-body, Inter, system-ui, sans-serif);
    background-color: #0b0f1a !important;
    color: white !important;
  }
  
  /* Dark theme for charts */
  .dark {
    background-color: #0b0f1a;
    color: white;
  }
  
  /* Ensure Storybook canvas has dark background */
  .sb-show-main {
    background-color: #0b0f1a !important;
  }
  
  /* Dark theme for Storybook UI */
  .os-content {
    background-color: #0b0f1a !important;
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
        // 👇 Dark theme options
        dark: { name: 'Dark', value: '#0b0f1a' },
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