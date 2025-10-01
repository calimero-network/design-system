import React, { useState } from 'react';
import { tokens } from '@calimero-network/mero-tokens';
import { Icon } from './Icon';

export interface AccordionItemProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  defaultOpen = false,
  disabled = false,
  className = '',
  style = {},
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    backgroundColor: tokens.color.background.primary.value,
    border: `1px solid ${tokens.color.neutral[600].value}`,
    borderBottom: isOpen ? 'none' : `1px solid ${tokens.color.neutral[600].value}`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    opacity: disabled ? 0.6 : 1,
  };

  const contentStyle = {
    padding: '16px',
    backgroundColor: tokens.color.background.primary.value,
    border: `1px solid ${tokens.color.neutral[600].value}`,
    borderTop: 'none',
    borderBottomLeftRadius: tokens.radius.md.value,
    borderBottomRightRadius: tokens.radius.md.value,
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    maxHeight: isOpen ? '1000px' : '0',
    opacity: isOpen ? 1 : 0,
  };

  const titleStyle = {
    fontSize: '16px',
    fontWeight: 500,
    color: tokens.color.background.primary.value,
    margin: 0,
  };

  const iconStyle = {
    transition: 'transform 0.2s ease',
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
  };

  return (
    <div className={className} style={style}>
      <div style={headerStyle} onClick={handleToggle}>
        <div style={titleStyle}>{title}</div>
        <Icon name="chevron-down" size="sm" style={iconStyle} />
      </div>
      <div style={contentStyle}>
        {children}
      </div>
    </div>
  );
};

export interface AccordionProps {
  children: React.ReactNode;
  allowMultiple?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Accordion: React.FC<AccordionProps> = ({
  children,
  allowMultiple = false,
  className = '',
  style = {},
}) => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0',
    ...style,
  };

  return (
    <div className={className} style={containerStyle}>
      {children}
    </div>
  );
};
