import React from "react";

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline';

export type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  dot?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

const variantToStyles: Record<BadgeVariant, { bg: string; color: string; border: string }> = {
  default: { bg: 'var(--color-brand-100)', color: '#0B0B0B', border: 'transparent' },
  success: { bg: 'rgba(22, 163, 74, 0.15)', color: 'var(--color-semantic-success)', border: 'transparent' },
  warning: { bg: 'rgba(245, 158, 11, 0.15)', color: 'var(--color-semantic-warning)', border: 'transparent' },
  error: { bg: 'rgba(239, 68, 68, 0.15)', color: 'var(--color-semantic-error)', border: 'transparent' },
  info: { bg: 'rgba(59, 130, 246, 0.15)', color: 'var(--color-semantic-info)', border: 'transparent' },
  outline: { bg: 'transparent', color: 'var(--color-neutral-300)', border: 'var(--color-neutral-600)' },
};

export function Badge({ children, variant = 'default', dot = false, className = "", style }: BadgeProps) {
  const palette = variantToStyles[variant];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: dot ? '6px' : 0,
        padding: '2px 8px',
        borderRadius: '9999px',
        background: palette.bg,
        color: palette.color,
        border: `1px solid ${palette.border}`,
        fontSize: '12px',
        fontWeight: 600,
        lineHeight: 1,
        fontFamily: 'var(--font-body)',
        ...style
      }}
      className={className}
    >
      {dot && (
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: palette.color }} />
      )}
      {children}
    </span>
  );
}
