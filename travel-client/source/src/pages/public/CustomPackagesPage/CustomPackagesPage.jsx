import { useState, useEffect } from 'react'
import Header from '../../../components/common/Header/Header'
import Footer from '../../../components/common/Footer/Footer'
import { treksApi, toursApi, shortToursApi, bookingsApi } from '../../../services/api'
import { getImageUrl } from '../../../utils/helpers'
import { useToast } from '../../../context/ToastContext'
import './CustomPackagesPage.css'

const PACKAGE_OPTIONS = [
  { group: 'Accommodation', options: [
    { key: 'acc_3star', label: '3-Star Accommodation', desc: 'Comfortable 3-star hotels and lodges' },
    { key: 'acc_4star', label: '4-Star Accommodation', desc: 'Luxury 4-star hotels and resorts' },
    { key: 'acc_5star', label: '5-Star Accommodation', desc: 'Premium 5-star hotels and luxury resorts' },
  ]},
  { group: 'Vehicle', options: [
    { key: 'veh_private', label: 'Private Vehicle', desc: 'Private car with driver for all transfers' },
    { key: 'veh_luxury', label: 'Luxury Vehicle', desc: 'Premium vehicle with experienced driver' },
  ]},
  { group: 'Guide', options: [
    { key: 'guide_english', label: 'English Speaking Guide', desc: 'Professional English speaking guide' },
    { key: 'guide_multi', label: 'Multilingual Guide', desc: 'Guide speaking multiple languages' },
  ]},
  { group: 'Equipment', options: [
    { key: 'equip_basic', label: 'Basic Trekking Equipment', desc: 'Essential trekking gear and equipment' },
    { key: 'equip_premium', label: 'Premium Trekking Equipment', desc: 'High quality trekking gear and equipment' },
  ]},
  { group: 'Meals', options: [
    { key: 'meal_breakfast', label: 'Breakfast Included', desc: 'Daily breakfast at accommodation' },
    { key: 'meal_fullboard', label: 'Full Board Meals', desc: 'All meals included (breakfast, lunch, dinner)' },
  ]},
]

function Section({ icon, title, badge, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="cpkg-section">
      <button className="cpkg-section__header" onClick={() => setOpen(!open)}>
        <div className="cpkg-section__title">
          <i className={`fa-solid ${icon} cpkg-section__icon`}></i>
          <span>{title}</span>
          {badge !== undefined && <span className="cpkg-badge">{badge} selected</span>}
        </div>
        <i className={`fa-solid fa-chevron-${open ? 'up' : 'down'}`}></i>
      </button>
      {open && <div className="cpkg-section__body">{children}</div>}
    </div>
  )
}

function Counter({ label, value, onChange, min = 1 }) {
  return (
    <div className="cpkg-counter">
      <span className="cpkg-counter__label">{label}</span>
      <div className="cpkg-counter__ctrl">
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))}>−</button>
        <span>{value}</span>
        <button type="button" onClick={() => onChange(value + 1)}>+</button>
      </div>
    </div>
  )
}

function CustomPackagesPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState([]) // array of { id, type, item }
  const [pkgOptions, setPkgOptions] = useState({ acc_3star: true, veh_private: true, guide_english: true })
  const [pkg, setPkg] = useState({ groupSize: 2, duration: 7, startDate: '', endDate: '' })
  const [details, setDetails] = useState({ firstName: '', lastName: '', email: '', phone: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const toast = useToast()

  useEffect(() => {
    async function load() {
      const norm = (arr, type) => (arr?.data || arr || []).map((item) => ({ ...item, _type: type }))
      try {
        const [treks, tours, shorts] = await Promise.all([
          treksApi.getAll({ customActivity: true }).catch(() => ({ data: [] })),
          toursApi.getAll({ customActivity: true }).catch(() => ({ data: [] })),
          shortToursApi.getAll({ customActivity: true }).catch(() => ({ data: [] })),
        ])
        let all = [
          ...norm(treks, 'trek'),
          ...norm(tours, 'tour'),
          ...norm(shorts, 'short-tour'),
        ]
        // Fall back to all items if none are marked customActivity
        if (all.length === 0) {
          const [t2, to2, s2] = await Promise.all([
            treksApi.getAll().catch(() => ({ data: [] })),
            toursApi.getAll().catch(() => ({ data: [] })),
            shortToursApi.getAll().catch(() => ({ data: [] })),
          ])
          all = [
            ...norm(t2, 'trek'),
            ...norm(to2, 'tour'),
            ...norm(s2, 'short-tour'),
          ]
        }
        setItems(all)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const selectedOptions = PACKAGE_OPTIONS.flatMap((g) => g.options).filter((o) => pkgOptions[o.key])

  function toggleActivity(id, type, item) {
    setSelected((prev) => {
      const exists = prev.some((s) => s.id === id && s.type === type)
      return exists ? prev.filter((s) => !(s.id === id && s.type === type)) : [...prev, { id, type, item }]
    })
  }

  function toggleOption(key) {
    setPkgOptions((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!details.firstName || !details.lastName || !details.email) return
    if (selected.length === 0) { toast?.error?.('Please select at least one activity.'); return }
    setSubmitting(true)

    const optionLabels = selectedOptions.map((o) => o.label).join(', ')
    const activityList = selected.map((s) => `${s.item.title} (${s.type})`).join(', ')
    const specialRequests = [
      activityList ? `Activities: ${activityList}` : '',
      optionLabels ? `Package Options: ${optionLabels}` : '',
      `Group Size: ${pkg.groupSize} persons`,
      `Duration: ${pkg.duration} days`,
      pkg.startDate ? `Start Date: ${pkg.startDate}` : '',
      pkg.endDate ? `End Date: ${pkg.endDate}` : '',
    ].filter(Boolean).join('\n')

    try {
      await bookingsApi.create({
        firstName: details.firstName.trim(),
        lastName: details.lastName.trim(),
        email: details.email.trim(),
        phone: details.phone || 'N/A',
        specialRequests,
        bookingType: 'custom-package',
        itemId: selected[0]?.id || 0,
        itemTitle: selected.length > 0 ? selected.map((s) => s.item.title).join(', ') : 'Custom Package',
        travelDate: pkg.startDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        numberOfPersons: Number(pkg.groupSize) || 1,
        basePrice: 0,
        totalPrice: 0,
        paymentMethod: 'cash-after-delivery',
        travelInsurance: false,
        privateGuide: !!(pkgOptions.guide_english || pkgOptions.guide_multi),
        privateTransport: pkgOptions.veh_private || pkgOptions.veh_luxury || false,
        mealUpgrade: pkgOptions.meal_fullboard || false,
      })
      setSubmitted(true)
    } catch (err) {
      toast?.error?.(err.message || 'Submission failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="custom-packages-page">
        <Header />
        <div className="cpkg-success">
          <i className="fa-solid fa-circle-check"></i>
          <h3>Quote Request Submitted!</h3>
          <p>Thank you, <strong>{details.firstName}</strong>! Our team will contact you within 24 hours with a personalised itinerary and pricing.</p>
          <button className="btn btn--primary" onClick={() => {
            setSubmitted(false); setSelected([])
            setPkgOptions({ acc_3star: true, veh_private: true, guide_english: true })
            setPkg({ groupSize: 2, duration: 7, startDate: '', endDate: '' })
            setDetails({ firstName: '', lastName: '', email: '', phone: '' })
          }}>Request Another Package</button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="custom-packages-page">
      <Header />

      <div className="cpkg-hero">
        <div className="container">
          <p className="cpkg-hero__sub">DESIGN YOUR TRIP</p>
          <h1>Create Your Custom Package</h1>
          <p className="cpkg-hero__desc">Select a trip, choose your preferences, and let our experts build the perfect adventure for you.</p>
        </div>
      </div>

      <div className="container">
        <form className="cpkg-layout" onSubmit={handleSubmit}>

          {/* LEFT: Builder */}
          <div className="cpkg-main">

            {/* Select Activities */}
            <Section icon="fa-triangle-exclamation" title="Select Activities" badge={selected.length} defaultOpen>
              {loading ? (
                <div style={{ padding: 24, textAlign: 'center', color: '#888' }}>Loading trips...</div>
              ) : items.length === 0 ? (
                <div style={{ padding: 24, textAlign: 'center', color: '#888' }}>No trips available.</div>
              ) : (
                <div className="cpkg-items-grid">
                  {items.map((item) => {
                    const id = item.id
                    const type = item._type
                    const isSelected = selected.some((s) => s.id === id && s.type === type)
                    const typeLabel = type === 'trek' ? 'Trek' : type === 'tour' ? 'Tour' : 'Short Tour'
                    const typeClass = type === 'trek' ? 'trek' : type === 'tour' ? 'tour' : 'short'
                    return (
                      <label
                        key={`${type}-${id}`}
                        className={`cpkg-item-card${isSelected ? ' selected' : ''}`}
                        onClick={() => toggleActivity(id, type, item)}
                      >
                        <img src={getImageUrl(item.image)} alt={item.title} className="cpkg-item-card__img" />
                        <div className="cpkg-item-card__body">
                          <div className="cpkg-item-card__top">
                            <h4>{item.title}</h4>
                            <span className={`cpkg-type-badge cpkg-type-badge--${typeClass}`}>{typeLabel}</span>
                          </div>
                          <div className="cpkg-item-card__meta">
                            {item.duration && <span><i className="fa-regular fa-clock"></i> {item.duration}</span>}
                            {item.difficulty && <span><i className="fa-solid fa-signal"></i> {item.difficulty}</span>}
                            {item.groupSize && <span><i className="fa-solid fa-users"></i> {item.groupSize}</span>}
                          </div>
                        </div>
                        <span className="cpkg-item-card__check">
                          {isSelected
                            ? <i className="fa-solid fa-circle-check"></i>
                            : <i className="fa-regular fa-circle"></i>}
                        </span>
                      </label>
                    )
                  })}
                </div>
              )}
            </Section>

            {/* Package Details */}
            <Section icon="fa-circle-info" title="Package Details" defaultOpen>
              <div className="cpkg-pkg-details">
                <Counter label="Group Size" value={pkg.groupSize} onChange={(v) => setPkg({ ...pkg, groupSize: v })} />
                <Counter label="Duration (Days)" value={pkg.duration} onChange={(v) => setPkg({ ...pkg, duration: v })} />
                <div className="form-field">
                  <label>Start Date</label>
                  <input type="date" value={pkg.startDate} onChange={(e) => setPkg({ ...pkg, startDate: e.target.value })} min={new Date().toISOString().split('T')[0]} />
                </div>
                <div className="form-field">
                  <label>End Date</label>
                  <input type="date" value={pkg.endDate} onChange={(e) => setPkg({ ...pkg, endDate: e.target.value })} min={pkg.startDate || new Date().toISOString().split('T')[0]} />
                </div>
              </div>
            </Section>

            {/* Package Options */}
            <Section icon="fa-star" title="Package Options" badge={selectedOptions.length} defaultOpen>
              <div className="cpkg-options-list">
                {PACKAGE_OPTIONS.map((group) => (
                  <div key={group.group} className="cpkg-options-group">
                    {group.options.map((opt) => (
                      <label key={opt.key} className={`cpkg-option${pkgOptions[opt.key] ? ' selected' : ''}`}>
                        <span className="cpkg-option__check">
                          {pkgOptions[opt.key] ? <i className="fa-solid fa-square-check"></i> : <i className="fa-regular fa-square"></i>}
                        </span>
                        <input type="checkbox" checked={!!pkgOptions[opt.key]} onChange={() => toggleOption(opt.key)} />
                        <div>
                          <strong>{opt.label}</strong>
                          <span>{opt.desc}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                ))}
              </div>
            </Section>

            {/* Your Details */}
            <Section icon="fa-user" title="Your Details" defaultOpen>
              <div className="cpkg-details-grid">
                <div className="form-field">
                  <label><i className="fa-solid fa-user"></i> First Name *</label>
                  <input type="text" placeholder="Enter your first name" value={details.firstName} onChange={(e) => setDetails({ ...details, firstName: e.target.value })} required />
                </div>
                <div className="form-field">
                  <label><i className="fa-solid fa-user"></i> Last Name *</label>
                  <input type="text" placeholder="Enter your last name" value={details.lastName} onChange={(e) => setDetails({ ...details, lastName: e.target.value })} required />
                </div>
                <div className="form-field">
                  <label><i className="fa-solid fa-envelope"></i> Email Address *</label>
                  <input type="email" placeholder="Enter your email" value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value })} required />
                </div>
              </div>
              <div className="form-field" style={{ marginTop: 0 }}>
                <label><i className="fa-solid fa-phone"></i> Phone Number</label>
                <input type="tel" placeholder="Enter your phone number (optional)" value={details.phone} onChange={(e) => setDetails({ ...details, phone: e.target.value })} />
              </div>
            </Section>
          </div>

          {/* RIGHT: Summary sidebar */}
          <aside className="cpkg-sidebar">
            <div className="cpkg-summary">
              <h3>Your Custom Package</h3>

              <div className="cpkg-summary__section">
                <div className="cpkg-summary__section-title">
                  <i className="fa-solid fa-triangle-exclamation"></i> Activities ({selected.length})
                </div>
                {selected.length > 0 ? (
                  <div className="cpkg-summary__activities">
                    {selected.map((s) => (
                      <div key={`${s.type}-${s.id}`} className="cpkg-summary__activity">
                        <img src={getImageUrl(s.item.image)} alt={s.item.title} />
                        <div>
                          <span>{s.item.title}</span>
                          <em>{s.type === 'trek' ? 'Trek' : s.type === 'tour' ? 'Tour' : 'Short Tour'}</em>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="cpkg-summary__empty">No activities selected</p>
                )}
              </div>

              <div className="cpkg-summary__section">
                <div className="cpkg-summary__section-title">
                  <i className="fa-solid fa-star"></i> Package Options
                </div>
                {selectedOptions.length > 0 ? (
                  <ul className="cpkg-summary__opts">
                    {selectedOptions.map((o) => (
                      <li key={o.key}><i className="fa-solid fa-check"></i> {o.label}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="cpkg-summary__empty">No options selected</p>
                )}
              </div>

              <div className="cpkg-summary__section">
                <div className="cpkg-summary__section-title">
                  <i className="fa-solid fa-circle-info"></i> Package Details
                </div>
                <div className="cpkg-summary__details">
                  <div><span>Group Size</span><strong>{pkg.groupSize} {pkg.groupSize === 1 ? 'person' : 'people'}</strong></div>
                  <div><span>Duration</span><strong>{pkg.duration} days</strong></div>
                  <div><span>Start Date</span><strong>{pkg.startDate || 'Not set'}</strong></div>
                  <div><span>End Date</span><strong>{pkg.endDate || 'Not set'}</strong></div>
                </div>
              </div>

              <button type="submit" className="cpkg-submit-btn" disabled={submitting}>
                {submitting ? 'Submitting...' : <><i className="fa-solid fa-paper-plane"></i> Request Quote</>}
              </button>
            </div>
          </aside>
        </form>
      </div>

      <Footer />
    </div>
  )
}

export default CustomPackagesPage
