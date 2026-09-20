import { useEffect } from 'react'
import { usePortfolio } from './hooks/usePortfolio.js'

import Preloader from './components/Preloader.jsx'
import CursorGlow from './components/CursorGlow.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Expertise from './components/Expertise.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Credentials from './components/Credentials.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const { data, source, loading } = usePortfolio()

  // Sections only exist once the data resolves, so a hash in the URL on first
  // load has nothing to scroll to yet. Re-apply it after the first render.
  useEffect(() => {
    if (!data) return
    const { hash } = window.location
    if (!hash || hash.length < 2) return

    const target = document.getElementById(hash.slice(1))
    if (!target) return

    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'auto', block: 'start' })
    })
  }, [data])

  return (
    <>
      <Preloader done={!loading} />

      {data && (
        <>
          <CursorGlow />
          <Navbar navigation={data.navigation} profile={data.profile} />

          <main>
            <Hero profile={data.profile} stats={data.stats} />
            <About profile={data.profile} languages={data.languages} />
            <Expertise spheres={data.spheres} toolCategories={data.toolCategories} />
            <Experience experience={data.experience} />
            <Projects projects={data.projects} />
            <Credentials education={data.education} certifications={data.certifications} />
            <Contact profile={data.profile} />
          </main>

          <Footer profile={data.profile} navigation={data.navigation} source={source} />
        </>
      )}
    </>
  )
}
