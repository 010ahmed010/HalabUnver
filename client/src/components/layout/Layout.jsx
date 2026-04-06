import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  return (
    <div
      className="min-h-screen w-full flex flex-col bg-[#070C18] text-[#F1F5F9] antialiased"
      style={{ fontFamily: "'IBM Plex Sans Arabic', 'Cairo', sans-serif" }}
    >
      <Header />
      {/* Compensates for the secondary nav row (36px) added to the fixed header */}
      <div className="h-9 shrink-0 hidden lg:block" />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
