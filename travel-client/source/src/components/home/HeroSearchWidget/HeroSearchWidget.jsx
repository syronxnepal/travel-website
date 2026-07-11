import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchApi } from '../../../services/api'
import './HeroSearchWidget.css'

const TYPE_BADGE = { trek: 'Trek', tour: 'Tour', shortTour: 'Short Tour' }
const BOOKING_TYPE = { trek: 'trek', tour: 'tour', shortTour: 'short-tour' }
const BADGE_COLOR = { trek: '#22c55e', tour: '#3b82f6', shortTour: '#e79520' }

function HeroSearchWidget() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState(null)
  const [open, setOpen] = useState(false)
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [persons, setPersons] = useState(1)
  const inputRef = useRef(null)
  const wrapRef = useRef(null)
  const timerRef = useRef(null)
  const navigate = useNavigate()

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Live search
  useEffect(() => {
    clearTimeout(timerRef.current)
    if (!query.trim() || selected) { setResults([]); setOpen(false); return }
    timerRef.current = setTimeout(() => {
      setLoading(true)
      searchApi.search(query.trim())
        .then((res) => {
          const data = res?.data || {}
          const flat = [
            ...(data.treks || []).map((i) => ({ ...i, _type: 'trek' })),
            ...(data.tours || []).map((i) => ({ ...i, _type: 'tour' })),
            ...(data.shortTours || []).map((i) => ({ ...i, _type: 'shortTour' })),
          ]
          setResults(flat)
          setOpen(flat.length > 0)
        })
        .catch(() => setResults([]))
        .finally(() => setLoading(false))
    }, 280)
    return () => clearTimeout(timerRef.current)
  }, [query, selected])

  function pick(item) {
    setSelected(item)
    setQuery(item.title)
    setOpen(false)
  }

  function handleSearch() {
    if (!selected) return
    const id = selected._id || selected.id
    const params = new URLSearchParams()
    if (dateFrom) params.set('date', dateFrom)
    if (persons > 1) params.set('persons', persons)
    const qs = params.toString()
    navigate(`/booking/${BOOKING_TYPE[selected._type]}/${id}${qs ? `?${qs}` : ''}`)
  }

  function handleInput(e) {
    setSelected(null)
    setQuery(e.target.value)
  }

  return (
    <div className="hero-search">
      <div className="hero-search__card">
        {/* Search field */}
        <div className="hero-search__field hero-search__field--main" ref={wrapRef}>
          <label>Search Trek, Tour, or Short Tour</label>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInput}
            onFocus={() => results.length > 0 && setOpen(true)}
            placeholder="Search for a trek, tour, or short tour"
            className={selected ? 'hero-search__input--selected' : ''}
          />
          {open && (
            <div className="hero-search__dropdown">
              {loading && <div className="hero-search__drop-loading">Searching...</div>}
              {!loading && results.map((item) => {
                const id = item._id || item.id
                return (
                  <button key={`${item._type}-${id}`} className="hero-search__drop-item" onClick={() => pick(item)}>
                    <div className="hero-search__drop-body">
                      <strong>{item.title}</strong>
                      <div className="hero-search__drop-meta">
                        {(item.location || item.region) && (
                          <span><i className="fa-solid fa-location-dot"></i> {item.location || item.region}</span>
                        )}
                        {item.duration && (
                          <span><i className="fa-regular fa-clock"></i> {item.duration}</span>
                        )}
                      </div>
                    </div>
                    <span
                      className="hero-search__drop-badge"
                      style={{ background: BADGE_COLOR[item._type] }}
                    >
                      {TYPE_BADGE[item._type]}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="hero-search__divider" />

        {/* When */}
        <div className="hero-search__field">
          <label>When</label>
          <div className="hero-search__dates">
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
            <span className="hero-search__dates-arrow">→</span>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
          </div>
        </div>

        {/* Divider */}
        <div className="hero-search__divider" />

        {/* Persons */}
        <div className="hero-search__field">
          <label>Persons</label>
          <div className="hero-search__counter">
            <button onClick={() => setPersons((p) => Math.max(1, p - 1))}>−</button>
            <span>{persons}</span>
            <button onClick={() => setPersons((p) => p + 1)}>+</button>
          </div>
        </div>

        {/* Search button */}
        <button
          className={`hero-search__btn${selected ? ' hero-search__btn--active' : ''}`}
          onClick={handleSearch}
          disabled={!selected}
          title={selected ? `Book ${selected.title}` : 'Select a destination first'}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </div>
  )
}

export default HeroSearchWidget
