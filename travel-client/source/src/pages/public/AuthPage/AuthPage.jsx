import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { authApi } from '../../../services/api'
import { useAuth } from '../../../context/AuthContext'
import { useToast } from '../../../context/ToastContext'
import './AuthPage.css'

function AuthPage() {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || null
  const isCMS = from?.startsWith('/cms')

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = mode === 'login'
        ? await authApi.login({ email: form.email, password: form.password })
        : await authApi.register(form)
      const userData = res.user || res.data?.user
      const token = res.token || res.data?.token
      login(userData, token)
      toast.success(mode === 'login' ? 'Welcome back!' : 'Account created!')
      const isAdmin = userData?.role === 'admin' || userData?.role === 'super_admin'
      if (from?.startsWith('/cms') || isAdmin) {
        navigate(isAdmin ? (from || '/cms') : '/')
      } else {
        navigate(from || '/')
      }
    } catch (err) {
      toast.error(err.message || 'Authentication failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-background">
      <div className="auth-container">
        <div className="auth-card">
          <Link to="/" className="auth-card__logo">
            <img src="/Images/Brand/logo.svg" alt="Adventure Nepal" />
          </Link>

          {!isCMS && (
            <div className="auth-card__tabs">
              <button className={`auth-card__tab${mode === 'login' ? ' active' : ''}`} onClick={() => setMode('login')}>Sign In</button>
              <button className={`auth-card__tab${mode === 'register' ? ' active' : ''}`} onClick={() => setMode('register')}>Register</button>
            </div>
          )}

          <div className="auth-page">
            <h2>{isCMS ? 'Admin Login' : mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
            <p>{isCMS ? 'Sign in to access the Content Management System' : mode === 'login' ? 'Sign in to your Adventure Nepal account' : 'Join us and start planning your adventure'}</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isCMS && mode === 'register' && (
              <div className="form-field">
                <label>Full Name</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="John Doe" />
              </div>
            )}
            <div className="form-field">
              <label>Email Address</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required placeholder="you@example.com" />
            </div>
            <div className="form-field">
              <label>Password</label>
              <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required placeholder="••••••••" />
            </div>
            <button type="submit" className="btn btn--primary auth-form__submit" disabled={loading}>
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
