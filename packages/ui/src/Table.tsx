import React from "react";

export type TableColumn<T> = {
  key?: keyof T;
  header: React.ReactNode;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: T, rowIndex: number) => React.ReactNode;
};

type TableProps<T extends Record<string, any>> = {
  columns: TableColumn<T>[];
  data: T[];
  className?: string;
  style?: React.CSSProperties;
  zebra?: boolean;
  compact?: boolean;
  stickyHeader?: boolean;
};

export function Table<T extends Record<string, any>>({
  columns,
  data,
  className = "",
  style,
  zebra = true,
  compact = false,
  stickyHeader = false,
}: TableProps<T>) {
  const tableStyles: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,
    background: 'transparent',
    border: '1px solid #404040',
    borderRadius: '12px',
    overflow: 'hidden',
    ...style,
  };

  const cellPadding = compact ? '8px 10px' : '12px 14px';

  return (
    <div className={className} style={{ width: '100%', overflowX: 'auto' }}>
      <table style={tableStyles}>
        <thead style={{ position: stickyHeader ? 'sticky' as const : 'static', top: 0, zIndex: 1 }}>
          <tr>
            {columns.map((col, idx) => (
              <th
                key={String(col.key) + idx}
                style={{
                  textAlign: col.align || 'left',
                  padding: cellPadding,
                  color: '#D1D5DB',
                  fontWeight: 600,
                  fontSize: 12,
                  fontFamily: 'var(--font-body)',
                  background: 'transparent',
                  borderBottom: '1px solid #2A2A2A',
                  position: stickyHeader ? 'sticky' : 'static',
                  top: 0,
                  width: col.width,
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} style={{ background: 'transparent' }}>
              {columns.map((col, colIndex) => {
                const value = col.key ? row[col.key] : undefined;
                return (
                  <td
                    key={String(col.key) + colIndex}
                    style={{
                      textAlign: col.align || 'left',
                      padding: cellPadding,
                      color: 'white',
                      fontSize: 13,
                      fontFamily: 'var(--font-body)',
                      borderBottom: '1px solid #2A2A2A',
                      width: col.width,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {col.render ? col.render(value, row, rowIndex) : String(value)}
                  </td>
                );
              })}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} style={{ padding: cellPadding, color: '#9CA3AF', textAlign: 'center' }}>
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}


