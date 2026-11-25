import Background from './components/Background.jsx'
import Identity from './components/Identity.jsx'
import ArtCredit from './components/ArtCredit.jsx'
import Logo from './components/Logo.jsx'
import { useArtwork } from './hooks/useArtwork.js'
import { site } from './content.js'

const YEAR = new Date().getFullYear()

export default function App() {
  const { artwork, layers, status, shuffle } = useArtwork()

  return (
    <>
      <Background layers={layers} />
      <div className="page">
        <header className="topbar">
          <Logo size={34} />
          <span className="topbar__name">{site.shortName}</span>
        </header>
        <main className="main">
          <Identity />
        </main>
        <footer className="footer">
          <ArtCredit artwork={artwork} status={status} onShuffle={shuffle} />
          <p className="footer__copy">© {YEAR} {site.name}</p>
        </footer>
      </div>
    </>
  )
}
