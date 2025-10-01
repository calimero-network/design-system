import React from "react";

type ButtonProps = React.PropsWithChildren<{
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
}>;

export function Button({
  children,
  onClick,
  disabled = false,
  className = "",
  style,
  type = "button",
  variant = 'primary',
}: ButtonProps) {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    height: '40px',
    padding: '0 16px',
    borderRadius: '12px',
    border: '1px solid transparent',
    fontFamily: 'inherit',
    fontSize: '14px',
    fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
    transition: 'background-color 120ms ease, border-color 120ms ease, transform 60ms ease',
    color: '#000000', // Pure black for better contrast with bright green
    backgroundColor: 'var(--color-brand-600)',
  };

  const [isActive, setIsActive] = React.useState(false);
  const [isHover, setIsHover] = React.useState(false);

  // Determine palette based on variant
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const palette = (() => {
    switch (variant) {
      case 'secondary':
        return {
          base: '#1A1A1A',
          hover: '#2A2A2A',
          active: '#111111',
          disabled: '#0F0F0F',
          text: '#FFFFFF',
          border: '#404040',
          borderHover: '#505050',
          borderActive: '#5A5A5A',
        };
      case 'success':
        return {
          base: 'var(--color-semantic-success)',
          hover: 'var(--color-semantic-success)',
          active: 'var(--color-semantic-success)',
          disabled: 'var(--color-semantic-success)',
          text: '#FFFFFF', // White text for better contrast with green
          border: 'transparent',
          borderHover: 'transparent',
          borderActive: 'transparent',
        };
      case 'warning':
        return {
          base: 'var(--color-semantic-warning)',
          hover: 'var(--color-semantic-warning)',
          active: 'var(--color-semantic-warning)',
          disabled: 'var(--color-semantic-warning)',
          text: '#000000', // Black text for better contrast with orange
          border: 'transparent',
          borderHover: 'transparent',
          borderActive: 'transparent',
        };
      case 'error':
        return {
          base: 'var(--color-semantic-error)',
          hover: 'var(--color-semantic-error)',
          active: 'var(--color-semantic-error)',
          disabled: 'var(--color-semantic-error)',
          text: '#FFFFFF', // White text for better contrast with red
          border: 'transparent',
          borderHover: 'transparent',
          borderActive: 'transparent',
        };
      case 'info':
        return {
          base: 'var(--color-semantic-info)',
          hover: 'var(--color-semantic-info)',
          active: 'var(--color-semantic-info)',
          disabled: 'var(--color-semantic-info)',
          text: '#FFFFFF', // White text for better contrast with blue
          border: 'transparent',
          borderHover: 'transparent',
          borderActive: 'transparent',
        };
      default:
        return {
          base: 'var(--color-brand-600)',
          hover: 'var(--color-brand-100)',
          active: 'var(--color-brand-800)',
          disabled: 'var(--color-brand-900)',
          text: '#000000', // Pure black for better contrast with bright green
          border: 'transparent',
          borderHover: 'transparent',
          borderActive: 'transparent',
        };
    }
  })();

  let dynamicBackground = palette.base as string;
  let dynamicBorder = palette.border as string;
  let dynamicTextColor = palette.text as string;
  if (!disabled) {
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
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onMouseLeave={() => { setIsActive(false); setIsHover(false); }}
      onMouseEnter={() => setIsHover(true)}
      style={{ ...baseStyles, backgroundColor: dynamicBackground, borderColor: isSecondary ? dynamicBorder : 'transparent', color: isPrimary ? baseStyles.color as string : dynamicTextColor, ...style }}
      className={className}
    >
      {children}
    </button>
  );
}


