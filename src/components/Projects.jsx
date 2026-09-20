import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import Reveal from './Reveal.jsx'
import TiltCard from './TiltCard.jsx'
import SectionHeading from './SectionHeading.jsx'

function ProjectModal({ project, onClose }) {
  // Close on Escape and lock background scroll while open.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!project) return null

  // Portalled to <body>: the section carries `perspective`, which — like
  // `transform` — makes it the containing block for fixed-position children
  // and would otherwise anchor this overlay to the section instead of the
  // viewport.
  return createPortal(
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
      style={{ zIndex: 1080, background: 'rgba(3,4,10,0.86)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        data-accent={project.accent}
        className="glass-panel card-pad scene"
        style={{
          maxWidth: 720,
          width: '100%',
          maxHeight: '86vh',
          overflowY: 'auto',
          animation: 'modal-in 0.5s var(--ease-regal)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="d-flex align-items-start justify-content-between gap-3 mb-4">
          <div className="d-flex align-items-center gap-3">
            <span
              className="d-inline-flex align-items-center justify-content-center flex-shrink-0"
              style={{
                width: 52,
                height: 52,
                borderRadius: 16,
                background: 'linear-gradient(140deg, rgba(var(--accent-rgb),0.32), rgba(var(--accent-rgb),0.06))',
                border: '1px solid rgba(var(--accent-rgb),0.45)',
              }}
            >
              <i className={project.icon} style={{ color: 'var(--accent-light)', fontSize: '1.2rem' }} aria-hidden="true" />
            </span>
            <div>
              <span className="eyebrow d-block mb-1">{project.category}</span>
              <h3 className="font-display fw-bold mb-0" style={{ fontSize: '1.5rem', color: 'var(--text-high)', lineHeight: 1.2 }}>
                {project.title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="btn-ghost flex-shrink-0"
            style={{ padding: '0.45rem 0.75rem' }}
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>
        </div>

        <p className="lead-text mb-3">{project.summary}</p>
        <p className="muted mb-4" style={{ lineHeight: 1.75 }}>
          {project.detail}
        </p>

        <div className="row g-3 mb-4">
          {project.metrics.map((m) => (
            <div key={m.label} className="col-sm-4">
              <div
                className="text-center p-3 h-100"
                style={{ borderRadius: 14, background: 'rgba(var(--accent-rgb),0.09)', border: '1px solid rgba(var(--accent-rgb),0.24)' }}
              >
                <div className="font-display fw-bold" style={{ fontSize: '1.3rem', color: 'var(--accent-light)' }}>
                  {m.value}
                </div>
                <div className="font-mono muted mt-1" style={{ fontSize: '0.64rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {m.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="d-flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>

        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="btn-regal mt-4"
            style={{ padding: '0.7rem 1.5rem', fontSize: '0.9rem' }}
          >
            <i className="fa-brands fa-github" aria-hidden="true" />
            View source on GitHub
          </a>
        )}
      </div>
    </div>,
    document.body,
  )
}

export default function Projects({ projects = [] }) {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects],
  )

  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="projects" data-accent="exuberance" className="section scene">
      <div className="shell">
        <SectionHeading
          eyebrow="Selected Work"
          title="Datasets and artifacts that"
          highlight="train the frontier"
          description="Dataset and evaluation engagements alongside nine open-source tools — spanning alignment, evaluation, safety, and production engineering in Python, TypeScript, Go, Rust, Elixir, Java and SQL."
        />

        <Reveal className="d-flex flex-wrap justify-content-center gap-2 mb-5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className="chip"
              style={{
                cursor: 'pointer',
                borderColor: filter === cat ? 'rgba(var(--accent-rgb),0.85)' : 'var(--hairline)',
                background: filter === cat ? 'rgba(var(--accent-rgb),0.2)' : 'var(--glass)',
                color: filter === cat ? 'var(--text-high)' : 'var(--text-low)',
              }}
              aria-pressed={filter === cat}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        <div className="row g-4">
          {visible.map((project, i) => (
            <Reveal key={project.id} delay={(i % 3) * 110} className="col-md-6 col-lg-4">
              <TiltCard
                accent={project.accent}
                aura
                className="card-pad h-100 d-flex flex-column"
                max={12}
                onClick={() => setSelected(project)}
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelected(project)
                  }
                }}
              >
                <div className="layer-2 d-flex flex-column h-100">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span
                      className="d-inline-flex align-items-center justify-content-center"
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 16,
                        background: 'linear-gradient(140deg, rgba(var(--accent-rgb),0.3), rgba(var(--accent-rgb),0.05))',
                        border: '1px solid rgba(var(--accent-rgb),0.45)',
                        boxShadow: '0 12px 30px -14px rgba(var(--accent-rgb),0.95)',
                      }}
                    >
                      <i className={project.icon} style={{ color: 'var(--accent-light)', fontSize: '1.15rem' }} aria-hidden="true" />
                    </span>
                    <span className="eyebrow">{project.category}</span>
                  </div>

                  <h3 className="fw-semibold mb-2" style={{ fontSize: '1.08rem', color: 'var(--text-high)', lineHeight: 1.35 }}>
                    {project.title}
                  </h3>

                  <p className="muted mb-3" style={{ fontSize: '0.86rem', lineHeight: 1.65 }}>
                    {project.summary}
                  </p>

                  <div className="d-flex flex-wrap gap-2 mb-3 mt-auto">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="chip" style={{ fontSize: '0.68rem', padding: '0.2rem 0.55rem' }}>
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="chip" style={{ fontSize: '0.68rem', padding: '0.2rem 0.55rem' }}>
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <div
                    className="d-flex align-items-center justify-content-between pt-3"
                    style={{ borderTop: '1px solid var(--hairline)' }}
                  >
                    <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--accent-light)' }}>
                      {project.metrics[0].value} {project.metrics[0].label}
                    </span>
                    <i
                      className={`fa-${project.repo ? 'brands fa-github' : 'solid fa-arrow-right'}`}
                      style={{ color: 'var(--accent)', fontSize: '0.85rem' }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
