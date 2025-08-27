import type { Preview } from '@storybook/react-vite';
import { cssVariables } from '@calimero/tokens';

// Inject CSS variables directly into the document
const style = document.createElement('style');
style.textContent = cssVariables + `
  /* Additional styles for charts */
  body {
    font-family: var(--font-body, Inter, system-ui, sans-serif);
  }
  
  /* Dark theme for charts */
  .dark {
    background-color: #0b0f1a;
    color: white;
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
        // 👇 Default options
        primary: { name: 'Primary', value: 'var(--color-background-primary)' },
        secondary: { name: 'Secondary', value: 'var(--color-background-secondary)' },
        tertiary: { name: 'Tertiary', value: 'var(--color-background-tertiary)' },
        brand: { name: 'Brand', value: 'var(--color-background-brand)' },
        light: { name: 'Light', value: '#FFFFFF' },
      },
    }
  },
  initialGlobals: {
    backgrounds: { value: 'primary' },
  },
};

export default preview;