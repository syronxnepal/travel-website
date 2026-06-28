import './DashboardStatCard.css'

function DashboardStatCard({ label, value, icon, color = 'primary', change }) {
  return (
    <div className={`dashboard-stat-card dashboard-stat-card--${color}`}>
      <div className="dashboard-stat-card__icon">
        <i className={`fa-solid ${icon}`}></i>
      </div>
      <div className="dashboard-stat-card__body">
        <span className="dashboard-stat-card__label">{label}</span>
        <span className="dashboard-stat-card__value">{value}</span>
        {change !== undefined && (
          <span className={`dashboard-stat-card__change ${change >= 0 ? 'up' : 'down'}`}>
            <i className={`fa-solid fa-arrow-${change >= 0 ? 'up' : 'down'}`}></i>
            {Math.abs(change)}% from last month
          </span>
        )}
      </div>
    </div>
  )
}

export default DashboardStatCard
