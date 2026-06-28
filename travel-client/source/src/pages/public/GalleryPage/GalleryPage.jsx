import { useState, useEffect } from 'react'
import Header from '../../../components/common/Header/Header'
import Footer from '../../../components/common/Footer/Footer'
import PageHero from '../../../components/common/PageHero/PageHero'
import { galleryApi } from '../../../services/api'
import { getImageUrl } from '../../../utils/helpers'
import './GalleryPage.css'

function GalleryPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('All')
  const [lightbox, setLightbox] = useState(null)
  const categories = ['All', ...new Set(items.map((i) => i.category).filter(Boolean))]

  useEffect(() => {
    galleryApi.getAll()
      .then((res) => setItems(res?.data || res || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = category === 'All' ? items : items.filter((i) => i.category?.toLowerCase() === category.toLowerCase())

  return (
    <div className="gallery-page">
      <Header />
      <PageHero title="Gallery" breadcrumb="Home / Gallery" backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=400&fit=crop" />

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
              <div key={item._id || idx} className="gallery-page__item" onClick={() => setLightbox(item)}>
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

      {/* Lightbox */}
      {lightbox && (
        <div className="gallery-lightbox" onClick={() => setLightbox(null)}>
          <button className="gallery-lightbox__close"><i className="fa-solid fa-xmark"></i></button>
          <img src={getImageUrl(lightbox.image || lightbox.url)} alt={lightbox.title || ''} onClick={(e) => e.stopPropagation()} />
          {lightbox.title && <p className="gallery-lightbox__caption">{lightbox.title}</p>}
        </div>
      )}

      <Footer />
    </div>
  )
}

export default GalleryPage
