import React from "react";
import { ClockAlert } from "@calimero/icons";

// ---------------------- Minimal Card primitives (fallback) ----------------------

export function Card({ 
  className = "", 
  children,
  tooltip,
  tooltipIcon: TooltipIcon = ClockAlert,
  color,
  noBorder = false,
  style
}: React.PropsWithChildren<{ 
  className?: string;
  tooltip?: string;
  tooltipIcon?: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  color?: string;
  noBorder?: boolean;
  style?: React.CSSProperties;
}>) {
  return (
    <div 
      style={{
        background: '#1A1A1A', 
        border: noBorder ? 'none' : `1px solid ${color || '#404040'}`,
        borderRadius: '16px',
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
        }} title={tooltip}>
          <TooltipIcon size={20} strokeWidth={3} color={color || '#6B7280'} />
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
