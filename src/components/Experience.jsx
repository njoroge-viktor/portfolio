import { useState } from 'react'
import Reveal from './Reveal.jsx'
import TiltCard from './TiltCard.jsx'
import SectionHeading from './SectionHeading.jsx'

function ExperienceCard({ job, index }) {
  const [expanded, setExpanded] = useState(index === 0)
  const isLeft = index % 2 === 0

  return (
    <Reveal delay={60} className="timeline-item position-relative">
      {/* Desktop: alternating rail layout. Mobile: single column. */}
      <div className={`row g-0 ${isLeft ? '' : 'flex-lg-row-reverse'}`}>
        <div className="col-lg-6 px-lg-4 pb-5">
          <TiltCard accent={job.accent} aura={job.current} className="card-pad" max={6}>
            <div className="layer-1">
              <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
                <span
                  className="d-inline-flex align-items-center justify-content-center flex-shrink-0"
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 14,
                    background: 'linear-gradient(140deg, rgba(var(--accent-rgb),0.3), rgba(var(--accent-rgb),0.05))',
                    border: '1px solid rgba(var(--accent-rgb),0.45)',
                  }}
                >
                  <i className={job.icon} style={{ color: 'var(--accent-light)' }} aria-hidden="true" />
                </span>

                {job.current && (
                  <span className="chip" style={{ borderColor: 'rgba(16,185,129,0.55)', color: 'var(--purpose-light)' }}>
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: 'var(--purpose)',
                        boxShadow: '0 0 10px 2px var(--purpose)',
                        display: 'inline-block',
                      }}
                    />
                    Current
                  </span>
                )}
              </div>

              <p className="font-mono mb-1" style={{ fontSize: '0.72rem', letterSpacing: '0.1em', color: 'var(--accent-light)' }}>
                {job.period}
              </p>

              <h3 className="fw-semibold mb-1" style={{ fontSize: '1.2rem', color: 'var(--text-high)', lineHeight: 1.3 }}>
                {job.role}
              </h3>

              <p className="muted mb-3" style={{ fontSize: '0.85rem' }}>
                <i className="fa-solid fa-location-dot me-2" aria-hidden="true" />
                {job.company}
                <span className="mx-2">·</span>
                {job.type}
              </p>

              <p className="mb-3" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-mid)' }}>
                {job.summary}
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateRows: expanded ? '1fr' : '0fr',
                  transition: 'grid-template-rows 0.55s var(--ease-regal)',
                }}
              >
                <div style={{ overflow: 'hidden' }}>
                  <ul className="list-unstyled mb-3">
                    {job.highlights.map((h) => (
                      <li key={h.title} className="d-flex gap-3 mb-3">
                        <i
                          className="fa-solid fa-angles-right flex-shrink-0 mt-1"
                          style={{ color: 'var(--accent)', fontSize: '0.7rem' }}
                          aria-hidden="true"
                        />
                        <span>
                          <strong className="d-block fw-medium mb-1" style={{ color: 'var(--text-high)', fontSize: '0.88rem' }}>
                            {h.title}
                          </strong>
                          <span className="muted" style={{ fontSize: '0.83rem', lineHeight: 1.65 }}>
                            {h.text}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="d-flex flex-wrap gap-2 mb-3">
                {job.stack.map((tech) => (
                  <span key={tech} className="chip" style={{ fontSize: '0.7rem', padding: '0.22rem 0.6rem' }}>
                    {tech}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="btn-ghost"
                style={{ padding: '0.45rem 1.1rem', fontSize: '0.8rem' }}
                aria-expanded={expanded}
              >
                {expanded ? 'Collapse' : `Show ${job.highlights.length} highlights`}
                <i
                  className="fa-solid fa-chevron-down"
                  style={{ fontSize: '0.65rem', transition: 'transform 0.3s var(--ease-regal)', transform: expanded ? 'rotate(180deg)' : 'none' }}
                  aria-hidden="true"
                />
              </button>
            </div>
          </TiltCard>
        </div>

        <div className="col-lg-6 d-none d-lg-block" />
      </div>

      <span className="timeline-node d-none d-lg-block" data-accent={job.accent} />
    </Reveal>
  )
}

export default function Experience({ experience = [] }) {
  return (
    <section id="experience" data-accent="credible" className="section scene">
      <div className="shell">
        <SectionHeading
          eyebrow="Trajectory"
          title="A record built on"
          highlight="verifiable delivery"
          description="From banking-grade backend systems to the evaluation pipelines that shape frontier models."
        />

        <div className="position-relative">
          <span className="timeline-rail d-none d-lg-block" style={{ left: '50%', marginLeft: -1 }} />
          {experience.map((job, i) => (
            <ExperienceCard key={job.id} job={job} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
