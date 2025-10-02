---
"@calimero-network/mero-ui": patch
"@calimero-network/mero-charts": patch
---

chore: fix lockfile synchronization after version bump

- Update pnpm-lock.yaml to match package.json versions
- Resolve ERR_PNPM_OUTDATED_LOCKFILE error in CI environments
- Ensure consistent dependency resolution across all packages
