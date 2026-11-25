// Bundled artwork shown when the Art Institute of Chicago API or image server is unreachable.
import meta from '../assets/fallback/artwork.json'
import imageUrl from '../assets/fallback/artwork.jpg'
import { artworkPageUrl } from './artic.js'

export const fallbackArtwork = {
  ...meta,
  image: imageUrl,
  placeholder: meta.thumbnail?.lqip,
  alt: meta.thumbnail?.alt_text || meta.title,
  pageUrl: artworkPageUrl(meta.id),
  isFallback: true,
}
