# @calimero-network/mero-ui

## 0.3.0

### Minor Changes

- feat: add RichTextEditor component with Tiptap integration
  - Add new RichTextEditor component with full rich text editing capabilities
  - Integrate Tiptap editor with StarterKit and extensions (Color, TextAlign, Underline, Link)
  - Support for bold, italic, underline, headings, lists, quotes, code blocks
  - Clean default text-based toolbar icons (B, I, U, H, •, ", </>, 🔗, A, H)
  - Full TypeScript support with proper prop types
  - Design system integration with tokens and styling
  - Storybook stories demonstrating all features
  - Controlled and uncontrolled component modes
  - Accessibility features with proper ARIA labels

## 0.2.0

### Minor Changes

- # Major UI Package Update

  ## New Components Added

  ### Grid System
  - **Grid**: Flexible CSS Grid container with configurable columns, gap, and alignment
  - **GridItem**: Grid items with column/row spanning and positioning support

  ### Menu System
  - **Menu**: Dark-themed menu container with multiple variants and sizes
  - **MenuItem**: Interactive menu items with icons, states, and click handlers
  - **MenuGroup**: Grouped menu items with optional labels
  - **MenuDivider**: Visual separators between menu groups

  ### Navbar System
  - **Navbar**: Responsive navigation bar with fixed positioning support
  - **NavbarBrand**: Brand/logo section with click handlers
  - **NavbarItem**: Navigation items with active states and icons
  - **NavbarMenu**: Flexible menu containers with alignment options
  - **NavbarToggle**: Mobile hamburger menu toggle

  ## Enhancements
  - **Card Component**: Added `variant` prop for rectangle/rounded styles
  - **Comprehensive Storybook Stories**: Interactive examples for all new components
  - **TypeScript Support**: Full type safety for all components
  - **Dark Theme**: Consistent styling across all components

  ## Breaking Changes

  None - all changes are additive and backward compatible.

  ## Migration Guide

  No migration required. All existing components continue to work as before.

## 0.1.0

### Minor Changes

- Release: add secondary and semantic button variants; fix Storybook stability and icon packing; externalize React in builds; align peer deps; dark theme consistency across components.

### Patch Changes

- Updated dependencies
  - @calimero-network/mero-icons@0.0.3

## 0.0.2

### Patch Changes

- enable TypeScript types generation for all packages
- Updated dependencies
  - @calimero-network/mero-icons@0.0.2

## 0.0.1

### Patch Changes

- b346837: Initial version
- Updated dependencies [b346837]
  - @calimero-network/mero-icons@0.0.1
