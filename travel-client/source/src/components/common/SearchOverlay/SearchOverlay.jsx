import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchApi } from '../../../services/api'
import { getImageUrl } from '../../../utils/helpers'
import './SearchOverlay.css'

const POPULAR = ['Everest Trek', 'Kathmandu', 'Adventure Tours', 'Cultural Experience']

const TYPE_LABELS = { trek: 'Trek', tour: 'Tour', shortTour: 'Short Tour', blog: 'Blog' }
const TYPE_PATHS = {
  trek: '/trekking',
  tour: '/tours',
  shortTour: '/short-tours',
  blog: '/blogs',
}

function ResultItem({ item, type, onClose }) {
  const navigate = useNavigate()
  const id = item._id || item.id
  const path = `${TYPE_PATHS[type]}/${id}`
  const label = TYPE_LABELS[type] || type

  function go() {
    onClose()
    navigate(path)
  }

  return (
    <button className="search-result-item" onClick={go}>
      <div className="search-result-item__img-wrap">
        {item.image
          ? <img src={getImageUrl(item.image)} alt={item.title} />
          : <div className="search-result-item__img-placeholder"><i className="fa-solid fa-image"></i></div>
        }
        <span className={`search-result-item__badge search-result-item__badge--${type}`}>{label}</span>
      </div>
      <div className="search-result-item__body">
        <strong>{item.title}</strong>
        {(item.location || item.region) && (
          <span><i className="fa-solid fa-location-dot"></i> {item.location || item.region}</span>
        )}
      </div>
    </button>
  )
}

function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)
  const timerRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    inputRef.current?.focus()
    function onKey(e) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    clearTimeout(timerRef.current)
    if (!query.trim()) { setResults(null); return }
    timerRef.current = setTimeout(() => {
      setLoading(true)
      searchApi.search(query.trim())
        .then((res) => setResults(res?.data || { treks: [], tours: [], shortTours: [], blogs: [] }))
        .catch(() => setResults(null))
        .finally(() => setLoading(false))
    }, 300)
    return () => clearTimeout(timerRef.current)
  }, [query])

  function handleSubmit(e) {
    e.preventDefault()
    if (!query.trim()) return
    onClose()
    navigate(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  function handlePopular(term) {
    setQuery(term)
  }

  const hasResults = results && (
    results.treks?.length || results.tours?.length ||
    results.shortTours?.length || results.blogs?.length
  )

  return (
    <div className="search-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`search-overlay__panel${(results || loading) ? ' search-overlay__panel--expanded' : ''}`}>
        <div className="search-overlay__inner">
        <div className="search-overlay__header">
          <h2 className="search-overlay__title">Search</h2>
          <button className="search-overlay__close" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="search-overlay__divider" />

        <form className="search-overlay__form" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destinations, tours, activities..."
            className="search-overlay__input"
          />
          <button type="submit" className="search-overlay__btn">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>

        {/* Loading */}
        {loading && <div className="search-overlay__loading"><div className="loading-spinner" /></div>}

        {/* Results */}
        {!loading && results && (
          <div className="search-overlay__results">
            {!hasResults && (
              <p className="search-overlay__no-results">No results found for "{query}"</p>
            )}
            {results.treks?.length > 0 && (
              <div className="search-overlay__group">
                <div className="search-overlay__group-header">Treks ({results.treks.length})</div>
                {results.treks.map((item) => (
                  <ResultItem key={item._id || item.id} item={item} type="trek" onClose={onClose} />
                ))}
              </div>
            )}
            {results.tours?.length > 0 && (
              <div className="search-overlay__group">
                <div className="search-overlay__group-header">Tours ({results.tours.length})</div>
                {results.tours.map((item) => (
                  <ResultItem key={item._id || item.id} item={item} type="tour" onClose={onClose} />
                ))}
              </div>
            )}
            {results.shortTours?.length > 0 && (
              <div className="search-overlay__group">
                <div className="search-overlay__group-header">Short Tours ({results.shortTours.length})</div>
                {results.shortTours.map((item) => (
                  <ResultItem key={item._id || item.id} item={item} type="shortTour" onClose={onClose} />
                ))}
              </div>
            )}
            {results.blogs?.length > 0 && (
              <div className="search-overlay__group">
                <div className="search-overlay__group-header">Blogs ({results.blogs.length})</div>
                {results.blogs.map((item) => (
                  <ResultItem key={item._id || item.id} item={item} type="blog" onClose={onClose} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Empty / Popular */}
        {!loading && !results && (
          <div className="search-overlay__popular">
            <p>Popular Searches</p>
            <div className="search-overlay__chips">
              {POPULAR.map((term) => (
                <button key={term} className="search-overlay__chip" onClick={() => handlePopular(term)}>
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default SearchOverlay
