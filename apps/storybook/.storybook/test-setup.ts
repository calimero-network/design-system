import '@testing-library/jest-dom';

// Mock CSS modules
vi.mock('*.css', () => ({}));
vi.mock('*.scss', () => ({}));

// Mock SVG imports
vi.mock('*.svg', () => ({
  default: 'svg-mock',
}));
