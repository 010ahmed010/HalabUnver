import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { api } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('hu_token')
    if (token) {
      api.get('/auth/me')
        .then(data => setUser(data.user))
        .catch(() => {
          localStorage.removeItem('hu_token')
          setUser(null)
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = useCallback(async ({ identifier, password }) => {
    try {
      const data = await api.post('/auth/login', { identifier, password })
      localStorage.setItem('hu_token', data.token)
      setUser(data.user)
      return { success: true, user: data.user }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }, [])

  const register = useCallback(async (payload) => {
    try {
      const data = await api.post('/auth/register', payload)
      localStorage.setItem('hu_token', data.token)
      setUser(data.user)
      return { success: true, user: data.user }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('hu_token')
    setUser(null)
  }, [])

  const refreshUser = useCallback(async () => {
    try {
      const data = await api.get('/auth/me')
      setUser(data.user)
      return data.user
    } catch {
      return null
    }
  }, [])

  const isStudent = user?.accountType === 'student'
  const isBusiness = user?.accountType === 'business'
  const isAdmin = user?.accountType === 'admin'
  const isGuest = !user

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      refreshUser,
      isStudent,
      isBusiness,
      isAdmin,
      isGuest,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
