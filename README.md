# blennemann-site

Single-page site for Blennemann Family Investments, built with React + Vite.

- Live: https://blennemann.com/ (GitHub Pages custom domain)
- Deploys automatically to GitHub Pages on every push to `main` (`.github/workflows/deploy.yml`).
- Solid blue background. The version with random Art Institute of Chicago paintings lives on the `art` branch (not deployed).

## Develop

```sh
npm install
npm run dev
```

## Structure

- `src/content.js` - site copy (name, tagline, location, contact)
- `src/components/` - `Identity`, `Logo`
- `public/favicon.svg` / `src/assets/logo.svg` - vector redraw of the letterhead logo
