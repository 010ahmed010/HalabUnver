import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/layout/Layout'
import StudentRoute from './components/guards/StudentRoute'
import BusinessRoute from './components/guards/BusinessRoute'
import AdminRoute from './components/guards/AdminRoute'

const HomePage = lazy(() => import('./pages/home/HomePage'))
const SearchResults = lazy(() => import('./pages/home/SearchResults'))
const ExamHub = lazy(() => import('./pages/home/ExamHub'))
const ContactUs = lazy(() => import('./pages/home/ContactUs'))
const About = lazy(() => import('./pages/home/About'))

const Academy = lazy(() => import('./pages/academy/Academy'))
const CourseDisplay = lazy(() => import('./pages/academy/CourseDisplay'))

const Library = lazy(() => import('./pages/library/Library'))
const DocumentReader = lazy(() => import('./pages/library/DocumentReader'))

const FreelanceHome = lazy(() => import('./pages/freelance/FreelanceHome'))
const ServiceCatalog = lazy(() => import('./pages/freelance/ServiceCatalog'))
const FreelanceProfile = lazy(() => import('./pages/freelance/FreelanceProfile'))
const Leaderboard = lazy(() => import('./pages/freelance/Leaderboard'))
const FreelanceOnboarding = lazy(() => import('./pages/freelance/FreelanceOnboarding'))

const Store = lazy(() => import('./pages/store/Store'))
const ProductDetail = lazy(() => import('./pages/store/ProductDetail'))

const DashboardLayout = lazy(() => import('./pages/dashboard/DashboardLayout'))
const AcademicProfile = lazy(() => import('./pages/dashboard/AcademicProfile'))
const EnrolledCourses = lazy(() => import('./pages/dashboard/EnrolledCourses'))
const WalletOverview = lazy(() => import('./pages/dashboard/WalletOverview'))
const OrderHistory = lazy(() => import('./pages/dashboard/OrderHistory'))
const SystemInbox = lazy(() => import('./pages/dashboard/SystemInbox'))

const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const BusinessDashboard = lazy(() => import('./pages/business/BusinessDashboard'))
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070C18]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
        <span className="text-[#4A5D78] font-mono text-sm">LOADING SYSTEM...</span>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Auth pages — no Layout wrapper */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />

            {/* Dashboard pages — NO Layout (no header/footer) */}
            <Route
              path="/business"
              element={
                <BusinessRoute>
                  <BusinessDashboard />
                </BusinessRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <StudentRoute>
                  <DashboardLayout />
                </StudentRoute>
              }
            >
              <Route index element={<AcademicProfile />} />
              <Route path="learning" element={<EnrolledCourses />} />
              <Route path="wallet" element={<WalletOverview />} />
              <Route path="orders" element={<OrderHistory />} />
              <Route path="inbox" element={<SystemInbox />} />
            </Route>

            {/* Main public site — WITH Layout (header + footer) */}
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="search" element={<SearchResults />} />
              <Route path="exam-hub" element={<ExamHub />} />
              <Route path="contact" element={<ContactUs />} />
              <Route path="about" element={<About />} />

              <Route path="academy" element={<Academy />} />
              <Route path="academy/course/:id" element={<CourseDisplay />} />

              <Route path="library" element={<Library />} />
              <Route path="library/viewer/:id" element={<DocumentReader />} />

              <Route path="freelance" element={<FreelanceHome />} />
              <Route path="freelance/catalog/:category" element={<ServiceCatalog />} />
              <Route path="freelance/profile/:id" element={<FreelanceProfile />} />
              <Route path="freelance/leaderboard" element={<Leaderboard />} />
              <Route path="freelance/onboarding" element={<FreelanceOnboarding />} />

              <Route path="store" element={<Store />} />
              <Route path="store/product/:id" element={<ProductDetail />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  )
}
