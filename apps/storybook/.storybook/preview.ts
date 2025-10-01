import type { Preview } from '@storybook/react-vite';
import { cssVariables } from '@calimero-network/mero-tokens';

// Inject CSS variables directly into the document
const style = document.createElement('style');
style.textContent = cssVariables + `
  /* Calimero brand theme - transparent background */
  body {
    font-family: 'Power Grotesk', 'Inter', system-ui, sans-serif;
    background: transparent;
    color: #FFFFFF;
    min-height: 100vh;
  }
  
  /* Dark theme for charts */
  .dark {
    background: transparent;
    color: #FFFFFF;
  }
  
  /* Ensure Storybook canvas has transparent background */
  .sb-show-main {
    background: transparent !important;
  }
  
  /* Dark theme for Storybook UI */
  .os-content {
    background: transparent !important;
  }
  
  /* Only override elements that don't have proper component styling */
  .sb-show-main > div {
    background: transparent !important;
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
        // 👇 Transparent background options
        transparent: { name: 'Transparent', value: 'transparent' },
        white: { name: 'White', value: '#FFFFFF' },
        black: { name: 'Black', value: '#000000' },
        neutral: { name: 'Neutral 900', value: 'var(--color-neutral-900)' },
        accent: { name: 'Brand Accent', value: 'var(--color-brand-600)' },
      },
    }
  },
  initialGlobals: {
    backgrounds: { value: 'transparent' },
  },
};

export default preview;