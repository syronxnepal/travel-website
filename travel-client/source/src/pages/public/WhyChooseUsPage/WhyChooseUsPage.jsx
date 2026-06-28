import Header from '../../../components/common/Header/Header'
import Footer from '../../../components/common/Footer/Footer'
import PageHero from '../../../components/common/PageHero/PageHero'
import SectionHeading from '../../../components/common/SectionHeading/SectionHeading'
import './WhyChooseUsPage.css'

function WhyChooseUsPage() {
  const reasons = [
    { icon: 'fa-shield-halved', title: 'Safety Certified', desc: 'All our guides are certified by the Nepal Mountaineering Association and trained in wilderness first aid.' },
    { icon: 'fa-earth-asia', title: 'Local Expertise', desc: 'Born and raised in Nepal, our guides offer authentic insights into local culture, history and traditions.' },
    { icon: 'fa-hand-holding-dollar', title: 'Transparent Pricing', desc: 'No hidden charges. All our packages include a clear breakdown of what\'s included and what\'s not.' },
    { icon: 'fa-headset', title: '24/7 Support', desc: 'Our team is available around the clock, before your trip and while you\'re travelling.' },
    { icon: 'fa-leaf', title: 'Eco-Friendly', desc: 'We practice Leave No Trace principles and actively support conservation efforts in the Himalayas.' },
    { icon: 'fa-certificate', title: 'Fully Licensed', desc: 'Licensed by Nepal Tourism Board (NTB) and member of TAAN and KEEP organizations.' },
  ]

  return (
    <div className="why-choose-us-page">
      <Header />
      <PageHero title="Why Choose Us" backgroundImage="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=600&fit=crop" breadcrumb="Home / Why Choose Us" />

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Our Advantages" title="6 Reasons to Book With Us" />
          <div className="why-choose-us-page__grid">
            {reasons.map((r) => (
              <div key={r.title} className="why-choose-us-page__card">
                <div className="why-choose-us-page__icon"><i className={`fa-solid ${r.icon}`}></i></div>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
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
