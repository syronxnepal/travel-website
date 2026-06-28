import { useState } from 'react'
import './DataTable.css'

function DataTable({ columns, data, loading, onEdit, onDelete, onView, emptyText = 'No records found' }) {
  const [search, setSearch] = useState('')

  const filtered = data?.filter((row) =>
    columns.some((col) => String(row[col.key] ?? '').toLowerCase().includes(search.toLowerCase()))
  ) ?? []

  return (
    <div className={`data-table-wrapper${loading ? ' data-table--loading' : ''}`}>
      <div className="data-table-toolbar">
        <div className="data-table-search">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {(onEdit || onDelete || onView) && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + 1} className="data-table__empty">
                <div className="loading-spinner" />
              </td>
            </tr>
          ) : filtered.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="data-table__empty">{emptyText}</td>
            </tr>
          ) : (
            filtered.map((row, i) => (
              <tr key={row._id || row.id || i}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
                {(onEdit || onDelete || onView) && (
                  <td className="data-table__actions">
                    {onView && (
                      <button className="data-table__btn data-table__btn--view" onClick={() => onView(row)} title="View">
                        <i className="fa-solid fa-eye"></i>
                      </button>
                    )}
                    {onEdit && (
                      <button className="data-table__btn data-table__btn--edit" onClick={() => onEdit(row)} title="Edit">
                        <i className="fa-solid fa-pen"></i>
                      </button>
                    )}
                    {onDelete && (
                      <button className="data-table__btn data-table__btn--delete" onClick={() => onDelete(row)} title="Delete">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="data-table-footer">
        <span>{filtered.length} record{filtered.length !== 1 ? 's' : ''}</span>
      </div>
    </div>
  )
}

export default DataTable
