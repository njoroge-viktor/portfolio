import Reveal from './Reveal.jsx'
import TiltCard from './TiltCard.jsx'
import SectionHeading from './SectionHeading.jsx'

const PILLARS = [
  {
    accent: 'royal',
    icon: 'fa-solid fa-brain',
    title: 'Frontier Model Evaluation',
    text: 'RLHF, DPO, PPO and GRPO preference signal generation feeding reward models at frontier labs.',
  },
  {
    accent: 'credible',
    icon: 'fa-solid fa-building-columns',
    title: 'Banking-Grade Engineering',
    text: 'Backend services, versioned API contracts and schema validation consumed by millions of users.',
  },
  {
    accent: 'divine',
    icon: 'fa-solid fa-feather-pointed',
    title: 'Canonical Specification',
    text: 'RFCs, incident reports, runbooks and API specs authored as ground truth for model training.',
  },
]

export default function About({ profile = {}, languages = [] }) {
  return (
    <section id="about" data-accent="credible" className="section scene">
      <div className="shell">
        <SectionHeading
          eyebrow="The Practitioner"
          title="Three interlocking"
          highlight="spheres of mastery"
          description="Eight years spent where AI evaluation, production engineering and technical authorship meet — each discipline sharpening the other two."
        />

        <div className="row g-4 g-lg-5 align-items-start">
          <div className="col-lg-7">
            <Reveal>
              <TiltCard accent="credible" aura className="card-pad h-100" max={5}>
                <div className="layer-1">
                  <span className="eyebrow d-block mb-3">Professional Summary</span>
                  {profile.summaryLong?.map((para, i) => (
                    <p key={i} className="lead-text mb-3">
                      {para}
                    </p>
                  ))}

                  <div className="divider-regal my-4" />

                  <div className="row g-3">
                    {languages.map((lang) => (
                      <div key={lang.id} className="col-sm-6" data-accent={lang.accent}>
                        <div className="d-flex align-items-baseline justify-content-between mb-2">
                          <span className="fw-medium" style={{ color: 'var(--text-high)' }}>
                            <i className="fa-solid fa-language me-2" style={{ color: 'var(--accent)' }} aria-hidden="true" />
                            {lang.name}
                          </span>
                          <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--accent-light)' }}>
                            Native
                          </span>
                        </div>
                        <p className="muted mb-0" style={{ fontSize: '0.82rem' }}>
                          {lang.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          </div>

          <div className="col-lg-5">
            <div className="d-flex flex-column gap-4">
              {PILLARS.map((pillar, i) => (
                <Reveal key={pillar.title} delay={i * 110}>
                  <TiltCard accent={pillar.accent} className="card-pad" max={11}>
                    <div className="d-flex gap-3 align-items-start layer-2">
                      <span
                        className="d-inline-flex align-items-center justify-content-center flex-shrink-0"
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 15,
                          background: 'linear-gradient(140deg, rgba(var(--accent-rgb),0.28), rgba(var(--accent-rgb),0.06))',
                          border: '1px solid rgba(var(--accent-rgb),0.4)',
                          boxShadow: '0 10px 26px -12px rgba(var(--accent-rgb),0.9)',
                        }}
                      >
                        <i className={pillar.icon} style={{ color: 'var(--accent-light)', fontSize: '1.1rem' }} aria-hidden="true" />
                      </span>

                      <div>
                        <h3 className="fw-medium mb-1" style={{ fontSize: '1.05rem', color: 'var(--text-high)' }}>
                          {pillar.title}
                        </h3>
                        <p className="mb-0 muted" style={{ fontSize: '0.88rem', lineHeight: 1.6 }}>
                          {pillar.text}
                        </p>
                      </div>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
