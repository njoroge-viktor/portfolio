import { useEffect, useRef } from 'react'

/**
 * Adds `.is-visible` once an element scrolls into view. One observer per
 * element keeps the API trivial; elements unobserve themselves after firing so
 * nothing re-animates on the way back up.
 */
export function useReveal({ threshold = 0.15, once = true, rootMargin = '0px 0px -60px 0px' } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (!('IntersectionObserver' in window)) {
      node.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible')
          if (once) observer.unobserve(node)
        } else if (!once) {
          node.classList.remove('is-visible')
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, once, rootMargin])

  return ref
}
