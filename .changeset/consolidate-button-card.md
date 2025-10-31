---
"@calimero-network/mero-ui": minor
---

### Enhanced Components

#### Button Component
- **Polymorphic Support**: Added `as` prop to render Button as any element (Link, anchor, etc.)
- **Extended API**: Added `size` (sm, md, lg, xl), `leftIcon`, `rightIcon`, `fullWidth`, and `rounded` props
- **Additional Variants**: Added `outline`, `ghost`, and `destructive` variants
- **Breaking Change**: Removed `loading` prop; use composition pattern with `Spinner` component and `disabled` state instead
- **Fix**: Enabled hover/active states for polymorphic Link rendering

#### Card Component
- **Color Control**: Added `color` prop to `CardTitle` and `CardContent` for brand color customization
- **Design Tokens**: Updated default text colors to use design tokens (`neutral[200]` and `neutral[300]`)

#### Spinner Component
- **Fix**: Fixed rotation center by moving animation to group element with proper `transform-origin`

### Removed
- Removed `DataList` component (unused simple layout component)
