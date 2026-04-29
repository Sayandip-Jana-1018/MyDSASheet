import { useTheme } from '../context/ThemeContext'
import './TopBar.css'

export default function TopBar({ stats, sidebarOpen, onToggleSidebar }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="topbar">
      <div className="topbar-content">
        {/* Sidebar toggle — hamburger/X */}
        <button className="sidebar-toggle" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            {sidebarOpen ? (
              <>
                <line x1="4" y1="4" x2="14" y2="14" />
                <line x1="14" y1="4" x2="4" y2="14" />
              </>
            ) : (
              <>
                <line x1="3" y1="5" x2="15" y2="5" />
                <line x1="3" y1="9" x2="15" y2="9" />
                <line x1="3" y1="13" x2="15" y2="13" />
              </>
            )}
          </svg>
        </button>

        <div className="topbar-brand">
          <span className="topbar-emoji">🚀</span>
          <h1 className="topbar-title">DSA Interview Roadmap</h1>
        </div>

        <div className="topbar-stats">
          <div className="ts-item">
            <span className="ts-val ts-green">{stats.totalSolved}</span>
            <span className="ts-lbl">Solved</span>
          </div>
          <div className="ts-dot" />
          <div className="ts-item">
            <span className="ts-val">{stats.totalProblems}</span>
            <span className="ts-lbl">Total</span>
          </div>
          <div className="ts-dot" />
          <div className="ts-item">
            <span className="ts-val">22</span>
            <span className="ts-lbl">Chapters</span>
          </div>
          <div className="ts-dot" />
          <div className="ts-item">
            <span className="ts-val ts-gold">{stats.pct}%</span>
            <span className="ts-lbl">Complete</span>
          </div>
        </div>

        <div className="topbar-bar-wrap">
          <div className="topbar-bar">
            <div className="topbar-bar-fill" style={{ width: `${stats.pct}%` }} />
          </div>
        </div>

        <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  )
}
