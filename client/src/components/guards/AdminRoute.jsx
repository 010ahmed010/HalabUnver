import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Spinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070C18]">
      <div className="w-8 h-8 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function AdminRoute({ children }) {
  const { user, loading, isAdmin } = useAuth()
  const location = useLocation()

  if (loading) return <Spinner />
  if (!user) return <Navigate to="/auth/login" state={{ from: location }} replace />
  if (!isAdmin) return <Navigate to="/" replace />

  return children
}
