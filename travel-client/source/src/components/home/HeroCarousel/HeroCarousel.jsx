import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import HeroSearchWidget from '../HeroSearchWidget/HeroSearchWidget'
import './HeroCarousel.css'

function HeroCarousel({ slides = [] }) {
  const [active, setActive] = useState(0)

  const defaultSlides = [
    {
      title: 'Discover the Magic of the Himalayas',
      subtitle: 'Unforgettable trekking and adventure tours in Nepal',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop',
      cta: { label: 'Explore Tours', link: '/tours' },
    },
    {
      title: 'Trek to the Roof of the World',
      subtitle: 'Experience Everest Base Camp with our expert guides',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
      cta: { label: 'View Treks', link: '/trekking' },
    },
    {
      title: 'Culture, Nature & Adventure',
      subtitle: 'Explore Nepal\'s diverse landscapes and rich heritage',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&h=1080&fit=crop',
      cta: { label: 'Custom Packages', link: '/custom-packages' },
    },
  ]

  const items = slides.length > 0 ? slides : defaultSlides

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [items.length])

  return (
    <div className="hero-carousel">
      <div className="hero-carousel__slides">
      {items.map((slide, i) => (
        <div
          key={i}
          className={`hero-slider-cell${i === active ? ' hero-slider-cell--active' : ''}`}
          style={{ backgroundImage: `url(${slide.image || slide.backgroundImage})` }}
        >
          <div className="hero-slider-cell__overlay" />
          <div className="hero-slider-cell__content container">
            <span className="hero-slider-cell__eyebrow">Adventure Nepal</span>
            <h1 className="hero-slider-cell__title">{slide.title}</h1>
            <p className="hero-slider-cell__subtitle">{slide.subtitle || slide.description}</p>
            <div className="hero-slider-cell__actions">
              {slide.cta ? (
                <Link to={slide.cta.link || '/tours'} className="btn btn--primary">
                  {slide.cta.label || 'Explore Now'}
                </Link>
              ) : (
                <Link to="/tours" className="btn btn--primary">Explore Tours</Link>
              )}
              <Link to="/contact" className="btn btn--outline hero-slider-cell__contact-btn">Contact Us</Link>
            </div>
          </div>
        </div>
      ))}
      </div>

      <div className="hero-carousel__dots">
        {items.map((_, i) => (
          <button
            key={i}
            className={`hero-carousel__dot${i === active ? ' hero-carousel__dot--active' : ''}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>

      <button className="hero-carousel__arrow hero-carousel__arrow--prev" onClick={() => setActive((active - 1 + items.length) % items.length)}>
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <button className="hero-carousel__arrow hero-carousel__arrow--next" onClick={() => setActive((active + 1) % items.length)}>
        <i className="fa-solid fa-chevron-right"></i>
      </button>

      <HeroSearchWidget />
    </div>
  )
}

export default HeroCarousel
