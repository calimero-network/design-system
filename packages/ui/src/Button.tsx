import React from "react";

type ButtonProps = React.PropsWithChildren<{
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
}>;

export function Button({
  children,
  onClick,
  disabled = false,
  className = "",
  style,
  type = "button",
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
    color: '#0B0B0B',
    backgroundColor: disabled ? 'var(--color-brand-900)' : 'var(--color-brand-600)',
  };

  const [isActive, setIsActive] = React.useState(false);
  const [isHover, setIsHover] = React.useState(false);

  let dynamicBackground = baseStyles.backgroundColor as string;
  if (!disabled) {
    if (isActive) {
      dynamicBackground = 'var(--color-brand-800)';
    } else if (isHover) {
      dynamicBackground = 'var(--color-brand-100)';
    } else {
      dynamicBackground = 'var(--color-brand-600)';
    }
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
      style={{ ...baseStyles, backgroundColor: dynamicBackground, ...style }}
      className={className}
    >
      {children}
    </button>
  );
}


