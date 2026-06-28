import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'

function ProtectedRoute({ children, requireAdmin = true }) {
  const { isAuthenticated, isAdmin, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div className="loading-spinner" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
