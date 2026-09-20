import Reveal from './Reveal.jsx'
import TiltCard from './TiltCard.jsx'
import SectionHeading from './SectionHeading.jsx'

export default function Credentials({ education = [], certifications = [] }) {
  return (
    <section id="credentials" data-accent="divine" className="section scene">
      <div className="shell">
        <SectionHeading
          eyebrow="Provenance"
          title="Formal grounding and"
          highlight="earned credentials"
          description="A doctorate in software engineering underneath a decade of applied practice."
        />

        <div className="row g-4 g-lg-5">
          {/* Education */}
          <div className="col-lg-5">
            <Reveal>
              <h3 className="font-display fw-bold mb-4" style={{ fontSize: '1.4rem', color: 'var(--text-high)' }}>
                <i className="fa-solid fa-graduation-cap me-3" style={{ color: 'var(--divine)' }} aria-hidden="true" />
                Education
              </h3>
            </Reveal>

            <div className="d-flex flex-column gap-3">
              {education.map((item, i) => (
                <Reveal key={item.id} delay={i * 110}>
                  <TiltCard accent={item.accent} className="card-pad" max={9}>
                    <div className="layer-1 d-flex gap-3">
                      <span
                        className="d-inline-flex align-items-center justify-content-center flex-shrink-0"
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 13,
                          background: 'linear-gradient(140deg, rgba(var(--accent-rgb),0.3), rgba(var(--accent-rgb),0.05))',
                          border: '1px solid rgba(var(--accent-rgb),0.45)',
                        }}
                      >
                        <i className={item.icon} style={{ color: 'var(--accent-light)' }} aria-hidden="true" />
                      </span>

                      <div>
                        <h4 className="fw-medium mb-1" style={{ fontSize: '1rem', color: 'var(--text-high)', lineHeight: 1.35 }}>
                          {item.degree}
                          {item.note && (
                            <span className="muted ms-2" style={{ fontSize: '0.75rem', fontWeight: 300 }}>
                              ({item.note})
                            </span>
                          )}
                        </h4>
                        <p className="mb-1" style={{ fontSize: '0.86rem', color: 'var(--text-mid)' }}>
                          {item.school}
                          <span className="muted"> · {item.location}</span>
                        </p>
                        <p className="font-mono mb-0" style={{ fontSize: '0.72rem', color: 'var(--accent-light)' }}>
                          {item.period}
                        </p>
                      </div>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Certifications — flip cards */}
          <div className="col-lg-7">
            <Reveal>
              <h3 className="font-display fw-bold mb-4" style={{ fontSize: '1.4rem', color: 'var(--text-high)' }}>
                <i className="fa-solid fa-certificate me-3" style={{ color: 'var(--divine)' }} aria-hidden="true" />
                Certifications
                <span className="muted ms-3" style={{ fontSize: '0.75rem', fontWeight: 300 }}>
                  hover to flip
                </span>
              </h3>
            </Reveal>

            <div className="row g-3">
              {certifications.map((cert, i) => (
                <Reveal key={cert.id} delay={(i % 2) * 110} className="col-sm-6">
                  <div className="flip-card h-100" style={{ minHeight: 190 }} tabIndex={0}>
                    <div className="flip-inner" style={{ minHeight: 190 }}>
                      {/* Front */}
                      <div data-accent={cert.accent} className="flip-face glass-panel card-pad">
                        <span
                          className="d-inline-flex align-items-center justify-content-center mb-3"
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: 13,
                            background: 'linear-gradient(140deg, rgba(var(--accent-rgb),0.3), rgba(var(--accent-rgb),0.05))',
                            border: '1px solid rgba(var(--accent-rgb),0.45)',
                          }}
                        >
                          <i className={cert.icon} style={{ color: 'var(--accent-light)' }} aria-hidden="true" />
                        </span>

                        <h4 className="fw-medium mb-2" style={{ fontSize: '0.96rem', color: 'var(--text-high)', lineHeight: 1.4 }}>
                          {cert.name}
                        </h4>
                        <p className="muted mb-0" style={{ fontSize: '0.8rem' }}>
                          {cert.issuer}
                          {cert.year && <span className="ms-2 font-mono">· {cert.year}</span>}
                        </p>
                      </div>

                      {/* Back */}
                      <div
                        data-accent={cert.accent}
                        className="flip-face flip-face--back glass-panel card-pad"
                        style={{ background: 'linear-gradient(150deg, rgba(var(--accent-rgb),0.18), rgba(10,12,28,0.92))' }}
                      >
                        <span className="eyebrow d-block mb-2">Detail</span>
                        <p className="mb-0" style={{ fontSize: '0.83rem', lineHeight: 1.65, color: 'var(--text-mid)' }}>
                          {cert.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
