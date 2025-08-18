import type { Preview } from '@storybook/react-vite';
import { cssVariables } from '@calimero/tokens';

// Inject CSS variables directly into the document
const style = document.createElement('style');
style.textContent = cssVariables;
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
  },
};

export default preview;