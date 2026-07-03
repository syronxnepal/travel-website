import { useState, useEffect } from 'react'
import Header from '../../../components/common/Header/Header'
import Footer from '../../../components/common/Footer/Footer'
import PageHero from '../../../components/common/PageHero/PageHero'
import { aboutPageSectionsApi, aboutMissionItemsApi } from '../../../services/api'
import { usePageHero } from '../../../hooks/usePageHero'
import './OurStoryPage.css'

const DEFAULT_HERO = { title: 'Our Story', subtitle: 'How Adventure Nepal began', backgroundImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=600&fit=crop' }

const DEFAULT_INTRO = {
  heading: 'How It All Began',
  paragraph: 'Our journey started in 2010 when our founder, Sarah Johnson, embarked on her first trek to Everest Base Camp. What began as a personal adventure quickly transformed into a passion for sharing the beauty and culture of Nepal with travelers from around the world.',
  description: 'After years of exploring the Himalayas and understanding the unique needs of travelers, Sarah founded Travel Adventures with a simple mission: to create authentic, sustainable, and unforgettable travel experiences that connect people with the natural beauty and rich culture of Nepal.',
  features: ['Certified & experienced guides', 'Sustainable & responsible tourism', 'Personalised itineraries for every traveler'],
  missionHeading: 'Our Mission',
  missionParagraph: 'We believe that travel has the power to transform lives, build bridges between cultures, and create lasting memories. Our mission is to provide exceptional travel experiences that are not only memorable but also responsible and sustainable.',
}

const DEFAULT_PILLARS = [
  { heading: 'Authenticity', paragraph: 'We provide genuine experiences that showcase the real Nepal, its people, and its culture.' },
  { heading: 'Sustainability', paragraph: 'We are committed to responsible tourism that benefits local communities and preserves the environment.' },
  { heading: 'Excellence', paragraph: 'We strive for the highest standards in everything we do, from planning to execution.' },
]

function OurStoryPage() {
  const [intro, setIntro] = useState(DEFAULT_INTRO)
  const [pillars, setPillars] = useState(DEFAULT_PILLARS)
  const hero = usePageHero('about-our-story', DEFAULT_HERO)

  useEffect(() => {
    aboutPageSectionsApi.getByKey('about-intro-section')
      .then((res) => {
        const data = res?.data || res
        if (data?.heading) {
          setIntro({
            heading: data.heading,
            paragraph: data.paragraph || '',
            description: data.description || '',
            features: Array.isArray(data.features) ? data.features : [],
            missionHeading: data.missionHeading || 'Our Mission',
            missionParagraph: data.missionParagraph || '',
          })
        }
      })
      .catch(() => {})
    aboutMissionItemsApi.getAll()
      .then((res) => {
        const list = (res?.data || res || []).filter((p) => p.isActive !== false)
        if (list.length > 0) setPillars(list)
      })
      .catch(() => {})
  }, [])

  return (
    <div className="our-story-page">
      <Header />
      <PageHero title={hero.title} subtitle={hero.subtitle} backgroundImage={hero.backgroundImage} breadcrumb="Home / Our Story" />

      <section className="section">
        <div className="container our-story-page__block">
          <h2>{intro.heading}</h2>
          {intro.paragraph && <p>{intro.paragraph}</p>}
          {intro.description && <p>{intro.description}</p>}
          {intro.features?.length > 0 && (
            <ul className="our-story-page__features">
              {intro.features.map((f, i) => (
                <li key={i}><i className="fa-solid fa-circle-check"></i> {f}</li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="section our-story-page__mission-section">
        <div className="container our-story-page__block">
          <h2>{intro.missionHeading}</h2>
          {intro.missionParagraph && <p>{intro.missionParagraph}</p>}

          <div className="our-story-page__pillars">
            {pillars.map((p, i) => (
              <div key={p._id || p.id || i} className="our-story-page__pillar">
                <h3>{p.heading}</h3>
                <p>{p.paragraph}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default OurStoryPage
