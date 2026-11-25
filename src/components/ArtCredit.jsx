import { useState } from 'react'

function Row({ label, value }) {
  if (!value) return null
  return (
    <div className="credit__row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}

export default function ArtCredit({ artwork, status, onShuffle }) {
  const [open, setOpen] = useState(false)
  const loading = status === 'loading'

  if (!artwork) {
    return (
      <aside className="credit credit--empty" aria-live="polite">
        <span>{status === 'error' ? 'Artwork unavailable right now.' : 'Selecting an artwork…'}</span>
        {status === 'error' && <button className="credit__btn" onClick={onShuffle}>Try again</button>}
      </aside>
    )
  }

  return (
    <aside className={`credit ${open ? 'credit--open' : ''}`} aria-live="polite">
      <p className="credit__label">On the wall</p>
      <h2 className="credit__title">{artwork.title}</h2>
      <p className="credit__artist">{artwork.artist_display}</p>
      <p className="credit__date">{artwork.date_display}</p>

      <div className="credit__details" id="credit-details" hidden={!open}>
        <dl>
          <Row label="Medium" value={artwork.medium_display} />
          <Row label="Style" value={artwork.style_title} />
          <Row label="Origin" value={artwork.place_of_origin} />
          <Row label="Dimensions" value={artwork.dimensions?.split(';')[0]} />
          <Row label="Department" value={artwork.department_title} />
          <Row label="Credit" value={artwork.credit_line} />
        </dl>
        <a className="credit__link" href={artwork.pageUrl} target="_blank" rel="noreferrer">
          View at the Art Institute of Chicago ↗
        </a>
      </div>

      <div className="credit__actions">
        <button className="credit__btn" aria-expanded={open} aria-controls="credit-details" onClick={() => setOpen((o) => !o)}>
          {open ? 'Less' : 'About this work'}
        </button>
        <button className="credit__btn credit__btn--icon" onClick={onShuffle} disabled={loading} aria-label="Show another artwork" title="Show another artwork">
          <svg viewBox="0 0 24 24" width="16" height="16" className={loading ? 'spin' : ''} aria-hidden="true">
            <path d="M20 12a8 8 0 1 1-2.34-5.66M20 4v4h-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <p className="credit__source">
        Public domain · Courtesy of the <a href="https://www.artic.edu" target="_blank" rel="noreferrer">Art Institute of Chicago</a>
      </p>
    </aside>
  )
}
