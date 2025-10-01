import React from "react";
import { Button } from "./Button";

type ErrorViewProps = {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: 'error' | 'empty' | 'not-found';
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  showAction?: boolean;
};

export function ErrorView({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  actionLabel = "Try Again",
  onAction,
  variant = 'error',
  icon,
  className = "",
  style,
  showAction = true
}: ErrorViewProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'empty':
        return {
          iconColor: 'var(--color-neutral-400)',
          titleColor: 'var(--color-neutral-300)',
          messageColor: 'var(--color-neutral-400)',
          backgroundColor: 'transparent'
        };
      case 'not-found':
        return {
          iconColor: 'var(--color-neutral-400)',
          titleColor: 'var(--color-neutral-300)',
          messageColor: 'var(--color-neutral-400)',
          backgroundColor: 'transparent'
        };
      default: // error
        return {
          iconColor: 'var(--color-semantic-error)',
          titleColor: 'var(--color-semantic-error)',
          messageColor: 'var(--color-neutral-300)',
          backgroundColor: 'transparent'
        };
    }
  };

  const variantStyles = getVariantStyles();

  const getDefaultIcon = () => {
    switch (variant) {
      case 'empty':
        return (
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-background-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            color: variantStyles.iconColor
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
        );
      case 'not-found':
        return (
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-background-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            color: variantStyles.iconColor
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
        );
      default: // error
        return (
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-background-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            color: variantStyles.iconColor
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          </div>
        );
    }
  };

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '32px 16px',
    backgroundColor: variantStyles.backgroundColor,
    borderRadius: 'var(--radius-lg)',
    ...style
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: '600',
    color: variantStyles.titleColor,
    marginBottom: '8px',
    fontFamily: 'var(--font-body)'
  };

  const messageStyles: React.CSSProperties = {
    fontSize: '14px',
    color: variantStyles.messageColor,
    marginBottom: '24px',
    lineHeight: '1.5',
    maxWidth: '400px',
    fontFamily: 'var(--font-body)'
  };

  return (
    <div className={className} style={containerStyles}>
      {icon || getDefaultIcon()}
      <h2 style={titleStyles}>{title}</h2>
      <p style={messageStyles}>{message}</p>
      {showAction && onAction && (
        <Button
          onClick={onAction}
          variant={variant === 'error' ? 'error' : 'primary'}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

// Empty state component
export function EmptyView({
  title = "No data available",
  message = "There's nothing to show here yet.",
  actionLabel = "Get Started",
  onAction,
  icon,
  className = "",
  style
}: Omit<ErrorViewProps, 'variant'>) {
  return (
    <ErrorView
      title={title}
      message={message}
      actionLabel={actionLabel}
      onAction={onAction}
      variant="empty"
      icon={icon}
      className={className}
      style={style}
    />
  );
}

// Not found component
export function NotFoundView({
  title = "Page not found",
  message = "The page you're looking for doesn't exist.",
  actionLabel = "Go Back",
  onAction,
  icon,
  className = "",
  style
}: Omit<ErrorViewProps, 'variant'>) {
  return (
    <ErrorView
      title={title}
      message={message}
      actionLabel={actionLabel}
      onAction={onAction}
      variant="not-found"
      icon={icon}
      className={className}
      style={style}
    />
  );
}
