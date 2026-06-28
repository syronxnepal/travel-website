import Header from '../../../components/common/Header/Header'
import Footer from '../../../components/common/Footer/Footer'
import PageHero from '../../../components/common/PageHero/PageHero'
import SectionHeading from '../../../components/common/SectionHeading/SectionHeading'
import './AboutPage.css'

function AboutPage() {
  return (
    <div className="about-section">
      <Header />
      <PageHero title="About Us" subtitle="Your trusted Nepal adventure partner" backgroundImage="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&h=600&fit=crop" breadcrumb="Home / About" />

      {/* Intro section */}
      <section className="section">
        <div className="container">
          <div className="about-section__intro">
            <div className="about-section__intro-text">
              <SectionHeading eyebrow="Our Story" title="Who We Are" align="left" subtitle="Adventure Nepal has been leading tours and trekking expeditions since 2005. We are a team of passionate travellers, expert guides, and logistics specialists dedicated to providing you with the ultimate Nepal experience." />
              <p>Our local knowledge and international standards combine to deliver safe, authentic, and life-changing adventures across Nepal's diverse landscapes — from the foothills of the Himalayas to the cultural heart of Kathmandu.</p>
            </div>
            <div className="about-section__intro-image">
              <img src="https://images.unsplash.com/photo-1548013146-72479768bada?w=600&h=400&fit=crop" alt="About Adventure Nepal" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section" style={{ background: 'var(--color-primary)' }}>
        <div className="container">
          <div className="about-section__stats">
            {[
              { value: '15+', label: 'Years Experience' },
              { value: '5000+', label: 'Happy Travellers' },
              { value: '100+', label: 'Tour Packages' },
              { value: '50+', label: 'Expert Guides' },
            ].map((stat) => (
              <div key={stat.label} className="about-section__stat">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us section */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Our Promise" title="Why Choose Adventure Nepal" />
          <div className="about-why-choose-us-section">
            {[
              { icon: 'fa-shield-halved', title: 'Safety First', desc: 'All guides certified in wilderness first aid. Emergency evacuation covered.' },
              { icon: 'fa-leaf', title: 'Sustainable Tourism', desc: 'We are committed to eco-friendly practices and supporting local communities.' },
              { icon: 'fa-certificate', title: 'Licenced & Certified', desc: 'Registered with Nepal Tourism Board and TAAN.' },
              { icon: 'fa-star', title: '5-Star Reviews', desc: 'Consistently top-rated on TripAdvisor, Google, and Booking.com.' },
            ].map((item) => (
              <div key={item.title} className="about-why-choose-us-section__card">
                <i className={`fa-solid ${item.icon}`}></i>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="section" style={{ background: 'var(--color-bg-light)' }}>
        <div className="container">
          <SectionHeading eyebrow="Our People" title="Meet the Team" />
          <div className="destination-experts">
            {[
              { name: 'Hari Tamang', role: 'Lead Trek Guide', img: 'https://i.pravatar.cc/150?img=12' },
              { name: 'Sita Gurung', role: 'Tour Manager', img: 'https://i.pravatar.cc/150?img=13' },
              { name: 'Bikash Rai', role: 'Mountain Expert', img: 'https://i.pravatar.cc/150?img=14' },
              { name: 'Maya Sherpa', role: 'Cultural Guide', img: 'https://i.pravatar.cc/150?img=15' },
            ].map((member) => (
              <div key={member.name} className="destination-experts__card">
                <img src={member.img} alt={member.name} />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AboutPage
