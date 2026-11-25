// Art Institute of Chicago public API: https://api.artic.edu/docs/
// Overridable for local visual tests; defaults to the live API.
const SEARCH_URL = import.meta.env.VITE_ARTIC_SEARCH_URL || 'https://api.artic.edu/api/v1/artworks/search'
const IIIF_BASE = 'https://www.artic.edu/iiif/2'
// 1686px is the largest width the AIC IIIF server serves for public-domain works.
const MAX_WIDTH = 1686

const FIELDS = [
  'id', 'title', 'artist_display', 'artist_title', 'date_display',
  'medium_display', 'dimensions', 'place_of_origin', 'style_title',
  'department_title', 'credit_line', 'image_id', 'thumbnail', 'color',
]

const PAGE_SIZE = 12
// ~1,350 matching paintings; random pages beyond the end fall back to page 1.
const MAX_PAGE = 110

function buildParams(page) {
  return {
    query: {
      bool: {
        filter: [
          { term: { is_public_domain: true } },
          { exists: { field: 'image_id' } },
          { term: { 'artwork_type_title.keyword': 'Painting' } },
          { range: { 'thumbnail.width': { gte: 2000 } } },
        ],
      },
    },
    fields: FIELDS,
    limit: PAGE_SIZE,
    page,
  }
}

// GET with ?params= keeps this a "simple" CORS request (the API rejects preflights).
async function search(page, signal) {
  const url = `${SEARCH_URL}?params=${encodeURIComponent(JSON.stringify(buildParams(page)))}`
  const res = await fetch(url, { signal })
  if (!res.ok) throw new Error(`AIC API responded ${res.status}`)
  return res.json()
}

// Pick a candidate whose shape suits the viewport, so cropping stays gentle.
function pickBestFit(items, viewportRatio) {
  const wantsLandscape = viewportRatio >= 1
  const fits = (a) => {
    const { width, height } = a.thumbnail ?? {}
    if (!width || !height) return false
    const r = width / height
    return wantsLandscape ? r >= 1.15 : r <= 0.95
  }
  return items.find(fits) ?? items[0]
}

export function imageUrl(imageId, width = MAX_WIDTH) {
  return `${IIIF_BASE}/${imageId}/full/${Math.min(width, MAX_WIDTH)},/0/default.jpg`
}

export function artworkPageUrl(id) {
  return `https://www.artic.edu/artworks/${id}`
}

export async function fetchRandomArtwork({ signal, viewportRatio = 1.6 } = {}) {
  const page = 1 + Math.floor(Math.random() * MAX_PAGE)
  let { data, config } = await search(page, signal)
  if (!data?.length) ({ data, config } = await search(1, signal))
  if (!data?.length) throw new Error('No artworks returned')
  // Shuffle within the page so repeat visits to the same page differ too.
  data = [...data].sort(() => Math.random() - 0.5)
  const art = pickBestFit(data, viewportRatio)
  const iiif = config?.iiif_url ?? IIIF_BASE
  return {
    ...art,
    image: `${iiif}/${art.image_id}/full/${MAX_WIDTH},/0/default.jpg`,
    placeholder: art.thumbnail?.lqip,
    alt: art.thumbnail?.alt_text || art.title,
    pageUrl: artworkPageUrl(art.id),
  }
}
