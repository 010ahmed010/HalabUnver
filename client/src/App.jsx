import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Layout from './components/layout/Layout'

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

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[#BB86FC] border-t-transparent rounded-full animate-spin" />
        <span className="text-[#888] font-mono text-sm">LOADING SYSTEM...</span>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
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

            <Route path="dashboard" element={<DashboardLayout />}>
              <Route index element={<AcademicProfile />} />
              <Route path="learning" element={<EnrolledCourses />} />
              <Route path="wallet" element={<WalletOverview />} />
              <Route path="orders" element={<OrderHistory />} />
              <Route path="inbox" element={<SystemInbox />} />
            </Route>

            <Route path="admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
