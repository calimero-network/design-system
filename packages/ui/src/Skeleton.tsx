import React from 'react';
import { tokens } from '@calimero-network/mero-tokens';

export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  variant?: 'text' | 'rectangular' | 'circular';
  animation?: 'pulse' | 'wave' | 'none';
  lines?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  variant = 'rectangular',
  animation = 'pulse',
  lines = 1,
  className = '',
  style = {},
}) => {
  const baseStyle = {
    backgroundColor: tokens.color.background.tertiary.value,
    borderRadius: variant === 'circular' ? '50%' : tokens.radius.sm.value,
    width: width || (variant === 'text' ? '100%' : '200px'),
    height: height || (variant === 'text' ? '1em' : '20px'),
    display: 'inline-block',
    ...style,
  };

  const animationStyles = {
    pulse: {
      animation: 'skeleton-pulse 1.5s ease-in-out infinite',
    },
    wave: {
      background: `linear-gradient(90deg, ${tokens.color.background.tertiary.value} 25%, ${tokens.color.background.brand.value} 50%, ${tokens.color.background.tertiary.value} 75%)`,
      backgroundSize: '200% 100%',
      animation: 'skeleton-wave 1.5s ease-in-out infinite',
    },
    none: {},
  };

  const combinedStyle = {
    ...baseStyle,
    ...animationStyles[animation],
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={className}>
        {Array.from({ length: lines }, (_, index) => (
          <div
            key={index}
            style={{
              ...combinedStyle,
              width: index === lines - 1 ? '75%' : '100%',
              marginBottom: index < lines - 1 ? '8px' : 0,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          @keyframes skeleton-pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
          
          @keyframes skeleton-wave {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
        `}
      </style>
      <div className={className} style={combinedStyle} />
    </>
  );
};
