import { useReveal } from '../hooks/useReveal.js'

/** Wraps children in a scroll-triggered 3D reveal. `delay` staggers grids. */
export default function Reveal({ children, delay = 0, className = '', as: Tag = 'div', ...rest }) {
  const ref = useReveal()

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
