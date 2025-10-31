import React from "react";

/**
 * Button size variants
 * @public
 */
export type ButtonSize = "sm" | "md" | "lg" | "xl";

/**
 * Button style variants
 * @public
 */
export type ButtonVariant =
  | "primary"        // Brand color with black text (default)
  | "secondary"      // Dark background with white text and border
  | "success"        // Green semantic color
  | "warning"        // Orange semantic color
  | "error"          // Red semantic color (same as destructive)
  | "info"           // Blue semantic color
  | "outline"        // Transparent with border
  | "ghost"          // Transparent without border
  | "destructive";   // Red semantic color (same as error)

/**
 * Button component props
 * @public
 */
export interface ButtonProps extends React.PropsWithChildren {
  /** Click handler function */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** HTML button type */
  type?: "button" | "submit" | "reset";
  /** Visual variant/style of the button */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Show loading spinner and disable interactions */
  loading?: boolean;
  /** Icon to display on the left side of the button text */
  leftIcon?: React.ReactNode;
  /** Icon to display on the right side of the button text */
  rightIcon?: React.ReactNode;
  /** Make button span full width of container */
  fullWidth?: boolean;
  /** Whether button has rounded corners (default: true, 12px radius). When false, uses 0px (sharp corners) */
  rounded?: boolean;
  /** Accessibility: aria-label for screen readers */
  "aria-label"?: string;
  /** Accessibility: aria-current attribute */
  "aria-current"?:
    | "page"
    | "step"
    | "location"
    | "date"
    | "time"
    | "true"
    | "false";
  /** HTML title attribute for tooltip */
  title?: string;
}

/**
 * Button Component
 * 
 * A versatile, accessible button component with multiple variants, sizes, and states.
 * Supports loading states, icons, full-width layout, and border radius control.
 * 
 * @example
 * ```tsx
 * import { Button } from '@calimero-network/mero-ui';
 * 
 * // Basic usage
 * <Button onClick={() => console.log('clicked')}>
 *   Click me
 * </Button>
 * 
 * // With variant and size
 * <Button variant="secondary" size="lg">
 *   Large Secondary Button
 * </Button>
 * 
 * // With loading state
 * <Button loading>Processing...</Button>
 * 
 * // With icons
 * <Button leftIcon={<Icon />} rightIcon={<Arrow />}>
 *   With Icons
 * </Button>
 * 
 * // Full width
 * <Button fullWidth>Full Width Button</Button>
 * 
 * // Sharp corners (not rounded)
 * <Button rounded={false}>Sharp Button</Button>
 * ```
 * 
 * @public
 */

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      onClick,
      disabled = false,
      className = "",
      style,
      type = "button",
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      rounded = true,
      "aria-label": ariaLabel,
      "aria-current": ariaCurrent,
      title,
    },
    ref
  ) => {
    const baseHeight: Record<ButtonSize, number> = { sm: 32, md: 40, lg: 48, xl: 56 };
    const basePaddingX: Record<ButtonSize, number> = { sm: 12, md: 16, lg: 20, xl: 24 };
    const baseFontSize: Record<ButtonSize, number> = { sm: 12, md: 14, lg: 16, xl: 18 };

    const baseStyles: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      height: `${baseHeight[size]}px`,
      padding: `0 ${basePaddingX[size]}px`,
      borderRadius: rounded ? "12px" : "0px",
      border: "1px solid transparent",
      fontFamily: "var(--font-body)",
      fontSize: `${baseFontSize[size]}px`,
      fontWeight: 700,
      cursor: disabled || loading ? "not-allowed" : "pointer",
      userSelect: "none",
      transition:
        "background-color 120ms ease, border-color 120ms ease, transform 60ms ease, box-shadow 120ms ease",
      width: fullWidth ? "100%" : undefined,
    };

    const [isActive, setIsActive] = React.useState(false);
    const [isHover, setIsHover] = React.useState(false);

    const isPrimary = variant === "primary";
    const isSecondary = variant === "secondary";

    const palette = (() => {
      switch (variant) {
        case "secondary":
          return {
            base: "#1A1A1A",
            hover: "#2A2A2A",
            active: "#111111",
            disabled: "#0F0F0F",
            text: "#FFFFFF",
            border: "#404040",
            borderHover: "#505050",
            borderActive: "#5A5A5A",
          };
        case "outline":
          return {
            base: "transparent",
            hover: "rgba(255,255,255,0.04)",
            active: "rgba(255,255,255,0.08)",
            disabled: "transparent",
            text: "#FFFFFF",
            border: "#404040",
            borderHover: "#505050",
            borderActive: "#5A5A5A",
          };
        case "ghost":
          return {
            base: "transparent",
            hover: "rgba(255,255,255,0.04)",
            active: "rgba(255,255,255,0.08)",
            disabled: "transparent",
            text: "#FFFFFF",
            border: "transparent",
            borderHover: "transparent",
            borderActive: "transparent",
          };
        case "destructive":
        case "error":
          return {
            base: "var(--color-semantic-error)",
            hover: "var(--color-semantic-error)",
            active: "var(--color-semantic-error)",
            disabled: "var(--color-semantic-error)",
            text: "#FFFFFF",
            border: "transparent",
            borderHover: "transparent",
            borderActive: "transparent",
          };
        case "success":
          return {
            base: "var(--color-semantic-success)",
            hover: "var(--color-semantic-success)",
            active: "var(--color-semantic-success)",
            disabled: "var(--color-semantic-success)",
            text: "#FFFFFF",
            border: "transparent",
            borderHover: "transparent",
            borderActive: "transparent",
          };
        case "warning":
          return {
            base: "var(--color-semantic-warning)",
            hover: "var(--color-semantic-warning)",
            active: "var(--color-semantic-warning)",
            disabled: "var(--color-semantic-warning)",
            text: "#000000",
            border: "transparent",
            borderHover: "transparent",
            borderActive: "transparent",
          };
        case "info":
          return {
            base: "var(--color-semantic-info)",
            hover: "var(--color-semantic-info)",
            active: "var(--color-semantic-info)",
            disabled: "var(--color-semantic-info)",
            text: "#FFFFFF",
            border: "transparent",
            borderHover: "transparent",
            borderActive: "transparent",
          };
        default:
          return {
            base: "var(--color-brand-600)",
            hover: "var(--color-brand-100)",
            active: "var(--color-brand-800)",
            disabled: "var(--color-brand-900)",
            text: "#000000",
            border: "transparent",
            borderHover: "transparent",
            borderActive: "transparent",
          };
      }
    })();

    let dynamicBackground = palette.base as string;
    let dynamicBorder = palette.border as string;
    let dynamicTextColor = palette.text as string;
    if (!disabled && !loading) {
      if (isActive) {
        dynamicBackground = palette.active as string;
        dynamicBorder = palette.borderActive as string;
      } else if (isHover) {
        dynamicBackground = palette.hover as string;
        dynamicBorder = palette.borderHover as string;
      }
    } else {
      dynamicBackground = palette.disabled as string;
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        onClick={onClick}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        onMouseLeave={() => {
          setIsActive(false);
          setIsHover(false);
        }}
        onMouseEnter={() => setIsHover(true)}
        style={{
          ...baseStyles,
          backgroundColor: dynamicBackground,
          borderColor: isSecondary || variant === "outline" ? dynamicBorder : "transparent",
          color: isPrimary ? "#000000" : dynamicTextColor,
          boxShadow:
            variant === "primary" && isHover && !disabled && !loading
              ? "0 0 20px rgba(165, 255, 17, 0.25)"
              : undefined,
          ...style,
        }}
        className={className}
        aria-label={ariaLabel}
        aria-current={ariaCurrent}
        title={title}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon && <span style={{ marginRight: 8 }}>{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span style={{ marginLeft: 8 }}>{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
