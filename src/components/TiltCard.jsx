import { useTilt } from '../hooks/useTilt.js'

/**
 * Glass panel that tilts toward the pointer with a tracking specular highlight.
 * Children marked `.layer-1/2/3` float above the surface in real 3D space.
 */
export default function TiltCard({
  children,
  className = '',
  accent,
  max = 9,
  aura = false,
  as: Tag = 'div',
  ...rest
}) {
  const ref = useTilt({ max })

  return (
    <Tag
      ref={ref}
      data-accent={accent}
      className={`tilt-card glass-panel ${aura ? 'aura-border' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
