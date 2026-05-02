import { useState, useEffect } from 'react'
import { Trophy, Users, Share2, Check, BarChart3, BookOpen, Target, ArrowLeft, Flame, CalendarDays, TrendingUp } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { buildActivityStats } from '../lib/activity'
import { chapters } from '../data/chapters'
import './CommunityLeaderboard.css'

const leaderboardModes = [
  { key: 'total', label: 'Total', orderBy: 'total_solved', scoreLabel: 'Solved' },
  { key: 'week', label: 'This Week', orderBy: 'weekly_solved', scoreLabel: 'Week' },
  { key: 'month', label: 'This Month', orderBy: 'monthly_solved', scoreLabel: 'Month' },
  { key: 'streak', label: 'Streak', orderBy: 'current_streak', scoreLabel: 'Streak' },
]

const activityColors = ['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#ec4899', '#8b5cf6', '#06b6d4']

function getLeaderboardScore(user, mode) {
  if (mode === 'week') return user.weekly_solved || 0
  if (mode === 'month') return user.monthly_solved || 0
  if (mode === 'streak') return user.current_streak || 0
  return user.total_solved || 0
}

function buildAreaPaths(series) {
  const width = 700
  const height = 190
  const paddingX = 28
  const paddingY = 22
  const maxCount = Math.max(1, ...series.map(item => item.count || 0))
  const chartWidth = width - paddingX * 2
  const chartHeight = height - paddingY * 2
  const baseline = height - paddingY
  const points = series.map((item, index) => {
    const x = series.length <= 1 ? width / 2 : paddingX + (chartWidth * index) / (series.length - 1)
    const y = baseline - ((item.count || 0) / maxCount) * chartHeight
    return { ...item, x, y, color: activityColors[index % activityColors.length] }
  })
  const linePath = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')
  const areaPath = points.length
    ? `${linePath} L ${points[points.length - 1].x} ${baseline} L ${points[0].x} ${baseline} Z`
    : ''

  return { width, height, baseline, points, linePath, areaPath }
}

function ActivityMiniChart({ activityStats }) {
  const series = activityStats?.series?.week || []
  const chart = buildAreaPaths(series)

  return (
    <div className="mini-activity-chart area-activity-chart" aria-label="Weekly solved activity">
      <svg viewBox={`0 0 ${chart.width} ${chart.height}`} role="img" aria-hidden="true" preserveAspectRatio="none">
        <defs>
          <linearGradient id="activityLineGradient" x1="0" y1="0" x2="1" y2="0">
            {activityColors.map((color, index) => (
              <stop key={color} offset={`${(index / (activityColors.length - 1)) * 100}%`} stopColor={color} />
            ))}
          </linearGradient>
          <linearGradient id="activityAreaGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.34" />
            <stop offset="24%" stopColor="#3b82f6" stopOpacity="0.28" />
            <stop offset="48%" stopColor="#22c55e" stopOpacity="0.24" />
            <stop offset="72%" stopColor="#ec4899" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.32" />
          </linearGradient>
          <filter id="activityGlow" x="-10%" y="-40%" width="120%" height="180%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0.20 0 1 0 0 0.36 0 0 1 0 0.95 0 0 0 0.35 0" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path className="area-grid-line" d="M 28 50 H 672" />
        <path className="area-grid-line" d="M 28 96 H 672" />
        <path className="area-grid-line" d="M 28 142 H 672" />
        {chart.areaPath && <path className="area-fill" d={chart.areaPath} />}
        {chart.linePath && <path className="area-line" d={chart.linePath} filter="url(#activityGlow)" />}
        {chart.points.map(point => (
          <g key={point.key}>
            <circle className="area-point-halo" cx={point.x} cy={point.y} r="9" fill={point.color} />
            <circle className="area-point" cx={point.x} cy={point.y} r="4.5" fill={point.color} />
          </g>
        ))}
      </svg>
      <div className="area-activity-labels">
        {series.map(item => (
          <span key={item.key}>
            <strong>{item.count || 0}</strong>
            {item.label}
          </span>
        ))}
      </div>
    </div>
  )
}

function FriendProfile({ friendId, onBack }) {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!supabase) {
          setError('Community sharing is not configured for this build.')
          return
        }

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

  const { username, total_solved, chapter_progress, difficulty_breakdown, solved_problems, tracker_progress, last_active, avatar_url, solved_at, weekly_solved, monthly_solved, current_streak, best_streak } = profile
  const diff = difficulty_breakdown || { easy: 0, medium: 0, hard: 0 }
  const chProgress = chapter_progress || {}
  const trackerData = tracker_progress || {}
  const solvedList = solved_problems || []
  const remoteActivity = buildActivityStats(solved_at || {})
  const activityStats = {
    ...remoteActivity,
    weeklySolved: weekly_solved ?? remoteActivity.weeklySolved,
    monthlySolved: monthly_solved ?? remoteActivity.monthlySolved,
    currentStreak: current_streak ?? remoteActivity.currentStreak,
    bestStreak: best_streak ?? remoteActivity.bestStreak,
  }
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

  const difficultyGauges = [
    {
      key: 'easy',
      label: 'Easy',
      done: diff.easy || 0,
      total: totalEasy,
      percent: totalEasy ? Math.round(((diff.easy || 0) / totalEasy) * 100) : 0,
    },
    {
      key: 'medium',
      label: 'Medium',
      done: diff.medium || 0,
      total: totalMed,
      percent: totalMed ? Math.round(((diff.medium || 0) / totalMed) * 100) : 0,
    },
    {
      key: 'hard',
      label: 'Hard',
      done: diff.hard || 0,
      total: totalHard,
      percent: totalHard ? Math.round(((diff.hard || 0) / totalHard) * 100) : 0,
    },
  ]

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
          {avatar_url ? (
            <img src={avatar_url} alt={`${username || 'Developer'} avatar`} />
          ) : (
            <span>{username?.charAt(0).toUpperCase() || '?'}</span>
          )}
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
            <span className="profile-stat-pill">
              <Flame size={14} /> {activityStats.currentStreak} days streak
            </span>
            <span className="profile-stat-pill muted">
              Last active: {timeAgo(last_active)}
            </span>
          </div>
        </div>
      </div>

      <div className="profile-section">
        <h3><TrendingUp size={16} /> Practice Activity</h3>
        <div className="profile-activity-summary">
          <span><CalendarDays size={14} /> {activityStats.weeklySolved} this week</span>
          <span><BarChart3 size={14} /> {activityStats.monthlySolved} this month</span>
          <span><Flame size={14} /> {activityStats.bestStreak} days best</span>
        </div>
        <ActivityMiniChart activityStats={activityStats} />
      </div>

      {/* Difficulty breakdown */}
      <div className="profile-section">
        <h3><BarChart3 size={16} /> Difficulty Breakdown</h3>
        <div className="difficulty-gauge-grid">
          {difficultyGauges.map(item => (
            <article
              key={item.key}
              className={`difficulty-gauge ${item.key}`}
              style={{ '--gauge-value': `${item.percent}%` }}
            >
              <div className="gauge-ring">
                <span>{item.percent}%</span>
              </div>
              <div className="gauge-copy">
                <strong>{item.label}</strong>
                <span>{item.done}/{item.total}</span>
              </div>
            </article>
          ))}
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

export default function CommunityLeaderboard({ currentUserId, currentUsername, setUsername, stats, activityStats, syncNow, profile, onOpenProfile }) {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [copyState, setCopyState] = useState('idle')
  const [shareHint, setShareHint] = useState('')
  const [isEditingName, setIsEditingName] = useState(false)
  const [tempName, setTempName] = useState(currentUsername)
  const [viewingFriend, setViewingFriend] = useState(null)
  const [leaderboardMode, setLeaderboardMode] = useState('total')
  const activeMode = leaderboardModes.find(mode => mode.key === leaderboardMode) || leaderboardModes[0]

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
  }, [leaderboardMode, profile?.leaderboardOptIn, stats?.totalSolved, activityStats?.weeklySolved, activityStats?.monthlySolved, activityStats?.currentStreak])

  const fetchLeaderboard = async () => {
    try {
      setLoading(true)
      if (!supabase) {
        setLeaderboard([])
        return
      }

      const { data, error } = await supabase
        .from('community_profiles')
        .select('id, username, total_solved, weekly_solved, monthly_solved, current_streak, best_streak, last_active, difficulty_breakdown, avatar_url, leaderboard_opt_in')
        .eq('leaderboard_opt_in', true)
        .order(activeMode.orderBy, { ascending: false })
        .order('total_solved', { ascending: false })
        .limit(50)

      if (error) throw error
      setLeaderboard(data || [])
    } catch (err) {
      console.error('Error fetching leaderboard:', err)
      setShareHint('Run the updated Supabase schema to enable clean opt-in leaderboard rows.')
      setLeaderboard([])
    } finally {
      setLoading(false)
    }
  }

  const copyText = async (text) => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }

    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const copied = document.execCommand('copy')
    document.body.removeChild(textarea)
    return copied
  }

  const handleCopyLink = async () => {
    if (!profile?.claimed) {
      setShareHint('Claim a profile first, then you can copy a public profile link.')
      onOpenProfile?.()
      return
    }

    if (!profile?.leaderboardOptIn) {
      setShareHint('Turn on leaderboard visibility before copying a public profile link.')
      onOpenProfile?.()
      return
    }

    const url = new URL(window.location.origin + window.location.pathname)
    url.searchParams.set('friend', currentUserId)
    const shareUrl = url.toString()

    setCopyState('syncing')
    setShareHint('')

    const syncResult = syncNow ? await syncNow() : { skipped: true }

    try {
      const copied = await copyText(shareUrl)
      if (!copied) throw new Error('Clipboard copy failed')
      setCopyState('copied')
      setShareHint(syncResult?.ok
        ? 'Latest stats synced before copying the profile link.'
        : syncResult?.skipped
          ? 'Profile link copied. Community sync is not configured.'
          : 'Profile link copied. Stats sync will retry in the background.')
    } catch (err) {
      console.error('Failed to copy share link:', err)
      setCopyState('manual')
      setShareHint(`Copy manually: ${shareUrl}`)
    }

    setTimeout(() => {
      setCopyState('idle')
      setShareHint('')
    }, 3600)
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
          <h2>
            Global<br />
            Leaderboard
          </h2>
          <p>See how you stack up against other developers.</p>
        </div>

        <div className="user-card">
          <div className="user-info">
            <div className="user-avatar">
              {profile?.avatarUrl ? (
                <img src={profile.avatarUrl} alt={`${currentUsername || 'Profile'} avatar`} />
              ) : (
                <span>{(currentUsername || 'P').charAt(0).toUpperCase()}</span>
              )}
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
      </header>

      <div className="leaderboard-table">
        <div className="leaderboard-tabs" aria-label="Leaderboard sort">
          {leaderboardModes.map(mode => (
            <button
              key={mode.key}
              type="button"
              className={leaderboardMode === mode.key ? 'is-active' : ''}
              onClick={() => setLeaderboardMode(mode.key)}
            >
              {mode.label}
            </button>
          ))}
        </div>
        <div className="table-header">
          <span className="col-rank">Rank</span>
          <span className="col-user">Developer</span>
          <span className="col-diff">Easy / Med / Hard</span>
          <span className="col-momentum">Momentum</span>
          <span className="col-score">{activeMode.scoreLabel}</span>
        </div>

        <div className="table-body">
          {loading ? (
            <div className="loading-state">Loading ranks...</div>
          ) : (
            leaderboard.map((user, idx) => {
              const isMe = user.id === currentUserId
              const diff = user.difficulty_breakdown || {}
              const score = getLeaderboardScore(user, leaderboardMode)
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
                    <span className="row-avatar">
                      {user.avatar_url ? (
                        <img src={user.avatar_url} alt={`${user.username || 'Developer'} avatar`} />
                      ) : (
                        <span>{(user.username || 'D').charAt(0).toUpperCase()}</span>
                      )}
                    </span>
                    <span className="row-name">{user.username}</span>
                    {isMe && <span className="me-badge">You</span>}
                  </span>
                  <span className="col-diff">
                    <span className="mini-diff easy-mini">{diff.easy || 0}</span>
                    <span className="mini-diff med-mini">{diff.medium || 0}</span>
                    <span className="mini-diff hard-mini">{diff.hard || 0}</span>
                  </span>
                  <span className="col-momentum">
                    <span className="momentum-chip"><CalendarDays size={12} />{user.weekly_solved || 0}</span>
                    <span className="momentum-chip"><BarChart3 size={12} />{user.monthly_solved || 0}</span>
                    <span className="momentum-chip"><Flame size={12} />{user.current_streak || 0} days</span>
                  </span>
                  <span className="col-score">{leaderboardMode === 'streak' ? `${score} days` : score}</span>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
