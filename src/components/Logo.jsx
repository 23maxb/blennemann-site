import logoUrl from '../assets/logo.svg'

const RATIO = 38 / 51

// The mark sits on a white disc so it reads well over any artwork.
export default function Logo({ size = 56, className = '' }) {
  const h = Math.round(size * RATIO)
  const pad = Math.round(size * 0.22)
  return (
    <span className={`logo ${className}`} style={{ padding: `${pad}px ${Math.round(pad * 0.8)}px` }}>
      <img src={logoUrl} alt="" width={size} height={h} />
    </span>
  )
}
