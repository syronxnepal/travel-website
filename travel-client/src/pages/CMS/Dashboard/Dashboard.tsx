import React from 'react';
import { Link } from 'react-router-dom';
import CMSLayout from 'src/components/CMS/CMSLayout/CMSLayout';
import LineChart from 'src/components/Charts/LineChart/LineChart';
import BarChart from 'src/components/Charts/BarChart/BarChart';
import PieChart from 'src/components/Charts/PieChart/PieChart';
import 'src/pages/CMS/CMSPage.scss';
import './Dashboard.scss';

const Dashboard: React.FC = () => {
  // Mock data - in real app, this would come from API
  const stats = {
    pages: { total: 8, published: 6, draft: 2 },
    treks: { total: 45, featured: 12 },
    tours: { total: 89, featured: 18 },
    shortTours: { total: 23, featured: 8 },
    bookings: { total: 234, confirmed: 189, pending: 32 },
    testimonials: { total: 67, active: 52 },
    blogs: { total: 45, published: 38 },
    contacts: { total: 128, new: 24 },
    engagement: { rate: 78, trend: '+12%' }
  };

  const recentBookings = [
    { id: '1', customer: 'John Doe', tour: 'Everest Base Camp Trek', date: '2024-01-25', status: 'confirmed', amount: '$1,200' },
    { id: '2', customer: 'Sarah Johnson', tour: 'Cultural Heritage Tour', date: '2024-01-24', status: 'pending', amount: '$450' },
    { id: '3', customer: 'Michael Chen', tour: 'Beach Paradise Tour', date: '2024-01-23', status: 'confirmed', amount: '$680' },
    { id: '4', customer: 'Emily Davis', tour: 'Annapurna Circuit Trek', date: '2024-01-22', status: 'confirmed', amount: '$1,100' }
  ];

  const recentContacts = [
    { id: '1', name: 'David Wilson', email: 'david@example.com', subject: 'Custom Package Inquiry', date: '2024-01-25', status: 'new' },
    { id: '2', name: 'Lisa Anderson', email: 'lisa@example.com', subject: 'Group Booking Question', date: '2024-01-24', status: 'read' },
    { id: '3', name: 'Robert Brown', email: 'robert@example.com', subject: 'VIP Experience Details', date: '2024-01-23', status: 'new' }
  ];

  // Chart data
  const bookingTrend = [
    { label: 'Jan', value: 45 },
    { label: 'Feb', value: 52 },
    { label: 'Mar', value: 48 },
    { label: 'Apr', value: 61 },
    { label: 'May', value: 55 },
    { label: 'Jun', value: 67 }
  ];

  const contentByType = [
    { label: 'Pages', value: 8, color: '#3b82f6' },
    { label: 'Tours', value: 89, color: '#8b5cf6' },
    { label: 'Treks', value: 45, color: '#10b981' },
    { label: 'Blogs', value: 45, color: '#f59e0b' }
  ];

  const bookingStatusData = [
    { label: 'Confirmed', value: 189, color: '#10b981' },
    { label: 'Pending', value: 32, color: '#f59e0b' },
    { label: 'Cancelled', value: 13, color: '#ef4444' }
  ];

  const StatCard = ({ icon, label, value, color, subText, trend }: { icon: string; label: string; value: string | number; color: string; subText?: string; trend?: string }) => (
    <div className="dashboard-stat-card">
      <div className="dashboard-stat-card__icon" style={{ background: color }}>
        <i className={icon}></i>
      </div>
      <div className="dashboard-stat-card__content">
        <div className="dashboard-stat-card__main">
          <h3 className="dashboard-stat-card__value">{value}</h3>
          {trend && <span className="dashboard-stat-card__trend">↑ {trend}</span>}
        </div>
        <p className="dashboard-stat-card__label">{label}</p>
        {subText && <span className="dashboard-stat-card__sub">{subText}</span>}
      </div>
    </div>
  );

  return (
    <CMSLayout>
      <div className="cms-page">
        <div className="dashboard">
          <div className="dashboard__welcome">
            <div className="dashboard__welcome-content">
              <div>
                <h1>Welcome Back! 👋</h1>
                <p>Here's what's happening with your travel business today.</p>
              </div>
              <div className="dashboard__welcome-stats">
                <div className="dashboard__welcome-stat">
                  <span className="dashboard__welcome-stat-label">Total Revenue</span>
                  <span className="dashboard__welcome-stat-value">$125,340</span>
                </div>
                <div className="dashboard__welcome-stat">
                  <span className="dashboard__welcome-stat-label">Active Bookings</span>
                  <span className="dashboard__welcome-stat-value">{stats.bookings.total}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard__content">
            {/* Main Content Stats */}
            <div className="dashboard__section">
              <div className="dashboard__section-header">
                <h3 className="dashboard__section-title">
                  <i className="fa-solid fa-chart-line"></i>
                  Content Management
                </h3>
              </div>
              <div className="dashboard__stats-grid">
                <StatCard
                  icon="fa-solid fa-file"
                  label="Pages"
                  value={stats.pages.total}
                  color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  subText={`${stats.pages.published} published`}
                  trend="+2"
                />
                <StatCard
                  icon="fa-solid fa-mountain"
                  label="Treks"
                  value={stats.treks.total}
                  color="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                  subText={`${stats.treks.featured} featured`}
                />
                <StatCard
                  icon="fa-solid fa-route"
                  label="Tours"
                  value={stats.tours.total}
                  color="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
                  subText={`${stats.tours.featured} featured`}
                />
                <StatCard
                  icon="fa-solid fa-clock"
                  label="Short Tours"
                  value={stats.shortTours.total}
                  color="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
                  subText={`${stats.shortTours.featured} featured`}
                />
              </div>
            </div>

            {/* Engagement Stats */}
            <div className="dashboard__section">
              <div className="dashboard__section-header">
                <h3 className="dashboard__section-title">
                  <i className="fa-solid fa-heart"></i>
                  Engagement & Interaction
                </h3>
              </div>
              <div className="dashboard__stats-grid">
                <StatCard
                  icon="fa-solid fa-blog"
                  label="Blog Posts"
                  value={stats.blogs.total}
                  color="linear-gradient(135deg, #30cfd0 0%, #330867 100%)"
                  subText={`${stats.blogs.published} published`}
                />
                <StatCard
                  icon="fa-solid fa-quote-left"
                  label="Testimonials"
                  value={stats.testimonials.total}
                  color="linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
                  subText={`${stats.testimonials.active} active`}
                />
                <StatCard
                  icon="fa-solid fa-envelope"
                  label="Contact Messages"
                  value={stats.contacts.total}
                  color="linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
                  subText={`${stats.contacts.new} new`}
                  trend={`${stats.contacts.new}`}
                />
                <StatCard
                  icon="fa-solid fa-percentage"
                  label="Engagement Rate"
                  value={`${stats.engagement.rate}%`}
                  color="linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
                  subText={stats.engagement.trend}
                />
              </div>
            </div>

            {/* Charts Section */}
            <div className="dashboard__section">
              <div className="dashboard__section-header">
                <h3 className="dashboard__section-title">
                  <i className="fa-solid fa-chart-bar"></i>
                  Analytics & Insights
                </h3>
              </div>
              <div className="dashboard__charts-grid">
                <div className="dashboard__chart-item dashboard__chart-item--full">
                  <LineChart
                    data={bookingTrend}
                    title="Booking Trends (Last 6 Months)"
                  />
                </div>
                <div className="dashboard__chart-item">
                  <BarChart
                    data={contentByType}
                    title="Content by Type"
                  />
                </div>
                <div className="dashboard__chart-item">
                  <PieChart
                    data={bookingStatusData}
                    title="Booking Status Distribution"
                  />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="dashboard__section">
              <div className="dashboard__section-header">
                <h3 className="dashboard__section-title">
                  <i className="fa-solid fa-clock-rotate-left"></i>
                  Recent Activity
                </h3>
              </div>
              <div className="dashboard__two-column">
                <div className="dashboard__card">
                  <div className="dashboard__card-header">
                    <h4 className="dashboard__card-title">
                      <i className="fa-solid fa-calendar-check"></i>
                      Recent Bookings
                    </h4>
                    <Link to="/cms/bookings/manage" className="dashboard__card-link">
                      View All <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                  <div className="dashboard__card-content">
                    <table className="dashboard__table">
                      <thead>
                        <tr>
                          <th>Customer</th>
                          <th>Tour</th>
                          <th>Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentBookings.map((booking) => (
                          <tr key={booking.id}>
                            <td>
                              <div className="dashboard__table-cell">
                                <strong>{booking.customer}</strong>
                                <span className="dashboard__table-meta">{booking.date}</span>
                              </div>
                            </td>
                            <td>{booking.tour}</td>
                            <td className="dashboard__table-amount">{booking.amount}</td>
                            <td>
                              <span className={`dashboard__badge dashboard__badge--${booking.status}`}>
                                {booking.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="dashboard__card">
                  <div className="dashboard__card-header">
                    <h4 className="dashboard__card-title">
                      <i className="fa-solid fa-envelope"></i>
                      Recent Contacts
                    </h4>
                    <Link to="/cms/contacts/manage" className="dashboard__card-link">
                      View All <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                  <div className="dashboard__card-content">
                    <table className="dashboard__table">
                      <thead>
                        <tr>
                          <th>Contact</th>
                          <th>Subject</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentContacts.map((contact) => (
                          <tr key={contact.id}>
                            <td>
                              <div className="dashboard__table-cell">
                                <strong>{contact.name}</strong>
                                <span className="dashboard__table-meta">{contact.email}</span>
                              </div>
                            </td>
                            <td className="dashboard__table-subject">{contact.subject}</td>
                            <td>
                              <span className={`dashboard__badge dashboard__badge--${contact.status}`}>
                                {contact.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="dashboard__section">
              <div className="dashboard__section-header">
                <h3 className="dashboard__section-title">
                  <i className="fa-solid fa-bolt"></i>
                  Quick Actions
                </h3>
              </div>
              <div className="dashboard__quick-actions">
                <Link to="/cms/pages/manage" className="dashboard__quick-action dashboard__quick-action--primary">
                  <i className="fa-solid fa-file"></i>
                  <div>
                    <span className="dashboard__quick-action-title">Manage Pages</span>
                    <span className="dashboard__quick-action-sub">Create custom pages</span>
                  </div>
                </Link>
                <Link to="/cms/treks/manage" className="dashboard__quick-action">
                  <i className="fa-solid fa-mountain"></i>
                  <div>
                    <span className="dashboard__quick-action-title">Manage Treks</span>
                    <span className="dashboard__quick-action-sub">Trek content</span>
                  </div>
                </Link>
                <Link to="/cms/tours/manage" className="dashboard__quick-action">
                  <i className="fa-solid fa-route"></i>
                  <div>
                    <span className="dashboard__quick-action-title">Manage Tours</span>
                    <span className="dashboard__quick-action-sub">Tour listings</span>
                  </div>
                </Link>
                <Link to="/cms/blogs/manage" className="dashboard__quick-action">
                  <i className="fa-solid fa-blog"></i>
                  <div>
                    <span className="dashboard__quick-action-title">Manage Blogs</span>
                    <span className="dashboard__quick-action-sub">Blog posts</span>
                  </div>
                </Link>
                <Link to="/cms/testimonials/manage" className="dashboard__quick-action">
                  <i className="fa-solid fa-quote-left"></i>
                  <div>
                    <span className="dashboard__quick-action-title">Manage Testimonials</span>
                    <span className="dashboard__quick-action-sub">Reviews</span>
                  </div>
                </Link>
                <Link to="/cms/bookings/manage" className="dashboard__quick-action">
                  <i className="fa-solid fa-calendar-check"></i>
                  <div>
                    <span className="dashboard__quick-action-title">View Bookings</span>
                    <span className="dashboard__quick-action-sub">Active bookings</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CMSLayout>
  );
};

export default Dashboard;
