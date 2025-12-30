import React from 'react';
import './DataTable.scss';

interface Column {
  key: string;
  label: string;
  render?: (value: any, item: any) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  onAdd?: () => void;
  loading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
  emptyMessage?: string;
  searchable?: boolean;
  onSearch?: (query: string) => void;
  pagination?: {
    current: number;
    total: number;
    pageSize: number;
    onPageChange: (page: number) => void;
  };
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  onEdit,
  onDelete,
  onAdd,
  loading = false,
  error = null,
  onRetry,
  emptyMessage = 'No data available',
  searchable = false,
  onSearch,
  pagination
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  const renderPagination = () => {
    if (!pagination) return null;

    const { current, total, pageSize, onPageChange } = pagination;
    const totalPages = Math.ceil(total / pageSize);
    const startItem = (current - 1) * pageSize + 1;
    const endItem = Math.min(current * pageSize, total);

    return (
      <div className="data-table__pagination">
        <div className="data-table__pagination-info">
          Showing {startItem} to {endItem} of {total} entries
        </div>
        <div className="data-table__pagination-controls">
          <button
            className="data-table__pagination-btn"
            onClick={() => onPageChange(current - 1)}
            disabled={current <= 1}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <span className="data-table__pagination-current">
            Page {current} of {totalPages}
          </span>
          <button
            className="data-table__pagination-btn"
            onClick={() => onPageChange(current + 1)}
            disabled={current >= totalPages}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="data-table">
      {(searchable || onAdd) && (
        <div className="data-table__header">
          {searchable && (
            <div className="data-table__search">
              <i className="fa-solid fa-search"></i>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="data-table__search-input"
              />
            </div>
          )}
          {onAdd && (
            <button className="data-table__add-btn" onClick={onAdd}>
              <i className="fa-solid fa-plus"></i>
              Add New
            </button>
          )}
        </div>
      )}

      <div className="data-table__container">
        <table className="data-table__table">
          <thead className="data-table__thead">
            <tr className="data-table__tr">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="data-table__th"
                  style={{ width: column.width }}
                >
                  {column.label}
                  {column.sortable && (
                    <i className="fa-solid fa-sort data-table__sort-icon"></i>
                  )}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="data-table__th data-table__th--actions">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="data-table__tbody">
            {loading ? (
              <tr className="data-table__tr">
                <td
                  className="data-table__td data-table__td--loading"
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                >
                  <div className="data-table__loading-state">
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    <span>Fetching data...</span>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr className="data-table__tr">
                <td
                  className="data-table__td data-table__td--error"
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                >
                  <div className="data-table__error-state">
                    <i className="fa-solid fa-exclamation-triangle"></i>
                    <span>Fetching failed</span>
                    {onRetry && (
                      <button
                        className="data-table__retry-btn"
                        onClick={onRetry}
                        type="button"
                      >
                        <i className="fa-solid fa-refresh"></i>
                        Retry
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr className="data-table__tr">
                <td
                  className="data-table__td data-table__td--empty"
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                >
                  <div className="data-table__empty">
                    <i className="fa-solid fa-inbox"></i>
                    <span>{emptyMessage}</span>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={item.id || index} className="data-table__tr">
                  {columns.map((column) => {
                    const value = item[column.key];
                    const displayValue = column.render
                      ? column.render(value, item)
                      : typeof value === 'object' && value !== null && !Array.isArray(value)
                      ? JSON.stringify(value)
                      : Array.isArray(value)
                      ? value.join(', ')
                      : value;
                    
                    return (
                      <td key={column.key} className="data-table__td">
                        {displayValue}
                      </td>
                    );
                  })}
                  {(onEdit || onDelete) && (
                    <td className="data-table__td data-table__td--actions">
                      <div className="data-table__actions">
                        {onEdit && (
                          <button
                            className="data-table__action-btn data-table__action-btn--edit"
                            onClick={() => onEdit(item)}
                            title="Edit"
                          >
                            <i className="fa-solid fa-edit"></i>
                          </button>
                        )}
                        {onDelete && (
                          <button
                            className="data-table__action-btn data-table__action-btn--delete"
                            onClick={() => onDelete(item)}
                            title="Delete"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {renderPagination()}
    </div>
  );
};

export default DataTable;
