import type { TestRunnerConfig } from '@storybook/test-runner';

const config: TestRunnerConfig = {
  setupFilesAfterEnv: ['<rootDir>/.storybook/test-setup.ts'],
};

export default config;
