import { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (token && !user) {
      authApi.getMe().then(setUser).catch(() => logout())
    }
  }, [token])

  function login(userData, userToken) {
    setToken(userToken)
    setUser(userData)
    localStorage.setItem('token', userToken)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  function logout() {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  function updateUser(updated) {
    setUser(updated)
    localStorage.setItem('user', JSON.stringify(updated))
  }

  const isAuthenticated = !!token
  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin'

  return (
    <AuthContext.Provider value={{ user, token, loading, isAuthenticated, isAdmin, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
