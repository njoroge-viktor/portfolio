import { useEffect, useRef, useState } from 'react'

const easeOut = (t) => 1 - Math.pow(1 - t, 3)

/** Counts from 0 to `target` the first time the element enters the viewport. */
export function useCountUp(target, duration = 1800) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const run = () => {
      if (started.current) return
      started.current = true

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setValue(target)
        return
      }

      // Anchor on the first frame's timestamp rather than performance.now() so
      // the two clocks can never disagree and freeze the count at zero.
      let start = null
      const tick = (now) => {
        if (start === null) start = now
        const progress = Math.min((now - start) / duration, 1)
        setValue(Math.round(easeOut(progress) * target))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    if (!('IntersectionObserver' in window)) {
      run()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run()
          observer.unobserve(node)
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [target, duration])

  return { value, ref }
}
