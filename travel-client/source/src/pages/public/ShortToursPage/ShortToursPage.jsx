import { useState, useEffect } from 'react'
import Header from '../../../components/common/Header/Header'
import Footer from '../../../components/common/Footer/Footer'
import PageHero from '../../../components/common/PageHero/PageHero'
import TourCard from '../../../components/tours/TourCard/TourCard'
import TourFilters from '../../../components/tours/TourFilters/TourFilters'
import FilterSidebar from '../../../components/tours/FilterSidebar/FilterSidebar'
import { shortToursApi } from '../../../services/api'
import { usePageHero } from '../../../hooks/usePageHero'
import '../ToursPage/ToursPage.css'

const DEFAULT_HERO = { title: 'Short Tours', subtitle: '', backgroundImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&h=400&fit=crop' }

function ShortToursPage() {
  const hero = usePageHero('short-tour-listing', DEFAULT_HERO)
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState('default')
  const [filters, setFilters] = useState({ maxPrice: 5000, maxDuration: 30, difficulty: '' })

  useEffect(() => {
    setLoading(true)
    shortToursApi.getAll()
      .then((res) => setTours(res?.data || res || []))
      .catch(() => setTours([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = tours.filter((t) => {
    if (filters.maxPrice < 5000 && t.price > filters.maxPrice) return false
    return true
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'price_asc') return (a.price || 0) - (b.price || 0)
    if (sort === 'price_desc') return (b.price || 0) - (a.price || 0)
    return 0
  })

  return (
    <div className="tours-page short-tours-page">
      <Header />
      <PageHero title={hero.title} subtitle={hero.subtitle} breadcrumb="Home / Short Tours" backgroundImage={hero.backgroundImage} />

      <div className="container">
        <div className="tours-page__layout">
          <FilterSidebar className="tours-page__sidebar">
            <TourFilters filters={filters} onChange={setFilters} />
          </FilterSidebar>
          <main className="tours-page__main">
            <div className="tours-page__sort-bar">
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="tours-page__sort-select">
                <option value="default">Recently Added</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
            {loading ? <div className="loading-spinner" /> : (
              <div className="short-tours-grid">
                {sorted.map((tour) => <TourCard key={tour._id} tour={tour} type="short-tour" />)}
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ShortToursPage
