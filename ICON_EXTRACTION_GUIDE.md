# Icon Extraction Guide - Calimero Design System

This document explains how icons were extracted from the Figma SVG file and the technical challenges that were solved.

## Overview

The icon extraction process converts a large SVG sprite (containing multiple icons) into individual React TypeScript components. Each icon becomes a reusable component with proper TypeScript types and consistent API.

## The Challenge

### Original SVG Structure
The `chunky.svg` file contains multiple icons arranged in a grid layout:
- **Total dimensions**: 1701x570 pixels
- **Icons positioned at different X coordinates** within the large canvas
- **Each icon is 48x48 pixels** but positioned at different offsets

### The Problem
When extracting individual icons, we faced a coordinate system challenge:
- Icons were positioned at coordinates like `M93`, `M180`, `M277`, etc.
- Using `viewBox="0 0 48 48"` would crop the icons incorrectly
- Icons appeared invisible because their paths were outside the viewBox

## The Solution

### 1. Correct ViewBox Coordinates
Instead of normalizing all coordinates to `0 0`, we use the original positioning:

```javascript
const iconDefinitions = [
  {
    name: 'clock',
    viewBox: '0 0 48 48',      // Starts at X=6, close to 0
    paths: [/* original paths */]
  },
  {
    name: 'clock-alert', 
    viewBox: '87 0 48 48',     // Starts at X=93, offset by 87
    paths: [/* original paths */]
  },
  {
    name: 'clock-x',
    viewBox: '174 0 48 48',    // Starts at X=180, offset by 174
    paths: [/* original paths */]
  },
  {
    name: 'shield',
    viewBox: '270 0 48 48',    // Starts at X=277, offset by 270
    paths: [/* original paths */]
  },
  {
    name: 'cloud',
    viewBox: '348 0 48 48',    // Starts at X=387.75, offset by 348
    paths: [/* original paths */]
  }
];
```

### 2. How ViewBox Works
The `viewBox` attribute acts like a "window" into the SVG:
- `viewBox="87 0 48 48"` means: "Show the 48x48 pixel area starting at coordinates (87, 0)"
- This allows us to extract the correct portion of the large SVG without modifying path coordinates

## Extraction Process

### Step 1: Analyze the SVG
1. Open `chunky.svg` and identify icon boundaries
2. Note the X coordinates where each icon starts
3. Calculate the viewBox for each icon

### Step 2: Define Icon Data
```javascript
// scripts/extract-icons.js
const iconDefinitions = [
  {
    name: 'clock-alert',
    paths: [
      'M93 24C93 26.3638...',  // Original path coordinates
      'M111 32V32.02...',
      'M111 25.9995C111.9...'
    ],
    viewBox: '87 0 48 48',     // Correct viewBox for this icon
    width: 48,
    height: 48
  }
  // ... more icons
];
```

### Step 3: Generate React Components
```javascript
function generateIconComponent(iconDef) {
  return `import React from 'react';
import { IconProps } from '../types/icon';

export const ${componentName}: React.FC<IconProps> = ({ 
  size = 24, 
  color = 'currentColor', 
  className = '',
  onClick 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="${iconDef.viewBox}"  // Use the correct viewBox
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      ${iconDef.paths.map(path => 
        `<path d="${path}" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`
      ).join('\n')}
    </svg>
  );
};
`;
}
```

### Step 4: Generate TypeScript Types
```typescript
// src/types/icon.ts
export interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  onClick?: () => void;
}

export type IconName = 
  | 'clock'
  | 'clock-alert'
  | 'clock-x'
  | 'shield'
  | 'cloud';
```

### Step 5: Create Icon Registry
```typescript
// src/Icon.tsx
export const iconRegistry: Record<IconName, React.FC<IconProps>> = {
  'clock': ClockIcon,
  'clock-alert': ClockAlertIcon,
  'clock-x': ClockXIcon,
  'shield': ShieldIcon,
  'cloud': CloudIcon
};

export const Icon: React.FC<IconProps & { name: IconName }> = ({ name, ...props }) => {
  const IconComponent = iconRegistry[name];
  return <IconComponent {...props} />;
};
```

## Key Technical Insights

### Why This Approach Works
1. **Preserves Original Coordinates**: No need to transform complex SVG paths
2. **Maintains Visual Fidelity**: Icons render exactly as designed
3. **Simplifies Extraction**: No complex coordinate normalization required
4. **Scalable**: Easy to add more icons using the same pattern

### ViewBox Calculation
For each icon, the viewBox is calculated as:
- **X offset**: The X coordinate where the icon starts in the original SVG
- **Y offset**: Usually 0 (icons are aligned to the top)
- **Width**: 48 pixels (standard icon size)
- **Height**: 48 pixels (standard icon size)

Example: Icon starting at `M93` gets `viewBox="87 0 48 48"` (93-6=87 offset)

## Usage

### In React Components
```tsx
import { Icon } from '@calimero/design-system';

function MyComponent() {
  return (
    <div>
      <Icon name="clock" size={24} color="#A5FF11" />
      <Icon name="shield" size={32} color="blue" />
    </div>
  );
}
```

### Individual Icon Components
```tsx
import { ClockIcon, ShieldIcon } from '@calimero/design-system';

function MyComponent() {
  return (
    <div>
      <ClockIcon size={24} color="#A5FF11" />
      <ShieldIcon size={32} color="blue" />
    </div>
  );
}
```

## Adding New Icons

To extract additional icons:

1. **Identify the icon** in `chunky.svg`
2. **Note the starting X coordinate** (e.g., `M475`)
3. **Calculate viewBox**: `viewBox="469 0 48 48"` (475-6=469)
4. **Add to `iconDefinitions`** in `scripts/extract-icons.js`
5. **Run extraction**: `node scripts/extract-icons.js`
6. **Update types**: Add icon name to `IconName` union type
7. **Test**: Check the preview to ensure visibility

## Files Generated

- `src/icons/*.tsx` - Individual icon components
- `src/Icon.tsx` - Main Icon component with registry
- `src/types/icon.ts` - TypeScript type definitions
- `src/index.ts` - Library exports
- `preview.html` - Visual preview of all icons

## Troubleshooting

### Icons Not Visible
- Check that viewBox coordinates are correct
- Verify paths are not empty
- Ensure viewBox width/height match icon dimensions

### TypeScript Errors
- Update `IconName` union type with new icon names
- Ensure all icon components are exported from `index.ts`
- Check that `iconRegistry` includes all icons

### Build Issues
- Run `npm run build` to check for TypeScript errors
- Ensure all dependencies are installed
- Check that file paths are correct

This approach ensures reliable icon extraction while maintaining the original design integrity and providing a clean, type-safe API for developers. 