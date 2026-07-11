import { useState, useEffect } from 'react'
import Header from '../../../components/common/Header/Header'
import Footer from '../../../components/common/Footer/Footer'
import PageHero from '../../../components/common/PageHero/PageHero'
import { galleryApi } from '../../../services/api'
import { getImageUrl } from '../../../utils/helpers'
import { usePageHero } from '../../../hooks/usePageHero'
import Lightbox from '../../../components/common/Lightbox/Lightbox'
import './GalleryPage.css'

const DEFAULT_HERO = { title: 'Gallery', subtitle: '', backgroundImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=400&fit=crop' }

function GalleryPage() {
  const hero = usePageHero('gallery', DEFAULT_HERO)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  // item.category is the full GalleryCategory relation object ({ id, name, ... }), not a string.
  const categories = ['All', ...new Set(items.map((i) => i.category?.name).filter(Boolean))]

  useEffect(() => {
    galleryApi.getAll()
      .then((res) => setItems(res?.data || res || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = category === 'All' ? items : items.filter((i) => i.category?.name?.toLowerCase() === category.toLowerCase())

  return (
    <div className="gallery-page">
      <Header />
      <PageHero title={hero.title} subtitle={hero.subtitle} breadcrumb="Home / Gallery" backgroundImage={hero.backgroundImage} />

      <div className="container">
        <div className="gallery-page__filters">
          {categories.map((cat) => (
            <button key={cat} className={`gallery-page__pill${category === cat ? ' active' : ''}`} onClick={() => setCategory(cat)}>
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {loading ? <div className="loading-spinner" /> : (
          <div className="gallery-page__grid">
            {filtered.map((item, idx) => (
              <div key={item._id || idx} className="gallery-page__item" onClick={() => setLightboxIndex(idx)}>
                <img src={getImageUrl(item.image || item.url)} alt={item.title || item.caption || ''} loading="lazy" />
                <div className="gallery-page__item-overlay">
                  <i className="fa-solid fa-magnifying-glass-plus"></i>
                  {item.title && <span>{item.title}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Lightbox
        images={filtered}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />

      <Footer />
    </div>
  )
}

export default GalleryPage
