import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../../components/common/Header/Header'
import Footer from '../../../components/common/Footer/Footer'
import PageHero from '../../../components/common/PageHero/PageHero'
import TrekCard from '../../../components/tours/TrekCard/TrekCard'
import TourFilters from '../../../components/tours/TourFilters/TourFilters'
import { treksApi } from '../../../services/api'
import { usePageHero } from '../../../hooks/usePageHero'
import './TrekkingPage.css'

const DEFAULT_HERO = {
  title: 'Trekking Adventures',
  subtitle: 'EXPLORE THE HIMALAYAS',
  backgroundImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=400&fit=crop',
}

function TrekkingPage() {
  const hero = usePageHero('trek-listing', DEFAULT_HERO)
  const [treks, setTreks] = useState([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState('default')
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({ maxPrice: 5000, maxDuration: 30, difficulty: '' })

  useEffect(() => {
    setLoading(true)
    treksApi.getAll()
      .then((res) => setTreks(res?.data || res || []))
      .catch(() => setTreks([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = treks.filter((t) => {
    if (search && !t.title?.toLowerCase().includes(search.toLowerCase())) return false
    if (filters.maxPrice < 5000 && t.price > filters.maxPrice) return false
    if (filters.maxDuration < 30) {
      const days = parseInt(t.duration) || 0
      if (days > filters.maxDuration) return false
    }
    if (filters.difficulty) {
      const active = filters.difficulty.split(',').filter(Boolean)
      if (active.length && !active.some((d) => t.difficulty?.toLowerCase() === d.toLowerCase())) return false
    }
    return true
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'price_asc') return (a.price || 0) - (b.price || 0)
    if (sort === 'price_desc') return (b.price || 0) - (a.price || 0)
    return 0
  })

  return (
    <div className="trekking-page">
      <Header />
      <PageHero
        title={hero.title}
        subtitle={hero.subtitle}
        backgroundImage={hero.backgroundImage}
        breadcrumb="Home / Trekking"
      />

      <div className="container">
        <div className="trekking-page__layout">
          <aside className="trekking-page__sidebar">
            <TourFilters
              filters={filters}
              onChange={setFilters}
              label="Criteria"
              difficulties={['Easy', 'Moderate', 'Challenging', 'Expert']}
            />
          </aside>

          <main className="trekking-page__main">
            <div className="trekking-page__toolbar">
              <div className="trekking-page__search">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="text"
                  placeholder="Search treks..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="trekking-page__sort">
                <option value="default">Recently Added</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>

            {loading ? (
              <div className="loading-spinner" />
            ) : (
              <div className="trekking-page__grid">
                {sorted.map((trek) => <TrekCard key={trek._id} trek={trek} />)}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* CTA Banner */}
      <section className="trekking-cta">
        <div className="trekking-cta__bg" />
        <div className="container">
          <div className="trekking-cta__inner">
            <div className="trekking-cta__content">
              <span className="trekking-cta__badge"><i className="fa-solid fa-arrow-right"></i> SPECIAL OFFER FOR YOU</span>
              <h2>Let's Make Your Travel Dreams Come True</h2>
              <p>Discover amazing trekking destinations with our expert guides. Get exclusive discounts and create unforgettable memories in the world's most beautiful mountain ranges.</p>
              <Link to="/booking/trek/custom" className="btn btn--nav">Start Booking <i className="fa-solid fa-arrow-right"></i></Link>
            </div>
            <div className="trekking-cta__image-wrap">
              <span className="trekking-cta__discount-badge">30% Discount</span>
              <img src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop" alt="Trekking" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default TrekkingPage
