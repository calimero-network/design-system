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
  body h1, body h2, body h3, body h4, body h5, body h6, 
  body p, body span, body div, body a, body button, 
  body input, body textarea, body select {
    color: #FFFFFF !important;
  }
  
  /* Storybook specific text elements - be more specific */
  .sb-show-main h1, .sb-show-main h2, .sb-show-main h3, 
  .sb-show-main h4, .sb-show-main h5, .sb-show-main h6,
  .sb-show-main p, .sb-show-main span, .sb-show-main div,
  .sb-show-main a, .sb-show-main button, .sb-show-main input,
  .sb-show-main textarea, .sb-show-main select {
    color: #FFFFFF !important;
  }
  
  /* Ensure paragraphs and text content are visible */
  p, .text, .content, .description, .title {
    color: #FFFFFF !important;
  }
  
  /* Ensure all divs and containers have proper background for dark theme */
  div, .container, .wrapper, .card, .panel, .section {
    background-color: var(--color-neutral-900) !important;
    color: #FFFFFF !important;
  }
  
  /* Ensure images and their containers have proper backgrounds */
  img, .image, .img-container, .media-container {
    background-color: var(--color-neutral-800) !important;
  }
  
  /* Storybook root and all nested elements */
  #storybook-root, #storybook-root * {
    background-color: var(--color-neutral-900) !important;
    color: #FFFFFF !important;
  }
  
  /* Override any transparent or undefined backgrounds */
  [style*="background-color: transparent"], 
  [style*="background: transparent"],
  [style*="background-color: undefined"],
  [style*="background: undefined"] {
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