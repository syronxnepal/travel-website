import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../../components/common/Header/Header'
import Footer from '../../../components/common/Footer/Footer'
import TourCard from '../../../components/tours/TourCard/TourCard'
import TrekCard from '../../../components/tours/TrekCard/TrekCard'
import HeroSearchWidget from '../../../components/home/HeroSearchWidget/HeroSearchWidget'
import { treksApi, toursApi, shortToursApi, blogsApi, galleryApi, heroSlidersApi, testimonialsApi, homePageSectionsApi } from '../../../services/api'
import { getImageUrl } from '../../../utils/helpers'
import './HomePage.css'

function SectionHead({ badge, title, subtitle, cta }) {
  return (
    <div className="section-header section-header--center">
      <span className="section-header__badge">{badge}</span>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
      {cta && <Link to={cta.link} className="btn btn--outline section-header__cta">{cta.label}</Link>}
    </div>
  )
}

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=900&fit=crop',
    subtitle: 'EXPLORE THE HIMALAYAS',
    title: 'Adventure Awaits\nAround Every Corner',
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
  { icon: 'fa-headset', title: '24/7 Customer Support', text: 'Round-the-clock support throughout your journey to ensure a seamless experience.' },
  { icon: 'fa-gift', title: 'Earn Rewards', text: 'Collect points on every trip and redeem them on your next adventure with us.' },
  { icon: 'fa-star', title: 'Millions of Reviews', text: 'Trusted by thousands of happy travellers who share their honest experiences.' },
  { icon: 'fa-passport', title: 'Plan Your Visa', text: 'We help you sort visa paperwork so you can focus on the adventure ahead.' },
  { icon: 'fa-shield-halved', title: 'Insurance Coverage', text: 'Every trip includes coverage options to keep you protected on the trail.' },
  { icon: 'fa-camera-retro', title: 'Happy Memories', text: 'Every adventure is tailored to your preferences for a truly personal experience.' },
]

const SAMPLE_TESTIMONIALS = [
  { name: 'Sarah Johnson', location: 'Sydney, Australia', text: 'An absolutely incredible experience! The team was professional and the trek exceeded all expectations. Nepal is magical!', rating: 5 },
  { name: 'Michael Chen', location: 'Toronto, Canada', text: 'The best adventure of my life. Our guide was knowledgeable and made us feel safe throughout the entire Everest Base Camp trek.', rating: 5 },
  { name: 'Emma Wilson', location: 'London, UK', text: 'Perfectly organised trip with attention to every detail. The cultural experiences were as breathtaking as the mountain views.', rating: 5 },
]

const SAMPLE_TREKS = [
  { _id: 's-trek-1', title: 'Everest Base Camp Trek', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&h=380&fit=crop', duration: '14 Days', price: 1281, rating: 4.9, reviewCount: 128, location: 'Khumbu Region' },
  { _id: 's-trek-2', title: 'Annapurna Circuit Trek', image: 'https://images.unsplash.com/photo-1516434636545-99a25787ba90?w=500&h=380&fit=crop', duration: '12 Days', price: 999, rating: 4.8, reviewCount: 96, location: 'Annapurna Region' },
  { _id: 's-trek-3', title: 'Gokyo Ri Trek', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&h=380&fit=crop', duration: '15 Days', price: 1150, rating: 4.7, reviewCount: 74, location: 'Khumbu Region' },
  { _id: 's-trek-4', title: 'Langtang Valley Trek', image: 'https://images.unsplash.com/photo-1626621341169-ba5c6c4e4c3b?w=500&h=380&fit=crop', duration: '9 Days', price: 750, rating: 4.8, reviewCount: 61, location: 'Langtang Region' },
]

const SAMPLE_TOURS = [
  { _id: 's-tour-1', title: 'Kathmandu City Highlights', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&h=380&fit=crop', duration: '1 Day', price: 129, rating: 4.6, reviewCount: 54, location: 'Kathmandu' },
  { _id: 's-tour-2', title: 'Pokhara Day Trip', image: 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=500&h=380&fit=crop', duration: '1 Day', price: 99, rating: 4.7, reviewCount: 47, location: 'Pokhara' },
  { _id: 's-tour-3', title: 'Chitwan Jungle Safari', image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=500&h=380&fit=crop', duration: '2 Days', price: 189, rating: 4.8, reviewCount: 62, location: 'Chitwan' },
  { _id: 's-tour-4', title: 'Bhaktapur Heritage Tour', image: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=500&h=380&fit=crop', duration: '1 Day', price: 89, rating: 4.6, reviewCount: 41, location: 'Bhaktapur' },
]

const SAMPLE_SHORT_TOURS = [
  { _id: 's-short-1', title: 'Boudhanath Stupa Tour', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=500&h=380&fit=crop', duration: '3 Hours', price: 39, rating: 4.5, reviewCount: 32, location: 'Kathmandu' },
  { _id: 's-short-2', title: 'Sunrise at Nagarkot', image: 'https://images.unsplash.com/photo-1585504198199-20277593b94f?w=500&h=380&fit=crop', duration: '5 Hours', price: 59, rating: 4.8, reviewCount: 28, location: 'Nagarkot' },
  { _id: 's-short-3', title: 'Patan Durbar Square Walk', image: 'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?w=500&h=380&fit=crop', duration: '2 Hours', price: 29, rating: 4.6, reviewCount: 24, location: 'Lalitpur' },
  { _id: 's-short-4', title: 'Pokhara Lakeside Evening', image: 'https://images.unsplash.com/photo-1626621341169-ba5c6c4e4c3b?w=500&h=380&fit=crop', duration: '3 Hours', price: 35, rating: 4.7, reviewCount: 19, location: 'Pokhara' },
]

const SAMPLE_BLOGS = [
  { _id: 's-blog-1', title: '10 Essential Tips for Your First Trek to Everest Base Camp', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&h=340&fit=crop', category: 'Trekking', createdAt: '2026-01-23', excerpt: 'Everything you need to know before you lace up your boots and head for the Himalayas.' },
  { _id: 's-blog-2', title: 'The Cultural Heritage of Kathmandu Valley', image: 'https://images.unsplash.com/photo-1585504198199-20277593b94f?w=500&h=340&fit=crop', category: 'Culture', createdAt: '2026-02-08', excerpt: 'Discover the ancient temples, palaces and living traditions that make the valley unique.' },
  { _id: 's-blog-3', title: 'Trekking Gear Checklist for Every Season', image: 'https://images.unsplash.com/photo-1445264718234-a457a9a68a5e?w=500&h=340&fit=crop', category: 'Guides', createdAt: '2026-03-01', excerpt: 'Pack smart with our season-by-season guide to trekking gear in Nepal.' },
]

const SECTION_KEYS = ['top-trek-section', 'top-tours-section', 'why-choose-us-section', 'testimonials-section', 'blog-section', 'gallery-section', 'reach-us-section']

const SAMPLE_GALLERY = [
  { _id: 's-gal-1', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=600&fit=crop' },
  { _id: 's-gal-2', image: 'https://images.unsplash.com/photo-1516434636545-99a25787ba90?w=600&h=800&fit=crop' },
  { _id: 's-gal-3', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=800&fit=crop' },
  { _id: 's-gal-4', image: 'https://images.unsplash.com/photo-1626621341169-ba5c6c4e4c3b?w=600&h=600&fit=crop' },
  { _id: 's-gal-5', image: 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=600&h=600&fit=crop' },
  { _id: 's-gal-6', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=800&fit=crop' },
]

function HomePage() {
  const [treks, setTreks] = useState(SAMPLE_TREKS)
  const [tours, setTours] = useState(SAMPLE_TOURS)
  const [shortTours, setShortTours] = useState(SAMPLE_SHORT_TOURS)
  const [blogs, setBlogs] = useState(SAMPLE_BLOGS)
  const [gallery, setGallery] = useState(SAMPLE_GALLERY)
  const [heroSlides, setHeroSlides] = useState(HERO_SLIDES)
  const [testimonials, setTestimonials] = useState(SAMPLE_TESTIMONIALS)
  const [slide, setSlide] = useState(0)
  const [testiIndex, setTestiIndex] = useState(0)
  const [sections, setSections] = useState({})

  // Returns a CMS-editable section field, falling back to the given default
  // when the section hasn't been configured (or the API is unreachable).
  function sVal(sectionKey, field, fallback) {
    return sections[sectionKey]?.[field] || fallback
  }

  useEffect(() => {
    Promise.all(
      SECTION_KEYS.map((key) =>
        homePageSectionsApi.getByKey(key).then((r) => [key, r?.data || r]).catch(() => [key, null])
      )
    ).then((pairs) => {
      setSections(Object.fromEntries(pairs.filter(([, data]) => data)))
    })
  }, [])

  useEffect(() => {
    treksApi.getAll().then((r) => { const list = (r?.data || r || []); if (list.length > 0) setTreks(list.slice(0, 4)) }).catch(() => {})
    toursApi.getAll().then((r) => { const list = (r?.data || r || []); if (list.length > 0) setTours(list.slice(0, 4)) }).catch(() => {})
    shortToursApi.getAll().then((r) => { const list = (r?.data || r || []); if (list.length > 0) setShortTours(list.slice(0, 4)) }).catch(() => {})
    blogsApi.getAll().then((r) => { const list = (r?.data || r || []); if (list.length > 0) setBlogs(list.slice(0, 3)) }).catch(() => {})
    galleryApi.getAll().then((r) => { const list = (r?.data || r || []); if (list.length > 0) setGallery(list.slice(0, 6)) }).catch(() => {})
    heroSlidersApi.getAll()
      .then((r) => {
        const slides = (r?.data || r || []).filter((s) => s.isActive)
        if (slides.length > 0) {
          setHeroSlides(slides.map((s) => ({
            image: getImageUrl(s.image),
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
  const combinedTours = [...tours.map((t) => ({ item: t, type: 'tour' })), ...shortTours.map((t) => ({ item: t, type: 'short-tour' }))]
  const activeTesti = testimonials[testiIndex] || testimonials[0]

  function formatDate(d) {
    if (!d) return ''
    return new Date(d).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  function nextTesti() { setTestiIndex((i) => (i + 1) % testimonials.length) }
  function prevTesti() { setTestiIndex((i) => (i - 1 + testimonials.length) % testimonials.length) }

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
            {current.subtitle && <span className="hero__subtitle">{current.subtitle}</span>}
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

        {/* Side dots */}
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
            <SectionHead
              badge={sVal('top-trek-section', 'topTitle', 'OUR DESTINATIONS')}
              title={sVal('top-trek-section', 'heading', 'Explore Our Top Trekking Destinations')}
              subtitle={sVal('top-trek-section', 'subtitle')}
              cta={{ label: 'View More', link: '/trekking' }}
            />
            <div className="home-trek-grid">
              {treks.map((trek) => <TrekCard key={trek._id || trek.id} trek={trek} />)}
            </div>
          </div>
        </section>
      )}

      {/* Tours + Short Tours */}
      {combinedTours.length > 0 && (
        <section className="home-section home-section--gray">
          <div className="container">
            <SectionHead
              badge={sVal('top-tours-section', 'topTitle', 'TOP TOURS & SHORT TOURS')}
              title={sVal('top-tours-section', 'heading', 'Explore Our Tours & Short Tours')}
              subtitle={sVal('top-tours-section', 'subtitle')}
              cta={{ label: 'View More', link: '/tours' }}
            />
            <div className="home-tour-grid">
              {combinedTours.map(({ item, type }) => <TourCard key={item._id || item.id} tour={item} type={type} />)}
            </div>
          </div>
        </section>
      )}

      {/* Why Book With Us */}
      <section className="home-section home-why">
        <div className="container">
          <SectionHead
            badge={sVal('why-choose-us-section', 'topTitle', 'CHOOSE US')}
            title={sVal('why-choose-us-section', 'heading', 'Why Book With Us')}
            subtitle={sVal('why-choose-us-section', 'subtitle')}
          />
          <div className="home-why__layout">
            <ul className="home-why__list">
              {WHY_ITEMS.map((item, i) => (
                <li key={i} className="home-why__row">
                  <div className="home-why__icon"><i className={`fa-solid ${item.icon}`}></i></div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="home-why__media">
              <img src={getImageUrl(sVal('why-choose-us-section', 'adventureImage', '')) || 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=700&h=850&fit=crop'} alt="Adventure with us" />
              <div className="home-why__stat home-why__stat--top">
                <strong>50+</strong>
                <span>Tours</span>
              </div>
              <div className="home-why__stat home-why__stat--bottom">
                <strong>20+</strong>
                <span>Destinations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {activeTesti && (
        <section className="home-section home-section--gray">
          <div className="container">
            <SectionHead
              badge={sVal('testimonials-section', 'topTitle', 'TESTIMONIALS')}
              title={sVal('testimonials-section', 'heading', 'What Others Are Saying About Us')}
            />
            <div className="home-testimonial">
              <i className="fa-solid fa-quote-left home-testimonial__quote-icon"></i>
              <div className="home-testimonial__stars">
                {[1,2,3,4,5].map((i) => <i key={i} className={`fa-${i <= (activeTesti.rating || 5) ? 'solid' : 'regular'} fa-star`}></i>)}
              </div>
              <p className="home-testimonial__text">"{activeTesti.comment || activeTesti.text}"</p>
              <div className="home-testimonial__author">
                <div className="home-testimonial__avatar">
                  {activeTesti.image ? <img src={getImageUrl(activeTesti.image)} alt={activeTesti.name} /> : <i className="fa-solid fa-user"></i>}
                </div>
                <strong>{activeTesti.name}</strong>
                {activeTesti.location && <span>{activeTesti.location}</span>}
              </div>
              {testimonials.length > 1 && (
                <div className="home-testimonial__nav">
                  <button onClick={prevTesti}><i className="fa-solid fa-chevron-left"></i></button>
                  <button onClick={nextTesti}><i className="fa-solid fa-chevron-right"></i></button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Blog Section */}
      {blogs.length > 0 && (
        <section className="home-section">
          <div className="container">
            <SectionHead
              badge={sVal('blog-section', 'topTitle', 'OUR BLOG')}
              title={sVal('blog-section', 'heading', 'Keep Updated With Our Stories')}
              subtitle={sVal('blog-section', 'subtitle')}
              cta={{ label: 'View More', link: '/blogs' }}
            />
            <div className="home-blog-grid">
              {blogs.map((blog, i) => {
                const blogId = blog._id || blog.id
                const isRealBlog = /^\d+$/.test(String(blogId))
                return (
                  <Link key={blogId} to={isRealBlog ? `/blogs/${blogId}` : '/blogs'} className="home-blog-card">
                    <div className="home-blog-card__img-wrap">
                      <img src={getImageUrl(blog.image) || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=240&fit=crop'} alt={blog.title} />
                      <span className={`home-blog-card__date${i % 2 === 1 ? ' home-blog-card__date--alt' : ''}`}>
                        <i className="fa-regular fa-calendar"></i> {formatDate(blog.createdAt)}
                      </span>
                    </div>
                    <div className="home-blog-card__body">
                      {blog.category && <span className="home-blog-card__cat">{blog.category}</span>}
                      <h3 className="home-blog-card__title">{blog.title}</h3>
                      {blog.excerpt && <p className="home-blog-card__excerpt">{blog.excerpt}</p>}
                      <span className="home-blog-card__read">Read More <i className="fa-solid fa-arrow-right"></i></span>
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
            <SectionHead
              badge={sVal('gallery-section', 'topTitle', 'OUR GALLERY')}
              title={sVal('gallery-section', 'heading', 'Discover The Beauty Of Our Trips')}
              subtitle={sVal('gallery-section', 'subtitle')}
            />
            <div className="home-gallery-grid">
              {gallery.map((item, i) => (
                <Link key={item._id || i} to="/gallery" className={`home-gallery-item home-gallery-item--${i + 1}`}>
                  <img src={getImageUrl(item.image || item.url)} alt={item.title || ''} loading="lazy" />
                  <div className="home-gallery-item__overlay"><i className="fa-solid fa-magnifying-glass-plus"></i></div>
                </Link>
              ))}
            </div>
            <div className="home-section__cta">
              <Link to="/gallery" className="btn btn--outline">View Full Gallery</Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="home-cta">
        <div
          className="home-cta__bg"
          style={{ backgroundImage: `url('${getImageUrl(sVal('reach-us-section', 'backgroundImage', '')) || 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=1600&h=700&fit=crop'}')` }}
        />
        <div className="home-cta__overlay" />
        <div className="container">
          <div className="home-cta__content">
            <h2>{sVal('reach-us-section', 'heading', 'We Are Available 24/7')}</h2>
            <p>{sVal('reach-us-section', 'subtitle', 'Reach out any time and let our team craft your perfect Nepal adventure.')}</p>
            <div className="home-cta__actions">
              <a href="tel:+61200000000" className="btn btn--outline-white btn--lg">Call Us <i className="fa-solid fa-phone"></i></a>
              <Link to="/contact" className="btn btn--primary btn--lg">{sVal('reach-us-section', 'ctaLabel', 'Book Now')} <i className="fa-solid fa-arrow-right"></i></Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default HomePage
