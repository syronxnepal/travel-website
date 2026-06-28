import Header from '../../../components/common/Header/Header'
import Footer from '../../../components/common/Footer/Footer'
import PageHero from '../../../components/common/PageHero/PageHero'
import './OurStoryPage.css'

function OurStoryPage() {
  return (
    <div className="our-story-page">
      <Header />
      <PageHero title="Our Story" subtitle="How Adventure Nepal began" backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=600&fit=crop" breadcrumb="Home / Our Story" />

      <section className="section">
        <div className="container">
          <div className="our-story-page__content">
            <div className="our-story-page__timeline">
              {[
                { year: '2005', title: 'The Beginning', desc: 'Adventure Nepal was founded by a group of passionate trekkers with a dream to share Nepal\'s beauty with the world.' },
                { year: '2010', title: 'Growing the Team', desc: 'We expanded our guide team and started offering curated cultural tours alongside our trekking routes.' },
                { year: '2015', title: 'International Recognition', desc: 'Featured in National Geographic Traveller and winner of the Nepal Tourism Excellence Award.' },
                { year: '2020', title: 'Going Digital', desc: 'Launched online booking and virtual consultations to serve adventurers worldwide.' },
                { year: '2024', title: 'Today', desc: 'Over 5,000 happy travellers and counting. Still driven by the same passion for adventure.' },
              ].map((item) => (
                <div key={item.year} className="our-story-page__timeline-item">
                  <div className="our-story-page__timeline-year">{item.year}</div>
                  <div className="our-story-page__timeline-content">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default OurStoryPage
