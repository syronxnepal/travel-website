import React, { useState } from 'react';
import PageHero from '../../components/PageHero/PageHero';
import Footer from '../../components/Footer/Footer';
import './AuthPage.scss';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
    agreeToTerms: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Login attempt:', { email: formData.email, password: formData.password });
      // Handle login logic here
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      console.log('Register attempt:', formData);
      // Handle registration logic here
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      rememberMe: false,
      agreeToTerms: false
    });
  };

  return (
    <div className="auth-page">
      <PageHero
        title={isLogin ? "Welcome Back" : "Join Our Community"}
        subtitle={isLogin ? "SIGN IN TO YOUR ACCOUNT" : "CREATE YOUR ACCOUNT"}
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: isLogin ? 'Login' : 'Register', isActive: true }
        ]}
        backgroundImage="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=600&fit=crop"
      />

      <div className="auth-page__main">
        <div className="container">
          <div className="auth-page__form-container">
            <div className="auth-page__form-header">
              <h2>{isLogin ? 'Sign In' : 'Sign Up'}</h2>
              <p>
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
                <button type="button" onClick={toggleMode} className="auth-page__toggle-btn">
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>

            <form className="auth-page__form" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="auth-page__form-group">
                  <label htmlFor="username">Username *</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required={!isLogin}
                    placeholder="Enter your username"
                  />
                </div>
              )}

              <div className="auth-page__form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="auth-page__form-group">
                <label htmlFor="password">Password *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your password"
                  minLength={6}
                />
              </div>

              {!isLogin && (
                <div className="auth-page__form-group">
                  <label htmlFor="confirmPassword">Password Confirm *</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required={!isLogin}
                    placeholder="Confirm your password"
                    minLength={6}
                  />
                </div>
              )}

              <button type="submit" className="auth-page__submit-btn">
                {isLogin ? 'Sign In' : 'Register'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AuthPage;
