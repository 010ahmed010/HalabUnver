import './App.css'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import Stats from './sections/Stats'
import Platforms from './sections/Platforms'
import Gamification from './sections/Gamification'
import Security from './sections/Security'
import Footer from './sections/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Platforms />
      <Gamification />
      <Security />
      <Footer />
    </>
  )
}
