import { useState, useRef, useEffect } from 'react'
import { BarChart3, BookOpenCheck, Layers3, Menu, Moon, PanelLeftClose, PanelLeftOpen, Search, Sparkles, Sun, Trophy, UserRound, Users, Share2, Check, X, MessageSquare } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import './TopBar.css'

export default function TopBar({
  stats, sidebarOpen, onToggleSidebar,
  globalView, onToggleLeaderboard, onToggleQuestions,
  profile, onOpenProfile, newQuestionCount, onOpenSearch,
  // New props for the stats dropdown
  currentUsername, currentUserId, onViewMyProfile, onCopyProfileLink,
  copyState, shareHint, isEditingName, setIsEditingName, tempName, setTempName, onSaveName,
}) {
  const { theme, toggleTheme } = useTheme()
  const [statsOpen, setStatsOpen] = useState(false)
  const statsRef = useRef(null)

  // Close on outside click
  useEffect(() => {
    if (!statsOpen) return
    const handleClick = (e) => {
      if (statsRef.current && !statsRef.current.contains(e.target)) {
        setStatsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [statsOpen])

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

        <div className="topbar-actions">
          <button 
            className="icon-btn search-btn" 
            onClick={onOpenSearch} 
            aria-label="Search problems (Cmd/Ctrl + K)"
            title="Search problems (Cmd/Ctrl + K)"
          >
            <Search size={17} />
          </button>
          <button
            className={`icon-btn profile-btn ${profile?.claimed ? 'is-claimed' : ''}`}
            onClick={onOpenProfile}
            aria-label="Profile and sync"
            title={profile?.claimed ? `Profile: ${profile.username}` : 'Claim or sync profile'}
          >
            {profile?.avatarUrl ? (
              <img src={profile.avatarUrl} alt={`${profile.username || 'Profile'} avatar`} />
            ) : (
              <UserRound size={17} />
            )}
          </button>

          {/* Stats dropdown button */}
          <div className="stats-dropdown-wrap" ref={statsRef}>
            <button
              className={`icon-btn stats-btn ${statsOpen ? 'is-active' : ''}`}
              onClick={() => setStatsOpen(!statsOpen)}
              aria-label="My stats"
              title="My stats & profile link"
            >
              <BarChart3 size={17} />
            </button>

            {statsOpen && (
              <div className="stats-dropdown">
                <div className="stats-dropdown-header">
                  <div className="stats-dropdown-avatar">
                    {profile?.avatarUrl ? (
                      <img src={profile.avatarUrl} alt={`${currentUsername || 'Profile'} avatar`} />
                    ) : (
                      <span>{(currentUsername || 'P').charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <div className="stats-dropdown-info">
                    {isEditingName ? (
                      <div className="name-edit">
                        <input
                          autoFocus
                          value={tempName}
                          onChange={e => setTempName(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && onSaveName()}
                          onBlur={onSaveName}
                        />
                      </div>
                    ) : (
                      <div className="name-display" onClick={() => setIsEditingName(true)} title="Click to edit name">
                        <strong>{currentUsername}</strong>
                      </div>
                    )}
                    <span className="stats-dropdown-id">ID: {currentUserId?.substring(0, 8)}...</span>
                  </div>
                  <button className="stats-dropdown-close" onClick={() => setStatsOpen(false)}>
                    <X size={14} />
                  </button>
                </div>
                <div className="stats-dropdown-quick">
                  <span>{stats?.totalSolved || 0} solved</span>
                  <span>{stats?.pct || 0}%</span>
                  <span>{stats?.bookmarkCount || 0} saved</span>
                </div>
                <button className="view-profile-btn" type="button" onClick={() => { onViewMyProfile?.(); setStatsOpen(false) }}>
                  <BarChart3 size={15} />
                  <span>View My Profile</span>
                </button>
                <button className="share-btn" onClick={() => { onCopyProfileLink?.() }}>
                  {copyState === 'copied' ? <Check size={16} /> : <Share2 size={16} />}
                  <span>
                    {!profile?.claimed
                      ? 'Claim Profile First'
                      : !profile?.leaderboardOptIn
                        ? 'Make Public First'
                        : copyState === 'syncing'
                      ? 'Syncing Stats...'
                      : copyState === 'copied'
                        ? 'Copied Link!'
                        : copyState === 'manual'
                          ? 'Copy Link Manually'
                          : 'Copy Profile Link'}
                  </span>
                </button>
                {shareHint && <p className="share-hint">{shareHint}</p>}
              </div>
            )}
          </div>

          <button 
            className={`icon-btn community-btn ${globalView === 'leaderboard' ? 'is-active' : ''}`} 
            onClick={onToggleLeaderboard} 
            aria-label="Global Leaderboard"
            title="Global Leaderboard"
          >
            <Trophy size={17} />
          </button>
          <button 
            className={`icon-btn community-btn ${globalView === 'questions' ? 'is-active' : ''}`} 
            onClick={onToggleQuestions} 
            aria-label="Interview Questions Hub"
            title="Interview Questions Hub"
          >
            <MessageSquare size={17} />
            {newQuestionCount > 0 && globalView !== 'questions' && (
              <span className="community-badge">{newQuestionCount > 9 ? '9+' : newQuestionCount}</span>
            )}
          </button>
          <button className="icon-btn theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
          </button>
        </div>
      </div>
    </header>
  )
}
