import React, { useState } from "react";
import { ClockAlert } from "../../icons/src";

// Custom Tooltip Component
function Tooltip({ 
  children, 
  content, 
  color 
}: { 
  children: React.ReactNode; 
  content: string; 
  color?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div style={{
          position: 'absolute',
          top: '-8px',
          right: '100%',
          marginRight: '8px',
          background: '#2A2A2A',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '8px',
          fontSize: '12px',
          fontWeight: '400',
          whiteSpace: 'nowrap',
          zIndex: 1000,
          border: `1px solid ${color || '#404040'}`,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          pointerEvents: 'none'
        }}>
          {content}
          {/* Arrow pointing to the icon */}
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '-6px',
            width: '0',
            height: '0',
            borderLeft: `6px solid ${color || '#404040'}`,
            borderTop: '6px solid transparent',
            borderBottom: '6px solid transparent'
          }} />
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '-5px',
            width: '0',
            height: '0',
            borderLeft: '5px solid #2A2A2A',
            borderTop: '5px solid transparent',
            borderBottom: '5px solid transparent'
          }} />
        </div>
      )}
    </div>
  );
}

// ---------------------- Minimal Card primitives (fallback) ----------------------

export function Card({ 
  className = "", 
  children,
  tooltip,
  tooltipIcon: TooltipIcon = ClockAlert,
  color,
  noBorder = false,
  variant = "rounded",
  style
}: React.PropsWithChildren<{ 
  className?: string;
  tooltip?: string;
  tooltipIcon?: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  color?: string;
  noBorder?: boolean;
  variant?: "rounded" | "rectangle";
  style?: React.CSSProperties;
}>) {
  return (
    <div 
      style={{
        background: 'transparent', 
        border: noBorder ? 'none' : `1px solid ${color || '#404040'}`,
        borderRadius: variant === "rectangle" ? '4px' : '16px',
        padding: '12px',
        width: '100%',
        position: 'relative',
        ...style
      }}
    >
      {tooltip && (
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          cursor: 'help'
        }}>
          <Tooltip content={tooltip} color={color}>
            <TooltipIcon size={20} strokeWidth={3} color={color || '#6B7280'} />
          </Tooltip>
        </div>
      )}
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === CardHeader) {
          return React.cloneElement(child as React.ReactElement<any>, { color });
        }
        return child;
      })}
    </div>
  );
}

export function CardHeader({ 
  className = "", 
  children,
  color
}: React.PropsWithChildren<{ 
  className?: string;
  color?: string;
}>) {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      paddingBottom: '8px'
    }}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === CardTitle) {
          return React.cloneElement(child as React.ReactElement<any>, { color });
        }
        return child;
      })}
    </div>
  );
}

export function CardTitle({ 
  className = "", 
  children,
  color
}: React.PropsWithChildren<{ 
  className?: string;
  color?: string;
}>) {
  return (
    <div style={{ 
      color: color || 'white', 
      fontWeight: '500',
      fontSize: '14px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }}>
      {children}
    </div>
  );
}

export function CardContent({ className = "", children }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div>
      {children}
    </div>
  );
}
