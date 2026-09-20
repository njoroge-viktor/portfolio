import { useEffect, useRef } from 'react'

// Palette carries the same persuasion coding as the rest of the site:
// gold (divinity), violet (royalty), blue (credibility), emerald (purpose).
const PARTICLE_COLORS = [
  [232, 185, 35],
  [124, 58, 237],
  [37, 99, 235],
  [16, 185, 129],
  [255, 255, 255],
]

/**
 * Depth-sorted particle field on a canvas. Particles carry a z value, so
 * parallax and size both fall out of real perspective division rather than
 * being faked per-layer.
 */
export default function Starfield({ density = 0.00012, className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let width = 0
    let height = 0
    let particles = []
    let frameId = null
    const pointer = { x: 0, y: 0 }
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(Math.round(width * height * density), 190)
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: 0.25 + Math.random() * 0.75,
        r: 0.6 + Math.random() * 1.9,
        vx: (Math.random() - 0.5) * 0.14,
        vy: (Math.random() - 0.5) * 0.14,
        phase: Math.random() * Math.PI * 2,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      }))
    }

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = (e.clientX - rect.left - width / 2) / width
      pointer.y = (e.clientY - rect.top - height / 2) / height
    }

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        p.x += p.vx * p.z
        p.y += p.vy * p.z

        if (p.x < -20) p.x = width + 20
        if (p.x > width + 20) p.x = -20
        if (p.y < -20) p.y = height + 20
        if (p.y > height + 20) p.y = -20

        // Nearer particles (higher z) swing further with the pointer.
        const px = p.x - pointer.x * 46 * p.z
        const py = p.y - pointer.y * 46 * p.z
        const twinkle = 0.45 + 0.55 * Math.abs(Math.sin(time * 0.0006 + p.phase))
        const alpha = twinkle * p.z * 0.75
        const [r, g, b] = p.color

        ctx.beginPath()
        ctx.arc(px, py, p.r * p.z, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
        ctx.shadowBlur = 10 * p.z
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${alpha * 0.85})`
        ctx.fill()
      }

      ctx.shadowBlur = 0
      frameId = requestAnimationFrame(draw)
    }

    build()
    frameId = requestAnimationFrame(draw)

    const resizeObserver = new ResizeObserver(build)
    resizeObserver.observe(canvas)
    window.addEventListener('pointermove', onPointerMove)

    return () => {
      if (frameId) cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [density])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}
