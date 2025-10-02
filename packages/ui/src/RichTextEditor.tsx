import React, { forwardRef, useRef, useEffect, useState, useCallback } from 'react';
import { tokens } from '@calimero-network/mero-tokens';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { TextAlign } from '@tiptap/extension-text-align';
import { Underline } from '@tiptap/extension-underline';
import { Link } from '@tiptap/extension-link';
// Using default Tiptap icons instead of custom ones

export interface RichTextEditorProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outlined';
  minHeight?: number;
  maxHeight?: number;
  onChange?: (html: string) => void;
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
  onSelectionChange?: (selection: Selection | null) => void;
  toolbar?: boolean;
  customToolbar?: React.ReactNode;
}

export const RichTextEditor = forwardRef<HTMLDivElement, RichTextEditorProps>(({
  value,
  defaultValue,
  placeholder,
  disabled = false,
  readOnly = false,
  required = false,
  error = false,
  helperText,
  label,
  className = '',
  style = {},
  size = 'md',
  variant = 'default',
  minHeight = 120,
  maxHeight = 400,
  onChange,
  onFocus,
  onBlur,
  onSelectionChange,
  toolbar = true,
  customToolbar,
}, ref) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [currentValue, setCurrentValue] = useState(value || defaultValue || '');

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'rich-text-link',
        },
      }),
    ],
    content: currentValue,
    editable: !disabled && !readOnly,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setCurrentValue(html);
      onChange?.(html);
    },
    onSelectionUpdate: ({ editor }) => {
      const selection = window.getSelection();
      onSelectionChange?.(selection);
    },
    editorProps: {
      attributes: {
        class: 'rich-text-editor-content',
        style: 'outline: none; min-height: inherit;',
      },
    },
  });

  // Update editor content when external value changes
  useEffect(() => {
    if (value !== undefined && editor && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  // Update internal value when external value changes
  useEffect(() => {
    if (value !== undefined) {
      setCurrentValue(value);
    }
  }, [value]);

  const sizeStyles = {
    sm: {
      padding: '6px 8px',
      fontSize: '14px',
      minHeight: `${Math.max(minHeight, 80)}px`,
    },
    md: {
      padding: '8px 12px',
      fontSize: '16px',
      minHeight: `${Math.max(minHeight, 120)}px`,
    },
    lg: {
      padding: '12px 16px',
      fontSize: '18px',
      minHeight: `${Math.max(minHeight, 160)}px`,
    },
  };

  const variantStyles = {
    default: {
      backgroundColor: 'transparent',
      border: `1px solid ${error ? tokens.color.semantic.error.value : tokens.color.neutral[600].value}`,
    },
    filled: {
      backgroundColor: tokens.color.neutral[800].value,
      border: `1px solid ${error ? tokens.color.semantic.error.value : 'transparent'}`,
    },
    outlined: {
      backgroundColor: 'transparent',
      border: `2px solid ${error ? tokens.color.semantic.error.value : tokens.color.neutral[600].value}`,
    },
  };

  const baseStyle: React.CSSProperties = {
    width: '100%',
    fontFamily: 'var(--font-body)',
    color: '#FFFFFF',
    borderRadius: tokens.radius.md.value,
    outline: 'none',
    transition: 'all 0.2s ease',
    fontWeight: '400',
    lineHeight: '1.5',
    overflow: 'auto',
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...style,
  };

  const focusStyle = {
    borderColor: error ? tokens.color.semantic.error.value : tokens.color.brand[600].value,
    boxShadow: `0 0 0 3px ${error ? tokens.color.brand[100].value : tokens.color.brand[100].value}`,
  };

  const disabledStyle = {
    backgroundColor: 'transparent',
    color: tokens.color.neutral[300].value,
    cursor: 'not-allowed',
    opacity: 0.6,
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '14px',
    fontWeight: 500,
    color: '#FFFFFF',
    marginBottom: '4px',
    fontFamily: 'var(--font-body)',
    lineHeight: '1.4',
  };

  const helperTextStyle: React.CSSProperties = {
    fontSize: '12px',
    color: error ? tokens.color.semantic.error.value : tokens.color.neutral[300].value,
    marginTop: '4px',
    fontFamily: 'var(--font-body)',
    lineHeight: '1.4',
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  };

  const toolbarStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '8px 12px',
    backgroundColor: tokens.color.neutral[800].value,
    border: `1px solid ${tokens.color.neutral[600].value}`,
    borderBottom: 'none',
    borderRadius: `${tokens.radius.md.value} ${tokens.radius.md.value} 0 0`,
    flexWrap: 'wrap',
  };

  const toolbarButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px 8px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '4px',
    color: '#FFFFFF',
    cursor: 'pointer',
    fontSize: '14px',
    fontFamily: 'var(--font-body)',
    transition: 'background-color 0.2s ease',
    minWidth: '32px',
    height: '32px',
  };

  const separatorStyle: React.CSSProperties = {
    width: '1px',
    height: '20px',
    backgroundColor: tokens.color.neutral[600].value,
    margin: '0 4px',
  };

  const editorStyle: React.CSSProperties = {
    ...baseStyle,
    maxHeight: `${maxHeight}px`,
    ...(disabled ? disabledStyle : {}),
    ...(isFocused ? focusStyle : {}),
  };

  const handleFocus = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  }, [onFocus]);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  }, [onBlur]);

  const executeCommand = useCallback((command: () => void) => {
    if (editor && !disabled && !readOnly) {
      command();
      editor.commands.focus();
    }
  }, [editor, disabled, readOnly]);

  const insertLink = useCallback(() => {
    const url = prompt('Enter URL:');
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  const changeTextColor = useCallback(() => {
    const color = prompt('Enter color (e.g., #ff0000 or red):');
    if (color && editor) {
      editor.chain().focus().setColor(color).run();
    }
  }, [editor]);

  const changeHighlightColor = useCallback(() => {
    const color = prompt('Enter highlight color (e.g., #ffff00 or yellow):');
    if (color && editor) {
      // For now, just set the text color as highlight functionality requires additional extension
      editor.chain().focus().setColor(color).run();
    }
  }, [editor]);

  const insertHeading = useCallback(() => {
    const level = prompt('Enter heading level (1-6):');
    if (level && ['1', '2', '3', '4', '5', '6'].includes(level) && editor) {
      editor.chain().focus().toggleHeading({ level: parseInt(level) as 1 | 2 | 3 | 4 | 5 | 6 }).run();
    }
  }, [editor]);

  const insertList = useCallback(() => {
    if (editor) {
      editor.chain().focus().toggleBulletList().run();
    }
  }, [editor]);

  const insertQuote = useCallback(() => {
    if (editor) {
      editor.chain().focus().toggleBlockquote().run();
    }
  }, [editor]);

  const insertCode = useCallback(() => {
    if (editor) {
      editor.chain().focus().toggleCodeBlock().run();
    }
  }, [editor]);

  const toolbarItems = [
    {
      label: 'Bold',
      icon: 'B',
      action: () => executeCommand(() => editor?.chain().focus().toggleBold().run()),
      isActive: editor?.isActive('bold'),
    },
    {
      label: 'Italic',
      icon: 'I',
      action: () => executeCommand(() => editor?.chain().focus().toggleItalic().run()),
      isActive: editor?.isActive('italic'),
    },
    {
      label: 'Underline',
      icon: 'U',
      action: () => executeCommand(() => editor?.chain().focus().toggleUnderline().run()),
      isActive: editor?.isActive('underline'),
    },
    { type: 'separator' },
    {
      label: 'Heading',
      icon: 'H',
      action: insertHeading,
      isActive: editor?.isActive('heading'),
    },
    {
      label: 'List',
      icon: '•',
      action: insertList,
      isActive: editor?.isActive('bulletList'),
    },
    {
      label: 'Quote',
      icon: '"',
      action: insertQuote,
      isActive: editor?.isActive('blockquote'),
    },
    {
      label: 'Code',
      icon: '</>',
      action: insertCode,
      isActive: editor?.isActive('codeBlock'),
    },
    { type: 'separator' },
    {
      label: 'Link',
      icon: '🔗',
      action: insertLink,
      isActive: editor?.isActive('link'),
    },
    {
      label: 'Color',
      icon: 'A',
      action: changeTextColor,
    },
    {
      label: 'Highlight',
      icon: 'H',
      action: changeHighlightColor,
    },
  ];

  const renderToolbarItem = useCallback((item: any, index: number) => {
    if (item.type === 'separator') {
      return <div key={`separator-${index}`} style={separatorStyle} />;
    }

    const isActive = item.isActive || false;

    return (
      <button
        key={`toolbar-${index}`}
        type="button"
        style={{
          ...toolbarButtonStyle,
          backgroundColor: isActive ? tokens.color.brand[600].value : 'transparent',
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = tokens.color.neutral[700].value;
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
        onClick={item.action}
        disabled={disabled || readOnly}
        title={item.label}
      >
        {item.icon}
      </button>
    );
  }, [disabled, readOnly, toolbarButtonStyle]);

  if (!editor) {
    return null;
  }

  return (
    <div className={className} style={containerStyle}>
      {label && (
        <label style={labelStyle}>
          {label}
          {required && <span style={{ color: tokens.color.semantic.error.value, marginLeft: '4px' }}>*</span>}
        </label>
      )}

      {toolbar && !customToolbar && (
        <div style={toolbarStyle}>
          {toolbarItems.map(renderToolbarItem)}
        </div>
      )}
      
      {customToolbar && (
        <div style={toolbarStyle}>
          {customToolbar}
        </div>
      )}

      <div
        ref={ref || editorRef}
        style={editorStyle}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <EditorContent editor={editor} />
      </div>

      {helperText && (
        <div style={helperTextStyle}>
          {helperText}
        </div>
      )}

      <style>{`
        .rich-text-editor-content {
          background-color: transparent !important;
          color: #FFFFFF !important;
          border: none !important;
          outline: none !important;
          padding: 8px 12px !important;
          min-height: inherit !important;
        }
        
        .rich-text-editor-content:focus {
          outline: none !important;
        }
        
        .rich-text-editor-content h1, 
        .rich-text-editor-content h2, 
        .rich-text-editor-content h3, 
        .rich-text-editor-content h4, 
        .rich-text-editor-content h5, 
        .rich-text-editor-content h6 {
          color: #FFFFFF !important;
          margin: 0.5em 0 !important;
        }
        
        .rich-text-editor-content h1 { font-size: 1.5em !important; }
        .rich-text-editor-content h2 { font-size: 1.3em !important; }
        .rich-text-editor-content h3 { font-size: 1.1em !important; }
        .rich-text-editor-content h4 { font-size: 1em !important; }
        .rich-text-editor-content h5 { font-size: 0.9em !important; }
        .rich-text-editor-content h6 { font-size: 0.8em !important; }
        
        .rich-text-editor-content p {
          margin: 0.5em 0 !important;
          color: #FFFFFF !important;
        }
        
        .rich-text-editor-content ul, 
        .rich-text-editor-content ol {
          margin: 0.5em 0 !important;
          padding-left: 1.5em !important;
          color: #FFFFFF !important;
        }
        
        .rich-text-editor-content li {
          margin: 0.25em 0 !important;
          color: #FFFFFF !important;
        }
        
        .rich-text-editor-content blockquote {
          margin: 0.5em 0 !important;
          padding: 0.5em 1em !important;
          border-left: 3px solid ${tokens.color.brand[600].value} !important;
          background-color: ${tokens.color.neutral[800].value} !important;
          font-style: italic !important;
          color: #FFFFFF !important;
        }
        
        .rich-text-editor-content pre {
          margin: 0.5em 0 !important;
          padding: 0.5em !important;
          background-color: ${tokens.color.neutral[800].value} !important;
          border-radius: 4px !important;
          font-family: 'Courier New', monospace !important;
          overflow-x: auto !important;
          color: #FFFFFF !important;
        }
        
        .rich-text-editor-content code {
          background-color: ${tokens.color.neutral[800].value} !important;
          padding: 0.2em 0.4em !important;
          border-radius: 3px !important;
          font-family: 'Courier New', monospace !important;
          color: #FFFFFF !important;
        }
        
        .rich-text-link {
          color: ${tokens.color.brand[600].value} !important;
          text-decoration: underline !important;
        }
        
        .rich-text-link:hover {
          color: ${tokens.color.brand[100].value} !important;
        }
        
        .rich-text-editor-content strong, 
        .rich-text-editor-content b {
          font-weight: bold !important;
          color: #FFFFFF !important;
        }
        
        .rich-text-editor-content em, 
        .rich-text-editor-content i {
          font-style: italic !important;
          color: #FFFFFF !important;
        }
        
        .rich-text-editor-content u {
          text-decoration: underline !important;
          color: #FFFFFF !important;
        }
        
        .rich-text-editor-content s, 
        .rich-text-editor-content strike {
          text-decoration: line-through !important;
          color: #FFFFFF !important;
        }
        
        .rich-text-editor-content p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: ${tokens.color.neutral[400].value};
          pointer-events: none;
          height: 0;
        }
      `}</style>
    </div>
  );
});

RichTextEditor.displayName = 'RichTextEditor';