# @calimero-network/mero-charts

## 0.0.8

### Patch Changes

- 5a1d22c: chore: fix lockfile synchronization after version bump
  - Update pnpm-lock.yaml to match package.json versions
  - Resolve ERR_PNPM_OUTDATED_LOCKFILE error in CI environments
  - Ensure consistent dependency resolution across all packages

- feat: Upgrade all packages to latest versions
  - Upgrade Storybook from 8.6.14 to 9.1.10
  - Upgrade React from 18.3.1 to 19.1.0
  - Upgrade React types to 19.2.0
  - Upgrade Vite to 7.1.8
  - Remove @storybook/addon-essentials (now built into Storybook 9.x)
  - Update all Storybook addons to 9.1.10
  - Fix dynamic require issues with React 19
  - Synchronize lockfile across all environments

- Updated dependencies [5a1d22c]
- Updated dependencies
  - @calimero-network/mero-ui@0.3.3

## 0.0.7

### Patch Changes

- Updated dependencies
  - @calimero-network/mero-ui@0.3.2

## 0.0.6

### Patch Changes

- Updated dependencies
  - @calimero-network/mero-ui@0.3.1

## 0.0.5

### Patch Changes

- Updated dependencies
  - @calimero-network/mero-ui@0.3.0

## 0.0.4

### Patch Changes

- Updated dependencies
  - @calimero-network/mero-ui@0.2.0

## 0.0.3

### Patch Changes

- Release: add secondary and semantic button variants; fix Storybook stability and icon packing; externalize React in builds; align peer deps; dark theme consistency across components.
- Updated dependencies
  - @calimero-network/mero-ui@0.1.0

## 0.0.2

### Patch Changes

- enable TypeScript types generation for all packages
- Updated dependencies
  - @calimero-network/mero-ui@0.0.2

## 0.0.1

### Patch Changes

- b346837: Initial version
- Updated dependencies [b346837]
  - @calimero-network/mero-ui@0.0.1
