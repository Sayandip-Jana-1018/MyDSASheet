import { chapters } from '../data/chapters'
import './NavBar.css'

export default function NavBar() {
  return (
    <nav className="navbar" id="navbar">
      <div className="navbar-inner">
        {chapters.map((ch) => (
          <a
            key={ch.id}
            href={`#${ch.id}`}
            className="nav-link"
            title={ch.name}
          >
            <span className="nav-num">{ch.num}.</span> {ch.name}
          </a>
        ))}
      </div>
    </nav>
  )
}
