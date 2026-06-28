import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import Header from '../../../components/common/Header/Header'
import Footer from '../../../components/common/Footer/Footer'
import TourCard from '../../../components/tours/TourCard/TourCard'
import TrekCard from '../../../components/tours/TrekCard/TrekCard'
import { searchApi } from '../../../services/api'
import { getImageUrl } from '../../../utils/helpers'
import './SearchResultsPage.css'

function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') || ''
  const [input, setInput] = useState(q)
  const [results, setResults] = useState({ treks: [], tours: [], shortTours: [], blogs: [] })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!q.trim()) { setResults({ treks: [], tours: [], shortTours: [], blogs: [] }); return }
    setLoading(true)
    searchApi.search(q)
      .then((res) => setResults(res?.data || { treks: [], tours: [], shortTours: [], blogs: [] }))
      .catch(() => setResults({ treks: [], tours: [], shortTours: [], blogs: [] }))
      .finally(() => setLoading(false))
  }, [q])

  function handleSearch(e) {
    e.preventDefault()
    if (input.trim()) setSearchParams({ q: input.trim() })
  }

  const total = (results.treks?.length || 0) + (results.tours?.length || 0) + (results.shortTours?.length || 0) + (results.blogs?.length || 0)

  function formatDate(d) {
    if (!d) return ''
    return new Date(d).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <div className="search-results-page">
      <Header />

      <div className="search-results-page__hero">
        <div className="container">
          <h1>Search Results</h1>
          <form className="search-results-page__form" onSubmit={handleSearch}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search treks, tours, blogs..."
              autoFocus
            />
            <button type="submit" className="btn btn--primary">
              <i className="fa-solid fa-magnifying-glass"></i> Search
            </button>
          </form>
        </div>
      </div>

      <div className="container">
        {loading ? (
          <div className="loading-spinner" style={{ marginTop: 60 }} />
        ) : q ? (
          <div className="search-results-page__content">
            <p className="search-results-page__count">
              {total > 0 ? `Found ${total} results for "${q}"` : `No results found for "${q}"`}
            </p>

            {results.treks?.length > 0 && (
              <section className="search-results-page__section">
                <h2>Trekking ({results.treks.length})</h2>
                <div className="search-results-page__trek-grid">
                  {results.treks.map((trek) => <TrekCard key={trek.id} trek={trek} />)}
                </div>
              </section>
            )}

            {results.tours?.length > 0 && (
              <section className="search-results-page__section">
                <h2>Tours ({results.tours.length})</h2>
                <div className="search-results-page__tour-grid">
                  {results.tours.map((tour) => <TourCard key={tour.id} tour={tour} type="tour" />)}
                </div>
              </section>
            )}

            {results.shortTours?.length > 0 && (
              <section className="search-results-page__section">
                <h2>Short Tours ({results.shortTours.length})</h2>
                <div className="search-results-page__tour-grid">
                  {results.shortTours.map((tour) => <TourCard key={tour.id} tour={tour} type="short-tour" />)}
                </div>
              </section>
            )}

            {results.blogs?.length > 0 && (
              <section className="search-results-page__section">
                <h2>Blog Posts ({results.blogs.length})</h2>
                <div className="search-results-page__blog-list">
                  {results.blogs.map((blog) => (
                    <Link key={blog.id} to={`/blogs/${blog.id}`} className="search-blog-item">
                      {blog.image && (
                        <img src={getImageUrl(blog.image)} alt={blog.title} className="search-blog-item__img" />
                      )}
                      <div className="search-blog-item__body">
                        {blog.category && <span className="search-blog-item__cat">{blog.category}</span>}
                        <h3>{blog.title}</h3>
                        {blog.excerpt && <p>{blog.excerpt}</p>}
                        <span className="search-blog-item__date">{formatDate(blog.createdAt)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {total === 0 && (
              <div className="search-results-page__empty">
                <i className="fa-solid fa-magnifying-glass"></i>
                <h3>No results found</h3>
                <p>Try different keywords or browse our <Link to="/trekking">treks</Link>, <Link to="/tours">tours</Link>, or <Link to="/blogs">blogs</Link>.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="search-results-page__empty">
            <i className="fa-solid fa-magnifying-glass"></i>
            <p>Enter a search term above to find treks, tours, and blog posts.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default SearchResultsPage
