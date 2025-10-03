---
"@calimero-network/mero-ui": patch
"@calimero-network/mero-charts": patch
---

Fix workspace dependency references for proper external consumption

- Resolve workspace:* references to actual version numbers during publishing
- Ensure external consumers can install packages without workspace reference errors
- Maintain local development workflow with workspace references
