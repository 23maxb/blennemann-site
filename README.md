# blennemann-site

Single-page site for Blennemann Family Investments, built with React + Vite.

- Live: https://23maxb.github.io/blennemann-site/
- Deploys automatically to GitHub Pages on every push to `main` (`.github/workflows/deploy.yml`).
- Background: a random public-domain painting from the [Art Institute of Chicago API](https://api.artic.edu/docs/), with title, artist, date, medium, style, origin, dimensions and credit line.

## Develop

```sh
npm install
npm run dev
```

## Structure

- `src/content.js` - site copy (name, tagline, location, contact)
- `src/lib/artic.js` - AIC API client (random page of paintings, IIIF image URLs)
- `src/hooks/useArtwork.js` - fetch + preload + shuffle state
- `src/components/` - `Background`, `Identity`, `ArtCredit`, `Logo`
- `public/favicon.svg` / `src/assets/logo.svg` - vector redraw of the letterhead logo
