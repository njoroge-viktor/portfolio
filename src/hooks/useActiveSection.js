import { useEffect, useState } from 'react'

/** Tracks which section id is currently dominant in the viewport. */
export function useActiveSection(ids = []) {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    if (!ids.length || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [ids.join('|')]) // eslint-disable-line react-hooks/exhaustive-deps

  return active
}
