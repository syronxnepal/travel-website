import Header from '../../../components/common/Header/Header'
import Footer from '../../../components/common/Footer/Footer'
import PageHero from '../../../components/common/PageHero/PageHero'
import { Link } from 'react-router-dom'

function MorePage() {
  const links = [
    { label: 'Our Story', path: '/our-story', icon: 'fa-book-open', desc: 'Learn about how Adventure Nepal started.' },
    { label: 'Why Choose Us', path: '/why-choose-us', icon: 'fa-award', desc: 'Reasons to travel with us.' },
    { label: 'Custom Packages', path: '/custom-packages', icon: 'fa-suitcase', desc: 'Build your own Nepal adventure.' },
    { label: 'Gallery', path: '/gallery', icon: 'fa-images', desc: 'Stunning photographs from our trips.' },
    { label: 'Blog', path: '/blogs', icon: 'fa-newspaper', desc: 'Travel tips and stories from Nepal.' },
    { label: 'Contact', path: '/contact', icon: 'fa-envelope', desc: 'Get in touch with our team.' },
  ]

  return (
    <div>
      <Header />
      <PageHero title="More" breadcrumb="Home / More" />
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {links.map((link) => (
              <Link key={link.path} to={link.path} style={{ display: 'block', padding: 28, background: '#fff', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', transition: 'var(--transition)', textDecoration: 'none', color: 'inherit' }}>
                <i className={`fa-solid ${link.icon}`} style={{ fontSize: 28, color: 'var(--color-primary)', marginBottom: 12 }}></i>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{link.label}</h3>
                <p style={{ fontSize: 13, color: 'var(--color-text-light)' }}>{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default MorePage
