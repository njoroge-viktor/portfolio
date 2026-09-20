import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal.jsx'
import TiltCard from './TiltCard.jsx'
import SectionHeading from './SectionHeading.jsx'

function SkillRow({ skill, active }) {
  const fillRef = useRef(null)
  const [open, setOpen] = useState(false)

  // Re-run the fill whenever the sphere tab changes so the meter animates in.
  useEffect(() => {
    const node = fillRef.current
    if (!node) return
    node.style.width = '0%'
    const timer = setTimeout(() => {
      node.style.width = `${skill.level}%`
    }, 120)
    return () => clearTimeout(timer)
  }, [skill.level, active])

  return (
    <div
      className="py-3"
      style={{ borderBottom: '1px solid var(--hairline)', cursor: 'pointer' }}
      onClick={() => setOpen((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setOpen((v) => !v)
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={open}
    >
      <div className="d-flex align-items-center justify-content-between gap-3 mb-2">
        <span className="fw-medium" style={{ color: 'var(--text-high)', fontSize: '0.95rem' }}>
          {skill.name}
        </span>
        <span className="d-flex align-items-center gap-2 flex-shrink-0">
          <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-light)' }}>
            {skill.level}%
          </span>
          <i
            className={`fa-solid fa-chevron-down muted`}
            style={{ fontSize: '0.65rem', transition: 'transform 0.3s var(--ease-regal)', transform: open ? 'rotate(180deg)' : 'none' }}
            aria-hidden="true"
          />
        </span>
      </div>

      <div className="meter">
        <div ref={fillRef} className="meter-fill" />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.45s var(--ease-regal)',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <p className="muted mb-0 pt-3" style={{ fontSize: '0.84rem', lineHeight: 1.65 }}>
            {skill.detail}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Expertise({ spheres = [], toolCategories = [] }) {
  const [active, setActive] = useState(0)
  const sphere = spheres[active]

  // Duplicated once so the marquee can loop seamlessly at -50%.
  const marqueeItems = toolCategories.flatMap((cat) => cat.items)
  const marqueeLoop = [...marqueeItems, ...marqueeItems]

  if (!sphere) return null

  return (
    <section id="expertise" data-accent={sphere.accent} className="section scene" style={{ transition: 'all 0.6s var(--ease-regal)' }}>
      <div className="shell">
        <SectionHeading
          eyebrow="Capability Map"
          title="Depth across"
          highlight="every sphere"
          description="Select a sphere to expand its capability stack. Each skill opens to the detail behind the score."
        />

        {/* Sphere selector */}
        <div className="row g-3 g-lg-4 mb-5">
          {spheres.map((item, i) => (
            <Reveal key={item.id} delay={i * 100} className="col-md-4">
              <button
                type="button"
                onClick={() => setActive(i)}
                data-accent={item.accent}
                className={`tilt-card glass-panel w-100 text-start card-pad ${active === i ? 'aura-border is-active' : ''}`}
                style={{
                  cursor: 'pointer',
                  opacity: active === i ? 1 : 0.62,
                  transform: active === i ? 'translateY(-6px)' : 'none',
                  transition: 'all 0.5s var(--ease-regal)',
                }}
                aria-pressed={active === i}
              >
                <div className="d-flex align-items-center gap-3 mb-3">
                  <span
                    className="d-inline-flex align-items-center justify-content-center"
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 14,
                      background: 'linear-gradient(140deg, rgba(var(--accent-rgb),0.3), rgba(var(--accent-rgb),0.05))',
                      border: '1px solid rgba(var(--accent-rgb),0.45)',
                    }}
                  >
                    <i className={item.icon} style={{ color: 'var(--accent-light)' }} aria-hidden="true" />
                  </span>
                  <span className="eyebrow">{item.label}</span>
                </div>

                <h3 className="fw-medium mb-2" style={{ fontSize: '1.08rem', color: 'var(--text-high)' }}>
                  {item.name}
                </h3>
                <p className="mb-0 muted" style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
                  {item.blurb}
                </p>
              </button>
            </Reveal>
          ))}
        </div>

        {/* Active sphere detail */}
        <Reveal key={sphere.id}>
          <TiltCard accent={sphere.accent} className="card-pad" max={3}>
            <div className="row g-4 g-lg-5">
              <div className="col-lg-5">
                <span className="eyebrow d-block mb-3">{sphere.label}</span>
                <h3 className="font-display fw-bold mb-3" style={{ fontSize: 'clamp(1.6rem,3vw,2.3rem)', color: 'var(--text-high)', lineHeight: 1.15 }}>
                  {sphere.name}
                </h3>
                <p className="lead-text mb-4">{sphere.blurb}</p>

                <div
                  className="d-inline-flex align-items-center justify-content-center scene"
                  style={{ width: 128, height: 128 }}
                >
                  <div className="preserve-3d position-relative w-100 h-100" style={{ animation: 'orb-float 7s ease-in-out infinite' }}>
                    <div className="orb-ring orb-ring--1" />
                    <div className="orb-ring orb-ring--2" />
                    <div
                      className="position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center"
                      style={{
                        width: 62,
                        height: 62,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle at 32% 28%, #fff, rgba(var(--accent-rgb),1) 40%, rgba(var(--accent-rgb),0.25) 100%)',
                        boxShadow: '0 0 40px rgba(var(--accent-rgb),0.8), inset -8px -8px 20px rgba(0,0,0,0.6)',
                      }}
                    >
                      <i className={sphere.icon} style={{ color: '#fff', fontSize: '1.4rem' }} aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-7">
                {sphere.skills.map((skill) => (
                  <SkillRow key={skill.name} skill={skill} active={active} />
                ))}
              </div>
            </div>
          </TiltCard>
        </Reveal>

        {/* Tool marquee */}
        <div className="marquee-wrap mt-5 pt-3" style={{ overflow: 'hidden', maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)' }}>
          <div className="marquee">
            {marqueeLoop.map((item, i) => (
              <span key={`${item}-${i}`} className="font-mono flex-shrink-0" style={{ fontSize: '0.82rem', color: 'var(--text-low)', whiteSpace: 'nowrap' }}>
                <i className="fa-solid fa-diamond me-2" style={{ fontSize: '0.4rem', color: 'var(--divine)', verticalAlign: 'middle' }} aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Tool categories */}
        <div className="row g-4 mt-4">
          {toolCategories.map((cat, i) => (
            <Reveal key={cat.id} delay={(i % 4) * 90} className="col-sm-6 col-lg-3">
              <TiltCard accent={cat.accent} className="h-100" style={{ padding: '1.4rem' }} max={13}>
                <div className="layer-1">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <i className={cat.icon} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                    <h4 className="mb-0 fw-medium" style={{ fontSize: '0.92rem', color: 'var(--text-high)' }}>
                      {cat.name}
                    </h4>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <span key={item} className="chip" style={{ fontSize: '0.7rem', padding: '0.22rem 0.6rem' }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
