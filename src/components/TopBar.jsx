import { BookOpenCheck, Layers3, Menu, Moon, PanelLeftClose, PanelLeftOpen, Sparkles, Sun, Trophy } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import './TopBar.css'

export default function TopBar({ stats, sidebarOpen, onToggleSidebar }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="topbar">
      <div className="topbar-content">
        <button className="icon-btn sidebar-toggle" onClick={onToggleSidebar} aria-label="Toggle chapter rail">
          <span className="desktop-icon">{sidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}</span>
          <span className="mobile-icon"><Menu size={18} /></span>
        </button>

        <div className="brand-lockup">
          <div className="brand-mark">
            <BookOpenCheck size={18} />
          </div>
          <div>
            <p className="brand-kicker">Ready to Fly with DSA?</p>
            <h1>Sayandip's Cockpit ❤︎</h1>
          </div>
        </div>

        <div className="topbar-progress" aria-label={`${stats.pct}% complete`}>
          <div className="progress-medallion">
            <Sparkles size={15} />
            <strong>{stats.pct}%</strong>
          </div>
          <div className="progress-track-group">
            <div className="progress-copy">
              <span>Roadmap completion</span>
              <em>{stats.totalSolved}/{stats.totalProblems}</em>
            </div>
            <div className="global-meter">
              <span style={{ width: `${stats.pct}%` }} />
            </div>
          </div>
        </div>

        <div className="topbar-stats">
          <div>
            <Trophy size={15} />
            <strong>{stats.totalSolved}</strong>
            <span>Solved</span>
          </div>
          <div>
            <BookOpenCheck size={15} />
            <strong>{stats.totalProblems}</strong>
            <span>Total</span>
          </div>
          <div>
            <Layers3 size={15} />
            <strong>22</strong>
            <span>Chapters</span>
          </div>
        </div>

        <button className="icon-btn theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
        </button>
      </div>
    </header>
  )
}
