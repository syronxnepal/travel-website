import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../../components/common/Header/Header'
import Footer from '../../../components/common/Footer/Footer'
import TourCard from '../../../components/tours/TourCard/TourCard'
import TrekCard from '../../../components/tours/TrekCard/TrekCard'
import HeroSearchWidget from '../../../components/home/HeroSearchWidget/HeroSearchWidget'
import { treksApi, toursApi, shortToursApi, blogsApi, galleryApi, heroSlidersApi, testimonialsApi } from '../../../services/api'
import { getImageUrl } from '../../../utils/helpers'
import './HomePage.css'

function TestimonialCard({ name, text, rating = 5, avatar }) {
  return (
    <div className="testimonial-card">
      <div className="testimonial-card__stars">
        {[1,2,3,4,5].map((i) => <i key={i} className={`fa-${i <= rating ? 'solid' : 'regular'} fa-star`}></i>)}
      </div>
      <p className="testimonial-card__text">"{text}"</p>
      <div className="testimonial-card__author">
        <div className="testimonial-card__avatar">
          {avatar ? <img src={avatar} alt={name} /> : <i className="fa-solid fa-user"></i>}
        </div>
        <strong>{name}</strong>
      </div>
    </div>
  )
}

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=900&fit=crop',
    subtitle: 'EXPLORE THE HIMALAYAS',
    title: 'Discover Nepal\'s\nBreathtaking Beauty',
    desc: 'Embark on the adventure of a lifetime through Nepal\'s majestic mountains, ancient temples, and vibrant culture.',
  },
  {
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&h=900&fit=crop',
    subtitle: 'UNFORGETTABLE TREKS',
    title: 'Trek to the\nRoof of the World',
    desc: 'Experience world-class trekking routes guided by our expert local guides through stunning Himalayan landscapes.',
  },
  {
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&h=900&fit=crop',
    subtitle: 'CULTURAL ADVENTURES',
    title: 'Immerse in Rich\nNepalese Culture',
    desc: 'Explore ancient cities, sacred temples, and vibrant local festivals that make Nepal truly unique.',
  },
]

const WHY_ITEMS = [
  { icon: 'fa-shield-halved', title: 'Safety First', text: 'Your safety is our top priority. All our guides are certified and trained in first aid and emergency procedures.' },
  { icon: 'fa-certificate', title: 'Expert Guides', text: 'Our experienced local guides have extensive knowledge of the terrain, culture and hidden gems of Nepal.' },
  { icon: 'fa-headset', title: '24/7 Support', text: 'We provide round-the-clock support throughout your journey to ensure a seamless adventure experience.' },
  { icon: 'fa-tag', title: 'Best Value', text: 'We offer competitive pricing without compromising on quality, ensuring the best value for your adventure.' },
  { icon: 'fa-route', title: 'Customised Trips', text: 'Every adventure is tailored to your preferences, fitness level and budget for a truly personal experience.' },
  { icon: 'fa-earth-asia', title: 'Eco-Friendly', text: 'We are committed to sustainable tourism practices that protect Nepal\'s natural environment and communities.' },
]

const SAMPLE_TESTIMONIALS = [
  { name: 'Sarah Johnson', text: 'An absolutely incredible experience! The team was professional and the trek exceeded all expectations. Nepal is magical!', rating: 5 },
  { name: 'Michael Chen', text: 'The best adventure of my life. Our guide was knowledgeable and made us feel safe throughout the entire Everest Base Camp trek.', rating: 5 },
  { name: 'Emma Wilson', text: 'Perfectly organised trip with attention to every detail. The cultural experiences were as breathtaking as the mountain views.', rating: 5 },
]

function HomePage() {
  const [treks, setTreks] = useState([])
  const [tours, setTours] = useState([])
  const [shortTours, setShortTours] = useState([])
  const [blogs, setBlogs] = useState([])
  const [gallery, setGallery] = useState([])
  const [heroSlides, setHeroSlides] = useState(HERO_SLIDES)
  const [testimonials, setTestimonials] = useState(SAMPLE_TESTIMONIALS)
  const [slide, setSlide] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    treksApi.getAll().then((r) => setTreks((r?.data || r || []).slice(0, 6))).catch(() => {})
    toursApi.getAll().then((r) => setTours((r?.data || r || []).slice(0, 4))).catch(() => {})
    shortToursApi.getAll().then((r) => setShortTours((r?.data || r || []).slice(0, 4))).catch(() => {})
    blogsApi.getAll().then((r) => setBlogs((r?.data || r || []).slice(0, 3))).catch(() => {})
    galleryApi.getAll().then((r) => setGallery((r?.data || r || []).slice(0, 6))).catch(() => {})
    heroSlidersApi.getAll()
      .then((r) => {
        const slides = (r?.data || r || []).filter((s) => s.isActive)
        if (slides.length > 0) {
          setHeroSlides(slides.map((s) => ({
            image: s.image?.startsWith('http') ? s.image : `${import.meta.env.VITE_API_URL}/uploads/${s.image}`,
            subtitle: '',
            title: s.title,
            desc: s.paragraph,
          })))
        }
      })
      .catch(() => {})
    testimonialsApi.getAll()
      .then((r) => {
        const list = (r?.data || r || []).filter((t) => t.isActive)
        if (list.length > 0) setTestimonials(list)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 5000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  const current = heroSlides[slide] || heroSlides[0]

  function formatDate(d) {
    if (!d) return ''
    return new Date(d).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <div className="home-page">
      <Header />

      {/* Hero Slider */}
      <section className="hero">
        <div className="hero__bg">
          {heroSlides.map((s, i) => (
            <div key={i} className={`hero__slide${i === slide ? ' active' : ''}`} style={{ backgroundImage: `url(${s.image})` }} />
          ))}
          <div className="hero__overlay" />
        </div>

        <div className="container">
          <div className="hero__content">
            <h1 className="hero__title">{current.title.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}</h1>
            {current.desc && <p className="hero__desc">{current.desc}</p>}
          </div>
        </div>

        {/* Arrows */}
        <button className="hero__arrow hero__arrow--prev" onClick={() => setSlide((slide - 1 + heroSlides.length) % heroSlides.length)}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button className="hero__arrow hero__arrow--next" onClick={() => setSlide((slide + 1) % heroSlides.length)}>
          <i className="fa-solid fa-chevron-right"></i>
        </button>

        {/* Dots */}
        <div className="hero__dots">
          {heroSlides.map((_, i) => (
            <button key={i} className={`hero__dot${i === slide ? ' active' : ''}`} onClick={() => setSlide(i)} />
          ))}
        </div>

        <HeroSearchWidget />
      </section>

      {/* Trekking Section */}
      {treks.length > 0 && (
        <section className="home-section">
          <div className="container">
            <div className="section-header">
              <div>
                <span className="section-header__badge">HIMALAYAN ADVENTURES</span>
                <h2>Popular Trekking Routes</h2>
              </div>
              <Link to="/trekking" className="btn btn--outline">View All Treks</Link>
            </div>
            <div className="home-trek-grid">
              {treks.map((trek) => <TrekCard key={trek._id || trek.id} trek={trek} />)}
            </div>
          </div>
        </section>
      )}

      {/* Tours + Short Tours */}
      <section className="home-section home-section--gray">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-header__badge">DISCOVER NEPAL</span>
              <h2>Tours &amp; Short Escapes</h2>
            </div>
            <div className="section-header__links">
              <Link to="/tours" className="btn btn--outline">All Tours</Link>
              <Link to="/short-tours" className="btn btn--outline">Short Tours</Link>
            </div>
          </div>
          {tours.length > 0 && (
            <>
              <h3 className="home-section__sub">Tours</h3>
              <div className="home-tour-grid">
                {tours.map((tour) => <TourCard key={tour._id || tour.id} tour={tour} type="tour" />)}
              </div>
            </>
          )}
          {shortTours.length > 0 && (
            <>
              <h3 className="home-section__sub" style={{ marginTop: 32 }}>Short Tours</h3>
              <div className="home-tour-grid">
                {shortTours.map((tour) => <TourCard key={tour._id || tour.id} tour={tour} type="short-tour" />)}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Why Book With Us */}
      <section className="home-section home-why">
        <div className="container">
          <div className="section-header section-header--center">
            <span className="section-header__badge">WHY CHOOSE US</span>
            <h2>Why Book With Travel Adventure Nepal?</h2>
            <p>We are committed to providing exceptional adventures with unmatched service and expertise</p>
          </div>
          <div className="home-why__grid">
            {WHY_ITEMS.map((item, i) => (
              <div key={i} className="home-why__card">
                <div className="home-why__icon"><i className={`fa-solid ${item.icon}`}></i></div>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="home-section home-section--gray">
        <div className="container">
          <div className="section-header section-header--center">
            <span className="section-header__badge">TESTIMONIALS</span>
            <h2>What Our Adventurers Say</h2>
          </div>
          <div className="home-testimonials__grid">
            {testimonials.map((t, i) => (
              <TestimonialCard
                key={t.id || i}
                name={t.name}
                text={t.comment || t.text}
                rating={t.rating || 5}
                avatar={t.image ? getImageUrl(t.image) : null}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      {blogs.length > 0 && (
        <section className="home-section">
          <div className="container">
            <div className="section-header">
              <div>
                <span className="section-header__badge">LATEST NEWS</span>
                <h2>From Our Blog</h2>
              </div>
              <Link to="/blogs" className="btn btn--outline">View All Posts</Link>
            </div>
            <div className="home-blog-grid">
              {blogs.map((blog) => {
                const blogId = blog._id || blog.id
                return (
                  <Link key={blogId} to={`/blogs/${blogId}`} className="blog-card">
                    <div className="blog-card__img-wrap">
                      <img src={getImageUrl(blog.image) || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=240&fit=crop'} alt={blog.title} />
                      {blog.category && <span className="blog-card__cat">{blog.category}</span>}
                    </div>
                    <div className="blog-card__body">
                      <div className="blog-card__meta">
                        <span><i className="fa-regular fa-calendar"></i> {formatDate(blog.createdAt)}</span>
                      </div>
                      <h3 className="blog-card__title">{blog.title}</h3>
                      {blog.excerpt && <p className="blog-card__excerpt">{blog.excerpt}</p>}
                      <span className="blog-card__read">Read More <i className="fa-solid fa-arrow-right"></i></span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {gallery.length > 0 && (
        <section className="home-section home-section--gray">
          <div className="container">
            <div className="section-header section-header--center">
              <span className="section-header__badge">OUR GALLERY</span>
              <h2>Capturing Beautiful Moments</h2>
            </div>
            <div className="home-gallery-grid">
              {gallery.map((item, i) => (
                <Link key={item._id || i} to="/gallery" className="home-gallery-item">
                  <img src={getImageUrl(item.image || item.url)} alt={item.title || ''} loading="lazy" />
                  <div className="home-gallery-item__overlay"><i className="fa-solid fa-magnifying-glass-plus"></i></div>
                </Link>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <Link to="/gallery" className="btn btn--outline">View Full Gallery</Link>
            </div>
          </div>
        </section>
      )}

      {/* Reach Us Section */}
      <section className="home-reach">
        <div className="home-reach__bg" />
        <div className="container">
          <div className="home-reach__inner">
            <div className="home-reach__content">
              <span className="section-header__badge">REACH US</span>
              <h2>Ready to Start Your Adventure?</h2>
              <p>Contact our team of experts and let us craft your perfect Nepal adventure. We're here 24/7 to answer all your questions.</p>
              <div className="home-reach__contacts">
                <div><i className="fa-solid fa-location-dot"></i> 21 Adventure St, Sydney NSW 2000</div>
                <div><i className="fa-solid fa-phone"></i> +61 2 0000 0000</div>
                <div><i className="fa-solid fa-envelope"></i> sales@traveladventurenepal.com.au</div>
              </div>
            </div>
            <div className="home-reach__cta">
              <Link to="/contact" className="btn btn--primary btn--lg">Contact Us <i className="fa-solid fa-arrow-right"></i></Link>
              <Link to="/custom-packages" className="btn btn--outline-white btn--lg">Plan Custom Trip</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default HomePage
