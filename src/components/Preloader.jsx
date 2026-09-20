import { useEffect, useState } from 'react'

/** Brief gold-on-obsidian curtain so the first paint lands composed. */
export default function Preloader({ done }) {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    if (!done) return
    const timer = setTimeout(() => setHidden(true), 620)
    return () => clearTimeout(timer)
  }, [done])

  if (hidden) return null

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center"
      style={{
        zIndex: 9999,
        background: 'var(--obsidian)',
        opacity: done ? 0 : 1,
        transition: 'opacity 0.6s var(--ease-regal)',
        pointerEvents: done ? 'none' : 'auto',
      }}
      aria-hidden={done}
    >
      <div className="scene">
        <div
          className="preserve-3d d-flex align-items-center justify-content-center"
          style={{ width: 110, height: 110, animation: 'ring-spin-2 3.2s linear infinite' }}
        >
          <div className="orb-ring orb-ring--1" style={{ position: 'absolute', inset: 0 }} />
          <div className="orb-ring orb-ring--2" style={{ position: 'absolute' }} />
          <span className="font-display text-gold-leaf" style={{ fontSize: '2.4rem', fontWeight: 700 }}>
            V
          </span>
        </div>
      </div>
      <p className="eyebrow mt-4 mb-0">Composing the portfolio</p>
    </div>
  )
}
