import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function BusinessRoute({ children }) {
  const { user, isBusiness, isAdmin } = useAuth()
  const location = useLocation()

  if (!user) return <Navigate to="/auth/login" state={{ from: location }} replace />
  if (isAdmin) return <Navigate to="/admin" replace />
  if (!isBusiness) return <Navigate to="/dashboard" replace />

  return children
}
