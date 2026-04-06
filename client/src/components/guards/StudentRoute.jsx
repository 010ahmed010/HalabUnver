import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function StudentRoute({ children }) {
  const { user, isStudent, isAdmin } = useAuth()
  const location = useLocation()

  if (!user) return <Navigate to="/auth/login" state={{ from: location }} replace />
  if (isAdmin) return <Navigate to="/admin" replace />
  if (!isStudent) return <Navigate to="/business" replace />

  return children
}
