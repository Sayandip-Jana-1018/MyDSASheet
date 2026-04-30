import { useState, useEffect } from 'react'
import { Trophy, Users, Share2, Copy, Check, BarChart3, BookOpen, Target, ArrowLeft } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { chapters } from '../data/chapters'
import './CommunityLeaderboard.css'

function FriendProfile({ friendId, onBack }) {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data, error: fetchErr } = await supabase
          .from('community_profiles')
          .select('*')
          .eq('id', friendId)
          .single()

        if (fetchErr) throw fetchErr
        setProfile(data)
      } catch (err) {
        console.error('Error fetching friend profile:', err)
        setError('Could not load this profile. The link may be invalid.')
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [friendId])

  if (loading) return <div className="profile-loading">Loading profile...</div>
  if (error) return <div className="profile-error">{error}</div>
  if (!profile) return <div className="profile-error">Profile not found.</div>

  const { username, total_solved, chapter_progress, difficulty_breakdown, solved_problems, tracker_progress, last_active } = profile
  const diff = difficulty_breakdown || { easy: 0, medium: 0, hard: 0 }
  const chProgress = chapter_progress || {}
  const trackerData = tracker_progress || {}
  const solvedList = solved_problems || []
  const totalProblems = chapters.reduce((s, c) => s + (c.problems || []).length, 0)
  const pct = totalProblems ? Math.round((total_solved / totalProblems) * 100) : 0

  // Count total Easy/Med/Hard available
  let totalEasy = 0, totalMed = 0, totalHard = 0
  chapters.forEach(ch => {
    (ch.problems || []).forEach(p => {
      if (p.difficulty === 'Easy') totalEasy++
      else if (p.difficulty === 'Medium') totalMed++
      else if (p.difficulty === 'Hard') totalHard++
    })
  })

  // Time ago
  const timeAgo = (dateStr) => {
    if (!dateStr) return 'Unknown'
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    const days = Math.floor(hrs / 24)
    return `${days}d ago`
  }

  // Count milestones
  const milestoneTypes = ['concept', 'easy', 'medium', 'hard', 'revision']
  const totalMilestones = chapters.length * milestoneTypes.length
  const completedMilestones = Object.values(trackerData).filter(Boolean).length

  return (
    <div className="friend-profile">
      <button className="back-btn" onClick={onBack}>
        <ArrowLeft size={16} /> Back to Leaderboard
      </button>

      {/* Hero card */}
      <div className="profile-hero">
        <div className="profile-avatar-lg">
          {username?.charAt(0).toUpperCase() || '?'}
        </div>
        <div className="profile-hero-info">
          <h2>{username || 'Anonymous'}</h2>
          <div className="profile-meta-row">
            <span className="profile-stat-pill">
              <Trophy size={14} /> {total_solved}/{totalProblems} solved
            </span>
            <span className="profile-stat-pill">
              <BarChart3 size={14} /> {pct}% complete
            </span>
            <span className="profile-stat-pill muted">
              Last active: {timeAgo(last_active)}
            </span>
          </div>
        </div>
      </div>

      {/* Difficulty breakdown */}
      <div className="profile-section">
        <h3><BarChart3 size={16} /> Difficulty Breakdown</h3>
        <div className="diff-bars">
          <div className="diff-bar-item">
            <div className="diff-label">
              <span className="diff-name easy-label">Easy</span>
              <span className="diff-count">{diff.easy}/{totalEasy}</span>
            </div>
            <div className="diff-track">
              <div className="diff-fill easy-fill" style={{ width: `${totalEasy ? (diff.easy / totalEasy * 100) : 0}%` }} />
            </div>
          </div>
          <div className="diff-bar-item">
            <div className="diff-label">
              <span className="diff-name med-label">Medium</span>
              <span className="diff-count">{diff.medium}/{totalMed}</span>
            </div>
            <div className="diff-track">
              <div className="diff-fill med-fill" style={{ width: `${totalMed ? (diff.medium / totalMed * 100) : 0}%` }} />
            </div>
          </div>
          <div className="diff-bar-item">
            <div className="diff-label">
              <span className="diff-name hard-label">Hard</span>
              <span className="diff-count">{diff.hard}/{totalHard}</span>
            </div>
            <div className="diff-track">
              <div className="diff-fill hard-fill" style={{ width: `${totalHard ? (diff.hard / totalHard * 100) : 0}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Chapter progress */}
      <div className="profile-section">
        <h3><BookOpen size={16} /> Chapter Progress</h3>
        <div className="chapter-progress-grid">
          {chapters.map(ch => {
            const cp = chProgress[ch.id] || { done: 0, total: (ch.problems || []).length }
            const chPct = cp.total ? Math.round(cp.done / cp.total * 100) : 0
            return (
              <div key={ch.id} className="ch-progress-row">
                <span className="ch-prog-num">{ch.num}</span>
                <span className="ch-prog-name">{ch.name}</span>
                <div className="ch-prog-bar">
                  <div className="ch-prog-fill" style={{ width: `${chPct}%`, background: ch.color }} />
                </div>
                <span className="ch-prog-count">{cp.done}/{cp.total}</span>
                <span className="ch-prog-pct">{chPct}%</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Milestones */}
      <div className="profile-section">
        <h3><Target size={16} /> Milestones</h3>
        <div className="milestones-summary">
          <span>{completedMilestones}/{totalMilestones} completed</span>
          <div className="milestone-bar">
            <div className="milestone-fill" style={{ width: `${totalMilestones ? (completedMilestones / totalMilestones * 100) : 0}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CommunityLeaderboard({ currentUserId, currentUsername, setUsername, stats }) {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [isEditingName, setIsEditingName] = useState(false)
  const [tempName, setTempName] = useState(currentUsername)
  const [viewingFriend, setViewingFriend] = useState(null)

  useEffect(() => {
    // Check URL for friend param
    const params = new URLSearchParams(window.location.search)
    const friendId = params.get('friend')
    if (friendId && friendId !== currentUserId) {
      setViewingFriend(friendId)
    }
  }, [currentUserId])

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('community_profiles')
        .select('id, username, total_solved, last_active, difficulty_breakdown')
        .order('total_solved', { ascending: false })
        .limit(50)

      if (error) throw error
      setLeaderboard(data || [])
    } catch (err) {
      console.error('Error fetching leaderboard:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCopyLink = () => {
    const url = new URL(window.location.origin + window.location.pathname)
    url.searchParams.set('friend', currentUserId)
    navigator.clipboard.writeText(url.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSaveName = () => {
    if (tempName.trim()) {
      setUsername(tempName.trim())
      localStorage.setItem('dsa-username', tempName.trim())
    } else {
      setTempName(currentUsername)
    }
    setIsEditingName(false)
  }

  // If viewing a friend's profile
  if (viewingFriend) {
    return (
      <div className="community-board">
        <FriendProfile friendId={viewingFriend} onBack={() => {
          setViewingFriend(null)
          // Clean URL
          const url = new URL(window.location.href)
          url.searchParams.delete('friend')
          window.history.replaceState({}, '', url.toString())
        }} />
      </div>
    )
  }

  return (
    <div className="community-board">
      <header className="community-hero">
        <div className="hero-content">
          <div className="eyebrow">
            <Users size={16} /> Community
          </div>
          <h2>Global Leaderboard</h2>
          <p>See how you stack up against other developers.</p>
        </div>

        <div className="user-card">
          <div className="user-info">
            <div className="user-avatar">
              {currentUsername.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              {isEditingName ? (
                <div className="name-edit">
                  <input
                    autoFocus
                    value={tempName}
                    onChange={e => setTempName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSaveName()}
                    onBlur={handleSaveName}
                  />
                </div>
              ) : (
                <div className="name-display" onClick={() => setIsEditingName(true)} title="Click to edit name">
                  <strong>{currentUsername}</strong>
                  <span className="edit-hint">Edit</span>
                </div>
              )}
              <span className="user-id-hint">ID: {currentUserId.substring(0, 8)}...</span>
            </div>
          </div>
          <div className="user-quick-stats">
            <span>{stats?.totalSolved || 0} solved</span>
            <span>{stats?.pct || 0}%</span>
            <span>{stats?.bookmarkCount || 0} saved</span>
          </div>
          <button className="share-btn" onClick={handleCopyLink}>
            {copied ? <Check size={16} /> : <Share2 size={16} />}
            <span>{copied ? 'Copied Link!' : 'Share My Progress'}</span>
          </button>
        </div>
      </header>

      <div className="leaderboard-table">
        <div className="table-header">
          <span className="col-rank">Rank</span>
          <span className="col-user">Developer</span>
          <span className="col-diff">Easy / Med / Hard</span>
          <span className="col-score">Solved</span>
        </div>

        <div className="table-body">
          {loading ? (
            <div className="loading-state">Loading ranks...</div>
          ) : (
            leaderboard.map((user, idx) => {
              const isMe = user.id === currentUserId
              const diff = user.difficulty_breakdown || {}
              return (
                <div
                  key={user.id}
                  className={`leaderboard-row ${isMe ? 'is-me' : ''}`}
                  onClick={() => !isMe && setViewingFriend(user.id)}
                  style={{ cursor: isMe ? 'default' : 'pointer' }}
                  title={isMe ? '' : `View ${user.username}'s profile`}
                >
                  <span className="col-rank">
                    {idx === 0 ? <Trophy size={16} className="gold" /> :
                     idx === 1 ? <Trophy size={16} className="silver" /> :
                     idx === 2 ? <Trophy size={16} className="bronze" /> :
                     idx + 1}
                  </span>
                  <span className="col-user">
                    {user.username} {isMe && <span className="me-badge">You</span>}
                  </span>
                  <span className="col-diff">
                    <span className="mini-diff easy-mini">{diff.easy || 0}</span>
                    <span className="mini-diff med-mini">{diff.medium || 0}</span>
                    <span className="mini-diff hard-mini">{diff.hard || 0}</span>
                  </span>
                  <span className="col-score">{user.total_solved}</span>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
