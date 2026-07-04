import { useState } from 'react'
import './FilterSidebar.css'

// Wraps a listing page's filter sidebar. On desktop it's just a passthrough
// (the sidebar renders inline as before). On responsive widths the sidebar
// is hidden by default — instead of sitting inline and scrolling out of
// reach — and a floating button opens it as a slide-in drawer.
function FilterSidebar({ className = '', children }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button className="filter-fab" onClick={() => setOpen(true)}>
        <i className="fa-solid fa-sliders"></i> Filters
      </button>

      <aside className={`${className} filter-sidebar${open ? ' filter-sidebar--open' : ''}`}>
        <div className="filter-sidebar__header">
          <span>Filters</span>
          <button className="filter-sidebar__close" onClick={() => setOpen(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        {children}
      </aside>

      {open && <div className="filter-sidebar__overlay" onClick={() => setOpen(false)} />}
    </>
  )
}

export default FilterSidebar
