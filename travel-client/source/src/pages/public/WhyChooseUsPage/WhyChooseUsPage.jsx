import { useState, useEffect } from 'react'
import Header from '../../../components/common/Header/Header'
import Footer from '../../../components/common/Footer/Footer'
import PageHero from '../../../components/common/PageHero/PageHero'
import WhyChooseUsGrid from '../../../components/common/WhyChooseUsGrid/WhyChooseUsGrid'
import { aboutPageSectionsApi } from '../../../services/api'
import { usePageHero } from '../../../hooks/usePageHero'
import './WhyChooseUsPage.css'

const DEFAULT_HERO = {
  title: 'Why Choose Us',
  subtitle: 'Discover what makes us the preferred choice for your Nepal adventure',
  backgroundImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=600&fit=crop',
}

function WhyChooseUsPage() {
  const [intro, setIntro] = useState({
    heading: 'What Sets Us Apart',
    paragraph: 'With over a decade of experience in adventure tourism, we have built a reputation for excellence, safety, and unforgettable experiences. Here\'s why thousands of travelers choose us for their Nepal adventures.',
  })
  const hero = usePageHero('about-why-choose-us', DEFAULT_HERO)

  useEffect(() => {
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
        title={hero.title}
        subtitle={hero.subtitle}
        backgroundImage={hero.backgroundImage}
        breadcrumb="Home / Why Choose Us"
      />

      <section className="section">
        <div className="container">
          <div className="why-choose-us-page__intro">
            <h2>{intro.heading}</h2>
            {intro.paragraph && <p>{intro.paragraph}</p>}
          </div>
          <WhyChooseUsGrid />
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default WhyChooseUsPage
