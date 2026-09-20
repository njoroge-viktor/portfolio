import { useEffect, useState } from 'react'
import { useActiveSection } from '../hooks/useActiveSection.js'

export default function Navbar({ navigation = [], profile = {} }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const ids = navigation.map((item) => item.href.replace('#', ''))
  const active = useActiveSection(ids)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock the page behind the mobile drawer.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={`nav-shell position-fixed top-0 start-0 w-100 ${scrolled ? 'is-scrolled' : ''}`}
        style={{ zIndex: 1040 }}
      >
        <nav className="shell d-flex align-items-center justify-content-between" style={{ height: 76 }}>
          <a href="#home" className="d-flex align-items-center gap-3" aria-label="Victor Njoroge — home">
            <span
              className="d-inline-flex align-items-center justify-content-center font-display fw-bold"
              style={{
                width: 42,
                height: 42,
                borderRadius: 13,
                fontSize: '1.3rem',
                color: '#0a0714',
                background: 'linear-gradient(135deg, var(--divine-light), var(--divine) 45%, var(--royal))',
                boxShadow: '0 10px 26px -8px rgba(232,185,35,0.75)',
              }}
            >
              V
            </span>
            <span className="d-none d-sm-block">
              <span className="d-block fw-medium" style={{ color: 'var(--text-high)', lineHeight: 1.15 }}>
                {profile.name}
              </span>
              <span className="d-block font-mono muted" style={{ fontSize: '0.66rem', letterSpacing: '0.14em' }}>
                {profile.title}
              </span>
            </span>
          </a>

          <div className="d-none d-lg-flex align-items-center gap-4">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`nav-link ${active === item.href.replace('#', '') ? 'is-active' : ''}`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="d-flex align-items-center gap-2">
            <a
              href={`mailto:${profile.email}`}
              className="btn-regal d-none d-md-inline-flex"
              style={{ padding: '0.6rem 1.4rem', fontSize: '0.88rem' }}
            >
              <i className="fa-solid fa-paper-plane" aria-hidden="true" />
              Hire Victor
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="d-lg-none btn-ghost"
              style={{ padding: '0.55rem 0.9rem' }}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'}`} aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100 d-lg-none"
        style={{
          zIndex: 1039,
          background: 'rgba(5,6,15,0.96)',
          backdropFilter: 'blur(22px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.4s var(--ease-regal)',
        }}
      >
        <div className="d-flex flex-column justify-content-center h-100 shell" style={{ gap: '0.4rem' }}>
          {navigation.map((item, i) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setOpen(false)}
              className="d-flex align-items-center gap-3 py-3"
              style={{
                color: active === item.href.replace('#', '') ? 'var(--text-high)' : 'var(--text-low)',
                borderBottom: '1px solid var(--hairline)',
                fontSize: '1.15rem',
                transform: open ? 'translateX(0)' : 'translateX(-28px)',
                opacity: open ? 1 : 0,
                transition: `all 0.5s var(--ease-regal) ${i * 55}ms`,
              }}
            >
              <i className={item.icon} style={{ width: 22, color: 'var(--divine)' }} aria-hidden="true" />
              {item.label}
            </a>
          ))}

          <a
            href={`mailto:${profile.email}`}
            onClick={() => setOpen(false)}
            className="btn-regal mt-4 justify-content-center"
          >
            <i className="fa-solid fa-paper-plane" aria-hidden="true" />
            Hire Victor
          </a>
        </div>
      </div>
    </>
  )
}
