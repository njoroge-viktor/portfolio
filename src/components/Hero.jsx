import { useEffect, useState } from 'react'
import Starfield from './Starfield.jsx'
import Reveal from './Reveal.jsx'
import { useCountUp } from '../hooks/useCountUp.js'

const ORBIT_CHIPS = [
  { label: 'RLHF', icon: 'fa-solid fa-code-compare', accent: 'royal', duration: 22, delay: 0, radius: 235 },
  { label: 'DPO · GRPO', icon: 'fa-solid fa-scale-balanced', accent: 'divine', duration: 27, delay: -7, radius: 265 },
  { label: 'Backend', icon: 'fa-solid fa-server', accent: 'credible', duration: 24, delay: -14, radius: 210 },
  { label: 'Red-Team', icon: 'fa-solid fa-shield-halved', accent: 'purpose', duration: 30, delay: -21, radius: 280 },
]

function TypedRoles({ roles = [] }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!roles.length) return
    const full = roles[index % roles.length]
    const delay = deleting ? 35 : text === full ? 1900 : 65

    const timer = setTimeout(() => {
      if (!deleting && text === full) {
        setDeleting(true)
      } else if (deleting && text === '') {
        setDeleting(false)
        setIndex((i) => (i + 1) % roles.length)
      } else {
        setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1))
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [text, deleting, index, roles])

  return (
    <span className="font-mono" style={{ color: 'var(--divine-light)' }}>
      {text}
      <span style={{ animation: 'orb-pulse 1s steps(2) infinite', color: 'var(--royal-light)' }}>|</span>
    </span>
  )
}

function StatTile({ stat, delay }) {
  const { value, ref } = useCountUp(stat.value)

  return (
    <Reveal delay={delay} className="col-6 col-lg-3">
      <div ref={ref} data-accent={stat.accent} className="glass-panel h-100 text-center" style={{ padding: '1.25rem 0.75rem' }}>
        <i
          className={stat.icon}
          style={{ fontSize: '1.15rem', color: 'var(--accent)', filter: 'drop-shadow(0 0 10px rgba(var(--accent-rgb),0.8))' }}
          aria-hidden="true"
        />
        <div
          className="font-display fw-bold mt-2"
          style={{ fontSize: 'clamp(1.6rem, 3.4vw, 2.3rem)', lineHeight: 1, color: 'var(--text-high)' }}
        >
          {value.toLocaleString()}
          <span className="text-gradient-accent">{stat.suffix}</span>
        </div>
        <p className="mb-0 mt-2 font-mono muted" style={{ fontSize: '0.66rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {stat.label}
        </p>
      </div>
    </Reveal>
  )
}

export default function Hero({ profile = {}, stats = [] }) {
  return (
    <section
      id="home"
      data-accent="royal"
      className="position-relative d-flex align-items-center scene"
      style={{ minHeight: '100vh', paddingTop: 120, paddingBottom: 80, overflow: 'hidden' }}
    >
      <Starfield />

      <div className="shell position-relative" style={{ zIndex: 2 }}>
        <div className="row align-items-center g-5">
          <div className="col-lg-7">
            <Reveal>
              <span className="chip mb-4" style={{ borderColor: 'rgba(16,185,129,0.5)' }}>
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: 'var(--purpose)',
                    boxShadow: '0 0 12px 2px var(--purpose)',
                    display: 'inline-block',
                  }}
                />
                {profile.availability}
              </span>
            </Reveal>

            <Reveal delay={90}>
              <p className="eyebrow mb-3">{profile.tagline}</p>
            </Reveal>

            <Reveal delay={150}>
              <h1
                className="font-display fw-bold mb-3"
                style={{ fontSize: 'clamp(2.7rem, 7.4vw, 5.6rem)', lineHeight: 1.02, letterSpacing: '-0.02em' }}
              >
                <span className="d-block" style={{ color: 'var(--text-high)' }}>
                  {profile.firstName}
                </span>
                <span className="d-block text-gold-leaf">{profile.lastName}</span>
              </h1>
            </Reveal>

            <Reveal delay={220}>
              <p className="mb-4" style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)', minHeight: '1.9em' }}>
                <TypedRoles roles={profile.roles} />
              </p>
            </Reveal>

            <Reveal delay={290}>
              <p className="lead-text mb-4" style={{ maxWidth: '38rem' }}>
                {profile.summary}
              </p>
            </Reveal>

            <Reveal delay={360}>
              <div className="d-flex flex-wrap gap-3 mb-5">
                <a href="#projects" className="btn-regal">
                  <i className="fa-solid fa-cubes" aria-hidden="true" />
                  View Selected Work
                </a>
                <a href="#contact" className="btn-ghost">
                  <i className="fa-solid fa-paper-plane" aria-hidden="true" />
                  Start a Conversation
                </a>
              </div>
            </Reveal>

            <Reveal delay={430}>
              <div className="d-flex align-items-center gap-4 flex-wrap muted" style={{ fontSize: '0.88rem' }}>
                <a href={profile.github} target="_blank" rel="noreferrer" className="d-flex align-items-center gap-2 nav-link">
                  <i className="fa-brands fa-github" style={{ fontSize: '1.15rem' }} aria-hidden="true" />
                  GitHub
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="d-flex align-items-center gap-2 nav-link">
                  <i className="fa-brands fa-linkedin" style={{ fontSize: '1.15rem' }} aria-hidden="true" />
                  LinkedIn
                </a>
                <span className="d-flex align-items-center gap-2">
                  <i className="fa-solid fa-location-dot" style={{ color: 'var(--divine)' }} aria-hidden="true" />
                  {profile.location}
                </span>
              </div>
            </Reveal>
          </div>

          <div className="col-lg-5 d-flex justify-content-center">
            <Reveal delay={240} className="d-flex justify-content-center w-100">
              <div className="orb-stage">
                <div className="orb-halo" />
                <div className="orb-ring orb-ring--1" />
                <div className="orb-ring orb-ring--2" />
                <div className="orb-ring orb-ring--3" />
                <div className="orb-core" />

                {ORBIT_CHIPS.map((chip) => (
                  <div
                    key={chip.label}
                    className="orbit-chip d-none d-sm-block"
                    data-accent={chip.accent}
                    style={{
                      '--orbit-duration': `${chip.duration}s`,
                      '--orbit-delay': `${chip.delay}s`,
                      '--orbit-radius': `min(${chip.radius}px, 40vw)`,
                    }}
                  >
                    <span
                      className="chip"
                      style={{
                        whiteSpace: 'nowrap',
                        background: 'rgba(10,12,28,0.9)',
                        borderColor: 'rgba(var(--accent-rgb),0.6)',
                        color: 'var(--text-high)',
                      }}
                    >
                      <i className={chip.icon} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                      {chip.label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <div className="row g-3 g-lg-4 mt-5 pt-4">
          {stats.map((stat, i) => (
            <StatTile key={stat.id} stat={stat} delay={i * 90} />
          ))}
        </div>
      </div>

      <a
        href="#about"
        className="position-absolute start-50 translate-middle-x d-none d-lg-flex flex-column align-items-center gap-2 muted"
        style={{ bottom: 26, fontSize: '0.68rem', letterSpacing: '0.24em', textTransform: 'uppercase', zIndex: 2 }}
        aria-label="Scroll to about section"
      >
        Scroll
        <span
          style={{
            width: 1,
            height: 44,
            background: 'linear-gradient(var(--divine), transparent)',
            display: 'block',
          }}
        />
      </a>
    </section>
  )
}
