import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from 'src/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactElement;
  requiredRole?: 'admin' | 'editor' | 'viewer';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh' 
      }}>
        <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2rem', color: 'var(--primary-color)' }}></i>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Store the current path so we can redirect back after login
    sessionStorage.setItem('redirectAfterLogin', location.pathname);
    return <Navigate to="/auth" replace />;
  }

  if (requiredRole && user) {
    const roleHierarchy = { admin: 3, editor: 2, viewer: 1 };
    const userRoleLevel = roleHierarchy[user.role];
    const requiredRoleLevel = roleHierarchy[requiredRole];

    if (userRoleLevel < requiredRoleLevel) {
      return <Navigate to="/cms/dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;

