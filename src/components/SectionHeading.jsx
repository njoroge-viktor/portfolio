import Reveal from './Reveal.jsx'

export default function SectionHeading({ eyebrow, title, highlight, description, align = 'center' }) {
  const alignment = align === 'left' ? 'text-start' : 'text-center mx-auto'

  return (
    <div className={`${alignment} mb-12 lg:mb-16`} style={{ maxWidth: align === 'left' ? '46rem' : '52rem' }}>
      {eyebrow && (
        <Reveal>
          <p className="eyebrow mb-3">
            <span className="me-2">//</span>
            {eyebrow}
          </p>
        </Reveal>
      )}

      <Reveal delay={80}>
        <h2
          className="font-display fw-bold mb-0"
          style={{ fontSize: 'clamp(2rem, 4.6vw, 3.4rem)', lineHeight: 1.12, color: 'var(--text-high)' }}
        >
          {title}{' '}
          {highlight && <span className="text-gradient-accent">{highlight}</span>}
        </h2>
      </Reveal>

      <Reveal delay={140}>
        <div
          className="divider-regal my-4"
          style={{ maxWidth: '10rem', marginInline: align === 'left' ? '0' : 'auto' }}
        />
      </Reveal>

      {description && (
        <Reveal delay={200}>
          <p className="lead-text mb-0" style={{ marginInline: align === 'left' ? '0' : 'auto' }}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
