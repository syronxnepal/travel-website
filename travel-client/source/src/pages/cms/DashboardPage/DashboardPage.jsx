import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { toursApi, treksApi, bookingsApi, blogsApi, shortToursApi, contactsApi, pagesApi, testimonialsApi } from '../../../services/api'
import './DashboardPage.css'

function StatCard({ icon, iconBg, value, label, sub, badge }) {
  return (
    <div className="dash-stat">
      <div className="dash-stat__icon" style={{ background: iconBg }}>
        <i className={`fa-solid ${icon}`}></i>
      </div>
      <div className="dash-stat__body">
        <div className="dash-stat__value">
          {value}
          {badge && <span className="dash-stat__badge">{badge}</span>}
        </div>
        <div className="dash-stat__label">{label}</div>
        {sub && <div className="dash-stat__sub">{sub}</div>}
      </div>
    </div>
  )
}

function SimpleBarChart({ data }) {
  const max = Math.max(...data.map((d) => d.value), 1)
  return (
    <div className="dash-bar-chart">
      {data.map((d) => (
        <div key={d.label} className="dash-bar-chart__col">
          <div className="dash-bar-chart__bar-wrap">
            <div className="dash-bar-chart__bar" style={{ height: `${(d.value / max) * 100}%`, background: d.color }} />
          </div>
          <span className="dash-bar-chart__label">{d.label}</span>
        </div>
      ))}
    </div>
  )
}

function StatusPie({ data }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  return (
    <div className="dash-pie">
      {data.map((d) => (
        <div key={d.label} className="dash-pie__row">
          <span className="dash-pie__dot" style={{ background: d.color }}></span>
          <span className="dash-pie__label">{d.label}</span>
          <span className="dash-pie__val">{d.value} ({total ? Math.round((d.value / total) * 100) : 0}%)</span>
        </div>
      ))}
    </div>
  )
}

function DashboardPage() {
  const { user } = useAuth()
  const [data, setData] = useState({
    treks: [], tours: [], shortTours: [], blogs: [], bookings: [],
    testimonials: [], contacts: [], pages: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const results = await Promise.allSettled([
        treksApi.getAll(),
        toursApi.getAll(),
        shortToursApi.getAll(),
        blogsApi.getAll(),
        bookingsApi.getAll(),
        testimonialsApi?.getAll?.() || Promise.resolve({ data: [] }),
        contactsApi?.getAll?.() || Promise.resolve({ data: [] }),
        pagesApi?.getAll?.() || Promise.resolve({ data: [] }),
      ])
      const get = (r) => r.status === 'fulfilled' ? (r.value?.data || r.value || []) : []
      setData({
        treks: get(results[0]),
        tours: get(results[1]),
        shortTours: get(results[2]),
        blogs: get(results[3]),
        bookings: get(results[4]),
        testimonials: get(results[5]),
        contacts: get(results[6]),
        pages: get(results[7]),
      })
      setLoading(false)
    }
    load()
  }, [])

  const totalRevenue = data.bookings.reduce((s, b) => s + (parseFloat(b.totalPrice) || 0), 0)
  const activeBookings = data.bookings.filter((b) => b.status === 'confirmed' || b.status === 'pending').length
  const recentBookings = [...data.bookings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)
  const recentContacts = [...data.contacts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)
  const newContacts = data.contacts.filter((c) => c.status === 'new' || !c.status).length

  const bookingsByStatus = {
    confirmed: data.bookings.filter((b) => b.status === 'confirmed').length,
    pending: data.bookings.filter((b) => b.status === 'pending').length,
    cancelled: data.bookings.filter((b) => b.status === 'cancelled').length,
  }

  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date()
    d.setMonth(d.getMonth() - (5 - i))
    return { month: d.toLocaleString('default', { month: 'short' }), count: 0 }
  })
  data.bookings.forEach((b) => {
    if (!b.createdAt) return
    const d = new Date(b.createdAt)
    const label = d.toLocaleString('default', { month: 'short' })
    const slot = last6Months.find((m) => m.month === label)
    if (slot) slot.count++
  })

  return (
    <div className="dashboard" style={{ padding: '0 28px 40px' }}>
      {/* Welcome Banner */}
      <div className="dash-welcome">
        <div className="dash-welcome__left">
          <h2>Welcome Back! <span>👋</span></h2>
          <p>Here's what's happening with your travel business today.</p>
        </div>
        <div className="dash-welcome__stats">
          <div>
            <span>TOTAL REVENUE</span>
            <strong>${totalRevenue.toFixed(2)}</strong>
          </div>
          <div>
            <span>ACTIVE BOOKINGS</span>
            <strong>{activeBookings}</strong>
          </div>
        </div>
      </div>

      {/* Content Management */}
      <div className="dash-section-title"><i className="fa-solid fa-chart-line"></i> Content Management</div>
      <div className="dash-stats-grid">
        <StatCard icon="fa-file" iconBg="#7c3aed" value={data.pages.length} label="Pages"
          sub={`${data.pages.filter((p) => p.published !== false).length} published`}
          badge={data.pages.length > 0 ? `+${data.pages.length}` : null} />
        <StatCard icon="fa-triangle-exclamation" iconBg="#FFA500" value={data.treks.length} label="Treks"
          sub={`${data.treks.filter((t) => t.featured).length} featured`} />
        <StatCard icon="fa-people-group" iconBg="#3b82f6" value={data.tours.length} label="Tours"
          sub={`${data.tours.filter((t) => t.featured).length} featured`} />
        <StatCard icon="fa-clock" iconBg="#22c55e" value={data.shortTours.length} label="Short Tours"
          sub={`${data.shortTours.filter((t) => t.featured).length} featured`} />
      </div>

      {/* Engagement */}
      <div className="dash-section-title"><i className="fa-solid fa-heart"></i> Engagement &amp; Interaction</div>
      <div className="dash-stats-grid">
        <StatCard icon="fa-blog" iconBg="#3b82f6" value={data.blogs.length} label="Blog Posts"
          sub={`${data.blogs.filter((b) => b.published !== false).length} published`} />
        <StatCard icon="fa-quote-left" iconBg="#FFA500" value={data.testimonials.length} label="Testimonials"
          sub={`${data.testimonials.filter((t) => t.active !== false).length} active`} />
        <StatCard icon="fa-envelope" iconBg="#17AACF" value={data.contacts.length} label="Contact Messages"
          sub={`${newContacts} new`} />
        <StatCard icon="fa-percent" iconBg="#f97316" value="78%" label="Engagement Rate" sub="+13%" />
      </div>

      {/* Analytics */}
      <div className="dash-section-title"><i className="fa-solid fa-chart-bar"></i> Analytics &amp; Insights</div>

      <div className="dash-booking-trends">
        <h4>Booking Trends (Last 6 Months)</h4>
        {last6Months.some((m) => m.count > 0) ? (
          <div className="dash-trend-chart">
            {last6Months.map((m) => (
              <div key={m.month} className="dash-trend-col">
                <div className="dash-trend-bar" style={{ height: `${Math.max((m.count / Math.max(...last6Months.map((x) => x.count), 1)) * 100, 2)}%` }} />
                <span>{m.month}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="dash-trend-empty">
            <div className="dash-trend-axis" />
            <div className="dash-trend-labels">
              {last6Months.map((m) => <span key={m.month}>{m.month}</span>)}
            </div>
          </div>
        )}
      </div>

      <div className="dash-charts-row">
        <div className="dash-chart-card">
          <h4>Content by Type</h4>
          <SimpleBarChart data={[
            { label: 'Pages', value: data.pages.length, color: '#7c3aed' },
            { label: 'Tours', value: data.tours.length, color: '#3b82f6' },
            { label: 'Treks', value: data.treks.length, color: '#22c55e' },
            { label: 'Blogs', value: data.blogs.length, color: '#FFA500' },
          ]} />
        </div>
        <div className="dash-chart-card">
          <h4>Booking Status Distribution</h4>
          <StatusPie data={[
            { label: 'Confirmed', value: bookingsByStatus.confirmed, color: '#22c55e' },
            { label: 'Pending', value: bookingsByStatus.pending, color: '#FFA500' },
            { label: 'Cancelled', value: bookingsByStatus.cancelled, color: '#e63329' },
          ]} />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="dash-section-title"><i className="fa-solid fa-clock-rotate-left"></i> Recent Activity</div>
      <div className="dash-activity-row">
        {/* Recent Bookings */}
        <div className="dash-activity-card">
          <div className="dash-activity-card__header">
            <h4><i className="fa-solid fa-calendar-check"></i> Recent Bookings</h4>
            <Link to="/cms/bookings/manage" className="dash-view-all">View All →</Link>
          </div>
          <table className="dash-table">
            <thead><tr><th>CUSTOMER</th><th>TOUR</th><th>AMOUNT</th><th>STATUS</th></tr></thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" style={{ textAlign: 'center', padding: 24, color: '#aaa' }}>Loading...</td></tr>
              ) : recentBookings.length === 0 ? (
                <tr><td colSpan="4" style={{ textAlign: 'center', padding: 24, color: '#aaa' }}>No bookings yet</td></tr>
              ) : recentBookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.firstName} {b.lastName}</td>
                  <td style={{ maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.itemTitle || b.bookingType}</td>
                  <td>${parseFloat(b.totalPrice || 0).toFixed(0)}</td>
                  <td><span className={`dash-badge dash-badge--${b.status || 'pending'}`}>{b.status || 'pending'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Contacts */}
        <div className="dash-activity-card">
          <div className="dash-activity-card__header">
            <h4><i className="fa-solid fa-envelope"></i> Recent Contacts</h4>
            <Link to="/cms/contacts/manage" className="dash-view-all">View All →</Link>
          </div>
          <table className="dash-table">
            <thead><tr><th>CONTACT</th><th>SUBJECT</th><th>STATUS</th></tr></thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="3" style={{ textAlign: 'center', padding: 24, color: '#aaa' }}>Loading...</td></tr>
              ) : recentContacts.length === 0 ? (
                <tr><td colSpan="3" style={{ textAlign: 'center', padding: 24, color: '#aaa' }}>No messages yet</td></tr>
              ) : recentContacts.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td style={{ maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.subject || c.title || '—'}</td>
                  <td><span className={`dash-badge dash-badge--${c.status || 'new'}`}>{c.status || 'new'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dash-section-title"><i className="fa-solid fa-bolt"></i> Quick Actions</div>
      <div className="dash-quick-actions">
        {[
          { label: 'Manage Pages', sub: 'Create custom pages', icon: 'fa-file', path: '/cms/pages/manage', color: '#7c3aed' },
          { label: 'Manage Treks', sub: 'Trek content', icon: 'fa-person-hiking', path: '/cms/treks/manage', color: '#FFA500' },
          { label: 'Manage Tours', sub: 'Tour listings', icon: 'fa-route', path: '/cms/tours/manage', color: '#3b82f6' },
          { label: 'Manage Blogs', sub: 'Blog posts', icon: 'fa-blog', path: '/cms/blogs/manage', color: '#22c55e' },
          { label: 'Manage Testimonials', sub: 'Reviews', icon: 'fa-star', path: '/cms/testimonials/manage', color: '#f97316' },
          { label: 'View Bookings', sub: 'Active bookings', icon: 'fa-calendar-check', path: '/cms/bookings/manage', color: '#FFA500' },
        ].map((a) => (
          <Link key={a.path} to={a.path} className="dash-quick-action" style={{ '--qa-color': a.color }}>
            <div className="dash-quick-action__icon" style={{ background: a.color }}>
              <i className={`fa-solid ${a.icon}`}></i>
            </div>
            <div>
              <strong>{a.label}</strong>
              <span>{a.sub}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default DashboardPage
