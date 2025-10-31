import React from "react";

type Size = "sm" | "md" | "lg" | "xl";
type Variant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "outline"
  | "ghost"
  | "destructive";

type ButtonProps = React.PropsWithChildren<{
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  rounded?: boolean;
  "aria-label"?: string;
  "aria-current"?:
    | "page"
    | "step"
    | "location"
    | "date"
    | "time"
    | "true"
    | "false";
  title?: string;
}>;

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
    const baseHeight: Record<Size, number> = { sm: 32, md: 40, lg: 48, xl: 56 };
    const basePaddingX: Record<Size, number> = { sm: 12, md: 16, lg: 20, xl: 24 };
    const baseFontSize: Record<Size, number> = { sm: 12, md: 14, lg: 16, xl: 18 };

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
