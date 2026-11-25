import Logo from './Logo.jsx'
import { site } from '../content.js'

export default function Identity() {
  return (
    <section className="identity" aria-labelledby="site-title">
      <Logo size={88} className="identity__logo" />
      <p className="identity__eyebrow">{site.tagline}</p>
      <h1 id="site-title" className="identity__title">
        <span>Blennemann</span>
        <span className="identity__title-sub">Family Investments</span>
      </h1>
      <div className="identity__rule" aria-hidden="true" />
      <p className="identity__location">{site.location}</p>
      <a className="identity__contact" href={`mailto:${site.email}`}>
        <span>{site.email}</span>
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  )
}
