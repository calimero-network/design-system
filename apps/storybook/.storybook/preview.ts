import type { Preview } from '@storybook/react-vite';
import { cssVariables } from '@calimero-network/mero-tokens';

// Inject CSS variables directly into the document
const style = document.createElement('style');
style.textContent = cssVariables + `
  /* Dark theme styles with proper light typography */
  body {
    font-family: var(--font-body, Inter, system-ui, sans-serif);
    background-color: var(--color-neutral-900);
    color: #FFFFFF;
  }
  
  /* Dark theme for charts */
  .dark {
    background-color: var(--color-neutral-900);
    color: #FFFFFF;
  }
  
  /* Ensure Storybook canvas has dark background */
  .sb-show-main {
    background-color: var(--color-neutral-900) !important;
  }
  
  /* Dark theme for Storybook UI */
  .os-content {
    background-color: var(--color-neutral-900) !important;
  }
  
  /* Ensure all text elements are light for dark theme */
  h1, h2, h3, h4, h5, h6, p, span, div, a, button, input, textarea, select {
    color: #FFFFFF !important;
  }
  
  /* Storybook specific text elements */
  .sb-show-main * {
    color: #FFFFFF !important;
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