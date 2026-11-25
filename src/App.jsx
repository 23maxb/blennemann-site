import Identity from './components/Identity.jsx'
import Logo from './components/Logo.jsx'
import { site } from './content.js'

const YEAR = new Date().getFullYear()

export default function App() {
  return (
    <div className="page">
      <header className="topbar">
        <Logo size={34} />
      </header>
      <main className="main">
        <Identity />
      </main>
      <footer className="footer">
        <p className="footer__copy">© {YEAR} {site.name}</p>
      </footer>
    </div>
  )
}
