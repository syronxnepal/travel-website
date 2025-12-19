import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'src/context/AuthContext';
import { useAppToast } from 'src/context/ToastContext';
import './Auth.scss';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useAppToast();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(formData.email, formData.password);
    
    if (success) {
      showToast('Login successful! Welcome back.', 'success');
      // Get the redirect path from sessionStorage (set by ProtectedRoute) or default to dashboard
      const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/cms/dashboard';
      sessionStorage.removeItem('redirectAfterLogin');
      navigate(redirectPath);
    } else {
      showToast('Invalid email or password. Please try again.', 'error');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-card__header">
          <div className="auth-card__logo">
            <i className="fa-solid fa-compass"></i>
          </div>
          <h1>Welcome Back</h1>
          <p>Sign in to your CMS Dashboard</p>
        </div>

        <form className="auth-card__form" onSubmit={handleSubmit}>
          <div className="auth-form__field">
            <label htmlFor="email" className="auth-form__label">
              <i className="fa-solid fa-envelope"></i>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="admin@example.com"
              className="auth-form__input"
              required
              disabled={isLoading}
            />
          </div>

          <div className="auth-form__field">
            <label htmlFor="password" className="auth-form__label">
              <i className="fa-solid fa-lock"></i>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter your password"
              className="auth-form__input"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="auth-form__button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="fa-solid fa-spinner fa-spin"></i>
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <i className="fa-solid fa-arrow-right"></i>
              </>
            )}
          </button>

          <div className="auth-form__demo">
            <p>Demo Credentials:</p>
            <p>Email: <strong>admin@example.com</strong></p>
            <p>Password: <strong>password</strong></p>
          </div>
        </form>
      </div>

      <div className="auth-background">
        <div className="auth-background__gradient"></div>
      </div>
    </div>
  );
};

export default Login;

