import { useCallback, useEffect, useRef } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Pointer-driven 3D tilt. Writes CSS custom properties rather than inline
 * transforms so the actual animation stays declarative (and compositor-driven)
 * in theme.css. Disabled for touch devices and reduced-motion users.
 */
export function useTilt({ max = 9, scale = 1 } = {}) {
  const ref = useRef(null)
  const frame = useRef(null)

  const handleMove = useCallback(
    (event) => {
      const node = ref.current
      if (!node) return

      const rect = node.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width
      const py = (event.clientY - rect.top) / rect.height

      if (frame.current) cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        node.style.setProperty('--ry', `${(px - 0.5) * max * 2}deg`)
        node.style.setProperty('--rx', `${(0.5 - py) * max * 2}deg`)
        node.style.setProperty('--mx', `${px * 100}%`)
        node.style.setProperty('--my', `${py * 100}%`)
        if (scale !== 1) node.style.setProperty('--tilt-scale', scale)
      })
    },
    [max, scale],
  )

  const handleEnter = useCallback(() => {
    ref.current?.classList.add('is-active')
  }, [])

  const handleLeave = useCallback(() => {
    const node = ref.current
    if (!node) return
    if (frame.current) cancelAnimationFrame(frame.current)
    node.classList.remove('is-active')
    node.style.setProperty('--rx', '0deg')
    node.style.setProperty('--ry', '0deg')
  }, [])

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (prefersReducedMotion() || window.matchMedia('(hover: none)').matches) return

    node.addEventListener('pointermove', handleMove)
    node.addEventListener('pointerenter', handleEnter)
    node.addEventListener('pointerleave', handleLeave)

    return () => {
      node.removeEventListener('pointermove', handleMove)
      node.removeEventListener('pointerenter', handleEnter)
      node.removeEventListener('pointerleave', handleLeave)
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [handleMove, handleEnter, handleLeave])

  return ref
}
