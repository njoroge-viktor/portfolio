import { useEffect, useRef } from 'react'

/** A soft light that follows the pointer, lagged so it feels like mass. */
export default function CursorGlow() {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(hover: none)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const current = { ...target }
    let frameId = null

    const onMove = (e) => {
      target.x = e.clientX
      target.y = e.clientY
    }

    const tick = () => {
      current.x += (target.x - current.x) * 0.09
      current.y += (target.y - current.y) * 0.09
      node.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`
      frameId = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    frameId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [])

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />
}
