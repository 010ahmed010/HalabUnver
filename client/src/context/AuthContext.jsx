import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const MOCK_USERS = {
  student: {
    id: 'STU-001',
    name: 'أحمد الجاسم',
    email: 'ahmed@aleppo.edu.sy',
    accountType: 'student',
    businessType: null,
    faculty: 'هندسة معلوماتية',
    year: 'السنة الرابعة',
    isVerified: true,
    isFreelancer: false,
    xp: 1600,
    level: 4,
    status: 'active',
  },
  studentFreelancer: {
    id: 'STU-002',
    name: 'سارة محمود',
    email: 'sara@aleppo.edu.sy',
    accountType: 'student',
    businessType: null,
    faculty: 'هندسة معلوماتية',
    year: 'السنة الثالثة',
    isVerified: true,
    isFreelancer: true,
    xp: 3200,
    level: 7,
    status: 'active',
  },
  vendor: {
    id: 'BIZ-001',
    name: 'متجر التقنية الذكية',
    email: 'store@techsmart.sy',
    accountType: 'business',
    businessType: 'vendor',
    isVerified: false,
    isFreelancer: false,
    xp: 0,
    level: 0,
    status: 'active',
  },
  advertiser: {
    id: 'BIZ-002',
    name: 'مقهى النخبة',
    email: 'ads@elite-cafe.sy',
    accountType: 'business',
    businessType: 'advertiser',
    isVerified: false,
    isFreelancer: false,
    xp: 0,
    level: 0,
    status: 'active',
  },
  externalFreelancer: {
    id: 'BIZ-003',
    name: 'كريم حداد',
    email: 'karim@freelance.sy',
    accountType: 'business',
    businessType: 'freelancer',
    isVerified: false,
    isFreelancer: true,
    xp: 0,
    level: 0,
    status: 'active',
  },
  admin: {
    id: 'ADM-001',
    name: 'مشرف المنصة',
    email: 'admin@halabunver.sy',
    accountType: 'admin',
    businessType: null,
    isVerified: true,
    isFreelancer: false,
    xp: 0,
    level: 0,
    status: 'active',
  },
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('hu_user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('hu_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('hu_user')
    }
  }, [user])

  const login = (credentials) => {
    const { email, password, mockRole } = credentials
    if (mockRole && MOCK_USERS[mockRole]) {
      setUser(MOCK_USERS[mockRole])
      return { success: true, user: MOCK_USERS[mockRole] }
    }
    const found = Object.values(MOCK_USERS).find(u => u.email === email)
    if (found && password === 'demo1234') {
      setUser(found)
      return { success: true, user: found }
    }
    return { success: false, error: 'بيانات الدخول غير صحيحة' }
  }

  const register = (data) => {
    const newUser = {
      id: `USR-${Date.now()}`,
      name: data.name,
      email: data.email,
      accountType: data.accountType,
      businessType: data.businessType || null,
      faculty: data.faculty || null,
      year: data.year || null,
      isVerified: false,
      isFreelancer: false,
      xp: 0,
      level: 1,
      status: data.accountType === 'business' ? 'pending' : 'active',
    }
    setUser(newUser)
    return { success: true, user: newUser }
  }

  const logout = () => setUser(null)

  const enableFreelancer = () => {
    if (user?.accountType === 'student') {
      const updated = { ...user, isFreelancer: true }
      setUser(updated)
    }
  }

  const isStudent = user?.accountType === 'student'
  const isBusiness = user?.accountType === 'business'
  const isAdmin = user?.accountType === 'admin'
  const isGuest = !user

  return (
    <AuthContext.Provider value={{ user, login, register, logout, enableFreelancer, isStudent, isBusiness, isAdmin, isGuest }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
