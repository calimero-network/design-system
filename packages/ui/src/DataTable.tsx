import React, { useState, useMemo, useCallback } from 'react';
import { tokens } from '@calimero-network/mero-tokens';
import { Button } from './Button';
import { Input } from './Input';
import { Select } from './Select';
import { Pagination } from './Pagination';
import { Icon } from './Icon';

export interface DataTableColumn<T = any> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
}

export interface DataTableProps<T = any> {
  data: T[];
  columns: DataTableColumn<T>[];
  loading?: boolean;
  pagination?: {
    pageSize?: number;
    showSizeChanger?: boolean;
    showQuickJumper?: boolean;
    showTotal?: (total: number, range: [number, number]) => string;
  };
  searchable?: boolean;
  searchPlaceholder?: string;
  sortable?: boolean;
  filterable?: boolean;
  selectable?: boolean;
  selectedRowKeys?: string[];
  onSelectionChange?: (selectedKeys: string[], selectedRows: T[]) => void;
  onRowClick?: (record: T, index: number) => void;
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  onFilter?: (filters: Record<string, any>) => void;
  className?: string;
  style?: React.CSSProperties;
  rowKey?: string | ((record: T) => string);
  size?: 'small' | 'medium' | 'large';
  bordered?: boolean;
  striped?: boolean;
  hoverable?: boolean;
}

export function DataTable<T = any>({
  data,
  columns,
  loading = false,
  pagination = { pageSize: 10 },
  searchable = true,
  searchPlaceholder = 'Search...',
  sortable = true,
  filterable = false,
  selectable = false,
  selectedRowKeys = [],
  onSelectionChange,
  onRowClick,
  onSort,
  onFilter,
  className = '',
  style = {},
  rowKey = 'id',
  size = 'medium',
  bordered = true,
  striped = true,
  hoverable = true,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(pagination.pageSize || 10);
  const [filters, setFilters] = useState<Record<string, any>>({});

  // Get row key
  const getRowKey = useCallback((record: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return (record as any)[rowKey] || index.toString();
  }, [rowKey]);

  // Filter data
  const filteredData = useMemo(() => {
    let result = data;

    // Apply search
    if (searchTerm) {
      result = result.filter((record) =>
        columns.some((column) => {
          const value = column.dataIndex ? (record as any)[column.dataIndex] : '';
          return String(value).toLowerCase().includes(searchTerm.toLowerCase());
        })
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        result = result.filter((record) => {
          const recordValue = (record as any)[key];
          return String(recordValue).toLowerCase().includes(String(value).toLowerCase());
        });
      }
    });

    return result;
  }, [data, searchTerm, filters, columns]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = (a as any)[sortColumn];
      const bValue = (b as any)[sortColumn];
      
      if (aValue === bValue) return 0;
      
      const comparison = aValue < bValue ? -1 : 1;
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [filteredData, sortColumn, sortDirection]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return sortedData.slice(start, end);
  }, [sortedData, currentPage, pageSize]);

  // Handle sort
  const handleSort = useCallback((column: string) => {
    if (!sortable) return;

    const columnConfig = columns.find(col => col.key === column);
    if (!columnConfig?.sortable) return;

    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }

    onSort?.(column, sortColumn === column ? (sortDirection === 'asc' ? 'desc' : 'asc') : 'asc');
  }, [sortable, columns, sortColumn, sortDirection, onSort]);

  // Handle selection
  const handleSelectAll = useCallback((checked: boolean) => {
    if (!selectable || !onSelectionChange) return;

    if (checked) {
      const allKeys = paginatedData.map((record, index) => getRowKey(record, index));
      onSelectionChange(allKeys, paginatedData);
    } else {
      onSelectionChange([], []);
    }
  }, [selectable, onSelectionChange, paginatedData, getRowKey]);

  const handleSelectRow = useCallback((record: T, index: number, checked: boolean) => {
    if (!selectable || !onSelectionChange) return;

    const key = getRowKey(record, index);
    const newSelectedKeys = checked
      ? [...selectedRowKeys, key]
      : selectedRowKeys.filter(k => k !== key);
    
    const newSelectedRows = data.filter((record, index) => 
      newSelectedKeys.includes(getRowKey(record, index))
    );

    onSelectionChange(newSelectedKeys, newSelectedRows);
  }, [selectable, onSelectionChange, selectedRowKeys, data, getRowKey]);

  // Size styles
  const sizeStyles = {
    small: { padding: '8px 12px', fontSize: '12px' },
    medium: { padding: '12px 16px', fontSize: '14px' },
    large: { padding: '16px 20px', fontSize: '16px' },
  };

  const currentSizeStyle = sizeStyles[size];

  return (
    <div className={className} style={style}>
      {/* Search and Filters */}
      {(searchable || filterable) && (
        <div style={{ marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          {searchable && (
            <div style={{ flex: 1, maxWidth: '300px' }}>
              <Input
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
          )}
          {filterable && (
            <div style={{ display: 'flex', gap: '8px' }}>
              {columns
                .filter(col => col.filterable)
                .map(column => (
                  <Select
                    key={column.key}
                    placeholder={`Filter ${column.title}`}
                    value={filters[column.key] || ''}
                    onChange={(value) => {
                      const newFilters = { ...filters, [column.key]: value };
                      setFilters(newFilters);
                      onFilter?.(newFilters);
                    }}
                    style={{ minWidth: '120px' }}
                    options={[
                      { value: '', label: 'All' },
                      ...Array.from(new Set(data.map(record => (record as any)[column.dataIndex as keyof T])))
                        .map(value => ({
                          value: String(value),
                          label: String(value)
                        }))
                    ]}
                  />
                ))}
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div style={{ overflow: 'auto', border: bordered ? `1px solid ${tokens.color.neutral[600].value}` : 'none', borderRadius: '8px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'transparent' }}>
          <thead>
            <tr style={{ background: 'var(--color-background-secondary)' }}>
              {selectable && (
                <th style={{ 
                  ...currentSizeStyle, 
                  width: '50px', 
                  textAlign: 'center',
                  borderBottom: `1px solid ${tokens.color.neutral[600].value}`,
                  color: '#FFFFFF',
                  fontWeight: 600,
                }}>
                  <input
                    type="checkbox"
                    checked={paginatedData.length > 0 && paginatedData.every((record, index) => 
                      selectedRowKeys.includes(getRowKey(record, index))
                    )}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    style={{ margin: 0 }}
                  />
                </th>
              )}
              {columns.map(column => (
                <th
                  key={column.key}
                  style={{
                    ...currentSizeStyle,
                    width: column.width,
                    textAlign: column.align || 'left',
                    borderBottom: `1px solid ${tokens.color.neutral[600].value}`,
                    color: '#FFFFFF',
                    fontWeight: 600,
                    cursor: column.sortable ? 'pointer' : 'default',
                    userSelect: 'none',
                    position: column.fixed ? 'sticky' : 'static',
                    left: column.fixed === 'left' ? 0 : undefined,
                    right: column.fixed === 'right' ? 0 : undefined,
                    zIndex: column.fixed ? 10 : 1,
                    background: column.fixed ? 'var(--color-background-secondary)' : 'transparent',
                  }}
                  onClick={() => handleSort(column.key)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {column.title}
                    {column.sortable && (
                      <div style={{ display: 'flex', flexDirection: 'column', fontSize: '10px' }}>
                        <span style={{ 
                          color: sortColumn === column.key && sortDirection === 'asc' ? tokens.color.brand[600].value : tokens.color.neutral[400].value 
                        }}>
                          ▲
                        </span>
                        <span style={{ 
                          color: sortColumn === column.key && sortDirection === 'desc' ? tokens.color.brand[600].value : tokens.color.neutral[400].value 
                        }}>
                          ▼
                        </span>
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} style={{ 
                  ...currentSizeStyle, 
                  textAlign: 'center', 
                  color: tokens.color.neutral[400].value 
                }}>
                  Loading...
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} style={{ 
                  ...currentSizeStyle, 
                  textAlign: 'center', 
                  color: tokens.color.neutral[400].value 
                }}>
                  No data found
                </td>
              </tr>
            ) : (
              paginatedData.map((record, index) => {
                const key = getRowKey(record, index);
                const isSelected = selectedRowKeys.includes(key);
                
                return (
                  <tr
                    key={key}
                    style={{
                      background: striped && index % 2 === 1 ? 'var(--color-background-primary)' : 'transparent',
                      cursor: onRowClick ? 'pointer' : 'default',
                      opacity: isSelected ? 0.7 : 1,
                    }}
                    onClick={() => onRowClick?.(record, index)}
                    onMouseEnter={(e) => {
                      if (hoverable) {
                        e.currentTarget.style.background = 'var(--color-background-secondary)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (hoverable) {
                        e.currentTarget.style.background = striped && index % 2 === 1 ? 'var(--color-background-primary)' : 'transparent';
                      }
                    }}
                  >
                    {selectable && (
                      <td style={{ 
                        ...currentSizeStyle, 
                        textAlign: 'center',
                        borderBottom: `1px solid ${tokens.color.neutral[700].value}`,
                        color: '#FFFFFF',
                      }}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => handleSelectRow(record, index, e.target.checked)}
                          style={{ margin: 0 }}
                        />
                      </td>
                    )}
                    {columns.map(column => (
                      <td
                        key={column.key}
                        style={{
                          ...currentSizeStyle,
                          textAlign: column.align || 'left',
                          borderBottom: `1px solid ${tokens.color.neutral[700].value}`,
                          color: '#FFFFFF',
                          position: column.fixed ? 'sticky' : 'static',
                          left: column.fixed === 'left' ? 0 : undefined,
                          right: column.fixed === 'right' ? 0 : undefined,
                          zIndex: column.fixed ? 10 : 1,
                          background: column.fixed ? (striped && index % 2 === 1 ? 'var(--color-background-primary)' : 'transparent') : 'transparent',
                        }}
                      >
                        {column.render 
                          ? column.render((record as any)[column.dataIndex as keyof T], record, index)
                          : String((record as any)[column.dataIndex as keyof T] || '')
                        }
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div style={{ 
          marginTop: '16px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ color: tokens.color.neutral[300].value, fontSize: '14px' }}>
            {pagination.showTotal ? (
              pagination.showTotal(sortedData.length, [
                (currentPage - 1) * pageSize + 1,
                Math.min(currentPage * pageSize, sortedData.length)
              ])
            ) : (
              `Showing ${(currentPage - 1) * pageSize + 1}-${Math.min(currentPage * pageSize, sortedData.length)} of ${sortedData.length} items`
            )}
          </div>
          
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(sortedData.length / pageSize)}
            onPageChange={setCurrentPage}
            showFirstLast={pagination.showSizeChanger}
            showPrevNext={pagination.showQuickJumper}
          />
        </div>
      )}
    </div>
  );
}
