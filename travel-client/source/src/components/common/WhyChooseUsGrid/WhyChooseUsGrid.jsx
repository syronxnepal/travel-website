import { useState, useEffect } from 'react'
import { aboutWhyChooseUsItemsApi } from '../../../services/api'
import './WhyChooseUsGrid.css'

const DEFAULT_REASONS = [
  { icon: 'fa-shield-halved', heading: 'Safety First', paragraph: 'We prioritize your safety with certified guides, quality equipment, and comprehensive insurance coverage for all our adventures.' },
  { icon: 'fa-user-group', heading: 'Expert Local Guides', paragraph: 'Our experienced local guides have intimate knowledge of the terrain, culture, and best practices for safe and enjoyable adventures.' },
  { icon: 'fa-leaf', heading: 'Sustainable Tourism', paragraph: 'We are committed to responsible tourism that benefits local communities and preserves the natural environment for future generations.' },
  { icon: 'fa-star', heading: 'Exceptional Service', paragraph: 'From planning to execution, we provide personalised service and attention to detail that exceeds expectations.' },
  { icon: 'fa-handshake', heading: 'Local Partnerships', paragraph: 'We work closely with local communities, ensuring your travel directly benefits the people and places you visit.' },
  { icon: 'fa-clock', heading: '24/7 Support', paragraph: 'Our dedicated support team is available around the clock to assist you before, during, and after your adventure.' },
]

function WhyChooseUsGrid() {
  const [reasons, setReasons] = useState(DEFAULT_REASONS)

  useEffect(() => {
    aboutWhyChooseUsItemsApi.getAll()
      .then((res) => {
        const list = (res?.data || res || []).filter((r) => r.isActive !== false)
        if (list.length > 0) setReasons(list)
      })
      .catch(() => {})
  }, [])

  return (
    <div className="why-choose-us-grid">
      {reasons.map((r, i) => (
        <div key={r._id || r.id || i} className="why-choose-us-grid__card">
          <div className="why-choose-us-grid__icon"><i className={`fa-solid ${r.icon}`}></i></div>
          <h3>{r.heading}</h3>
          <p>{r.paragraph}</p>
        </div>
      ))}
    </div>
  )
}

export default WhyChooseUsGrid
