import { useEffect, useState } from 'react'

export default function Footer({ profile = {}, navigation = [], source = 'local' }) {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <footer className="position-relative" data-accent="royal" style={{ paddingTop: '4rem', paddingBottom: '2.5rem' }}>
      <div className="shell">
        <div className="divider-regal mb-5" />

        <div className="row g-4 align-items-start">
          <div className="col-lg-5">
            <a href="#home" className="d-inline-flex align-items-center gap-3 mb-3">
              <span
                className="d-inline-flex align-items-center justify-content-center font-display fw-bold"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  fontSize: '1.2rem',
                  color: '#0a0714',
                  background: 'linear-gradient(135deg, var(--divine-light), var(--divine) 45%, var(--royal))',
                }}
              >
                V
              </span>
              <span className="font-display fw-bold" style={{ fontSize: '1.15rem', color: 'var(--text-high)' }}>
                {profile.name}
              </span>
            </a>

            <p className="muted mb-3" style={{ fontSize: '0.88rem', maxWidth: '26rem', lineHeight: 1.7 }}>
              {profile.title} · {profile.subtitle}. {profile.openTo}
            </p>

            <div className="d-flex gap-3">
              {[
                { href: profile.github, icon: 'fa-brands fa-github', label: 'GitHub' },
                { href: profile.linkedin, icon: 'fa-brands fa-linkedin', label: 'LinkedIn' },
                { href: `mailto:${profile.email}`, icon: 'fa-solid fa-envelope', label: 'Email' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href?.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  className="d-inline-flex align-items-center justify-content-center"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    border: '1px solid var(--hairline)',
                    background: 'var(--glass)',
                    color: 'var(--text-mid)',
                    transition: 'all 0.35s var(--ease-regal)',
                  }}
                >
                  <i className={s.icon} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <p className="eyebrow mb-3">Navigate</p>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a href={item.href} className="nav-link">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-6 col-lg-4">
            <p className="eyebrow mb-3">Status</p>
            <p className="muted mb-2" style={{ fontSize: '0.85rem' }}>
              <i className="fa-solid fa-circle me-2" style={{ fontSize: '0.5rem', color: 'var(--purpose)' }} aria-hidden="true" />
              {profile.availability}
            </p>
            <p className="muted mb-0 font-mono" style={{ fontSize: '0.72rem' }}>
              Data source: {source === 'api' ? 'json-server (live)' : 'db.json (bundled)'}
            </p>
          </div>
        </div>

        <div
          className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-5 pt-4"
          style={{ borderTop: '1px solid var(--hairline)' }}
        >
          <p className="muted mb-0" style={{ fontSize: '0.78rem' }}>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="muted mb-0 font-mono" style={{ fontSize: '0.72rem' }}>
            React · Bootstrap · Tailwind · CSS 3D
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className="position-fixed d-flex align-items-center justify-content-center"
        style={{
          right: 24,
          bottom: 24,
          width: 48,
          height: 48,
          borderRadius: '50%',
          zIndex: 1030,
          border: '1px solid rgba(232,185,35,0.5)',
          background: 'rgba(10,12,28,0.85)',
          backdropFilter: 'blur(12px)',
          color: 'var(--divine)',
          opacity: showTop ? 1 : 0,
          transform: showTop ? 'translateY(0) scale(1)' : 'translateY(18px) scale(0.85)',
          pointerEvents: showTop ? 'auto' : 'none',
          transition: 'all 0.45s var(--ease-regal)',
          boxShadow: '0 14px 34px -14px rgba(232,185,35,0.8)',
        }}
      >
        <i className="fa-solid fa-arrow-up" aria-hidden="true" />
      </button>
    </footer>
  )
}
