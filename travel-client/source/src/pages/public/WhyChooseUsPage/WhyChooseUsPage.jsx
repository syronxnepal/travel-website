import { useState, useEffect } from 'react'
import Header from '../../../components/common/Header/Header'
import Footer from '../../../components/common/Footer/Footer'
import PageHero from '../../../components/common/PageHero/PageHero'
import { aboutWhyChooseUsItemsApi, aboutPageSectionsApi } from '../../../services/api'
import './WhyChooseUsPage.css'

const DEFAULT_REASONS = [
  { icon: 'fa-shield-halved', heading: 'Safety First', paragraph: 'We prioritize your safety with certified guides, quality equipment, and comprehensive insurance coverage for all our adventures.' },
  { icon: 'fa-user-group', heading: 'Expert Local Guides', paragraph: 'Our experienced local guides have intimate knowledge of the terrain, culture, and best practices for safe and enjoyable adventures.' },
  { icon: 'fa-leaf', heading: 'Sustainable Tourism', paragraph: 'We are committed to responsible tourism that benefits local communities and preserves the natural environment for future generations.' },
  { icon: 'fa-star', heading: 'Exceptional Service', paragraph: 'From planning to execution, we provide personalised service and attention to detail that exceeds expectations.' },
  { icon: 'fa-handshake', heading: 'Local Partnerships', paragraph: 'We work closely with local communities, ensuring your travel directly benefits the people and places you visit.' },
  { icon: 'fa-clock', heading: '24/7 Support', paragraph: 'Our dedicated support team is available around the clock to assist you before, during, and after your adventure.' },
]

function WhyChooseUsPage() {
  const [reasons, setReasons] = useState(DEFAULT_REASONS)
  const [intro, setIntro] = useState({
    heading: 'What Sets Us Apart',
    paragraph: 'With over a decade of experience in adventure tourism, we have built a reputation for excellence, safety, and unforgettable experiences. Here\'s why thousands of travelers choose us for their Nepal adventures.',
  })

  useEffect(() => {
    aboutWhyChooseUsItemsApi.getAll()
      .then((res) => {
        const list = (res?.data || res || []).filter((r) => r.isActive !== false)
        if (list.length > 0) setReasons(list)
      })
      .catch(() => {})
    aboutPageSectionsApi.getByKey('about-why-choose-us-section')
      .then((res) => {
        const data = res?.data || res
        if (data?.heading) setIntro({ heading: data.heading, paragraph: data.paragraph || '' })
      })
      .catch(() => {})
  }, [])

  return (
    <div className="why-choose-us-page">
      <Header />
      <PageHero
        title="Why Choose Us"
        subtitle="Discover what makes us the preferred choice for your Nepal adventure"
        backgroundImage="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=600&fit=crop"
        breadcrumb="Home / Why Choose Us"
      />

      <section className="section">
        <div className="container">
          <div className="why-choose-us-page__intro">
            <h2>{intro.heading}</h2>
            {intro.paragraph && <p>{intro.paragraph}</p>}
          </div>
          <div className="why-choose-us-page__grid">
            {reasons.map((r, i) => (
              <div key={r._id || r.id || i} className="why-choose-us-page__card">
                <div className="why-choose-us-page__icon"><i className={`fa-solid ${r.icon}`}></i></div>
                <h3>{r.heading}</h3>
                <p>{r.paragraph}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default WhyChooseUsPage
