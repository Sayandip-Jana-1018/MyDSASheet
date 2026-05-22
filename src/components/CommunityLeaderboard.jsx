import { useState, useEffect, useMemo } from 'react'
import { Trophy, Users, BarChart3, BookOpen, Target, ArrowLeft, Flame, CalendarDays, TrendingUp, MessageSquare, ExternalLink, Clock } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { buildActivityStats } from '../lib/activity'
import { chapters } from '../data/chapters'
import CommunityQuestionsHub from './CommunityQuestionsHub'
import { timeAgo, getDisplayTitle, getDisplayUrl, getDisplayDifficulty } from '../hooks/useCommunityQuestions'
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
  const linePath = points.reduce((path, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`

    const previous = points[index - 1]
    const beforePrevious = points[index - 2] || previous
    const next = points[index + 1] || point
    const cp1x = previous.x + (point.x - beforePrevious.x) / 6
    const cp1y = previous.y + (point.y - beforePrevious.y) / 6
    const cp2x = point.x - (next.x - previous.x) / 6
    const cp2y = point.y - (next.y - previous.y) / 6

    return `${path} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${point.x} ${point.y}`
  }, '')
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

function FriendProfile({ friendId, onBack, localProfile, solvedAtByProblem: friendSolvedAt, fetchRecentActivity }) {
  const [profile, setProfile] = useState(localProfile || null)
  const [loading, setLoading] = useState(!localProfile)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (localProfile) {
      setProfile(localProfile)
      setLoading(false)
      setError(null)
    }

    const fetchProfile = async () => {
      try {
        if (!supabase) {
          if (!localProfile) setError('Community sharing is not configured for this build.')
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
        if (!localProfile) setError('Could not load this profile. The link may be invalid.')
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
    return undefined
  }, [friendId, localProfile])

  if (loading) return <div className="profile-loading">Loading profile...</div>
  if (error) return <div className="profile-error">{error}</div>
  if (!profile) return <div className="profile-error">Profile not found.</div>

  const { username, total_solved, chapter_progress, difficulty_breakdown, solved_problems, tracker_progress, last_active, avatar_url, solved_at, weekly_solved, monthly_solved, current_streak, best_streak } = profile
  const diff = difficulty_breakdown || { easy: 0, medium: 0, hard: 0 }
  const chProgress = chapter_progress || {}
  const trackerData = tracker_progress || {}
  const solvedList = solved_problems || []
  const remoteActivity = buildActivityStats(solved_at || {})
  const profileActivityStats = profile.__activityStats || remoteActivity
  const activityStats = {
    ...profileActivityStats,
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

      {/* Recent Activity — shows 5 most recent questions (any type) */}
      <RecentActivitySection
        friendId={friendId}
        solvedAtByProblem={profile?.solved_at || friendSolvedAt || {}}
        fetchRecentActivity={fetchRecentActivity}
      />
    </div>
  )
}
function RecentActivitySection({ friendId, solvedAtByProblem, fetchRecentActivity }) {
  const [recentItems, setRecentItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setLoading(true)
      const items = []

      // 1. Roadmap problems solved (from solved_at timestamps)
      if (solvedAtByProblem && typeof solvedAtByProblem === 'object') {
        const allProblems = new Map()
        chapters.forEach(ch => {
          (ch.problems || []).forEach(p => {
            allProblems.set(p.id, { ...p, chapterName: ch.name, chapterColor: ch.color })
          })
        })

        Object.entries(solvedAtByProblem).forEach(([problemId, solvedAt]) => {
          if (!solvedAt) return
          const prob = allProblems.get(problemId)
          if (prob) {
            items.push({
              type: 'roadmap',
              id: `roadmap-${problemId}`,
              title: prob.name,
              url: prob.url,
              difficulty: prob.difficulty,
              source: prob.chapterName,
              sourceColor: prob.chapterColor,
              timestamp: solvedAt,
            })
          }
        })
      }

      // 2. Community questions checked (from Supabase)
      if (fetchRecentActivity) {
        const communityItems = await fetchRecentActivity(friendId, 10)
        communityItems.forEach(item => {
          items.push({
            type: 'community',
            id: `community-${item.question_id}`,
            title: item.leetcode_title || item.custom_title || 'Untitled',
            url: item.leetcode_url || item.custom_url || '',
            difficulty: item.leetcode_difficulty || item.custom_difficulty || '',
            source: item.company_name || 'Community',
            sourceColor: null,
            timestamp: item.checked_at,
          })
        })
      }

      // Sort by timestamp descending, take top 5
      items.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      if (!cancelled) {
        setRecentItems(items.slice(0, 5))
        setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [friendId, solvedAtByProblem, fetchRecentActivity])

  if (loading) return null
  if (recentItems.length === 0) return null

  return (
    <div className="profile-section">
      <h3><Clock size={16} /> Recent Activity</h3>
      <div className="recent-activity-list">
        {recentItems.map(item => (
          <div key={item.id} className="recent-item">
            <div className="recent-item-left">
              {item.url ? (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="recent-title">
                  {item.title}
                  <ExternalLink size={10} />
                </a>
              ) : (
                <span className="recent-title no-link">{item.title}</span>
              )}
              <div className="recent-meta">
                {item.difficulty && (
                  <span className={`mini-diff ${item.difficulty === 'Easy' ? 'easy-mini' : item.difficulty === 'Medium' ? 'med-mini' : 'hard-mini'}`}>
                    {item.difficulty}
                  </span>
                )}
                <span className="recent-source">{item.source}</span>
                <span className="recent-type-badge">{item.type === 'community' ? '💬' : '📘'}</span>
              </div>
            </div>
            <span className="recent-time">{timeAgo(item.timestamp)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CommunityLeaderboard({
  currentUserId, currentUsername, setUsername, stats, activityStats,
  solvedAtByProblem, trackerProgress, syncNow, profile, onOpenProfile,
  communityHub,
}) {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewingFriend, setViewingFriend] = useState(null)
  const [leaderboardMode, setLeaderboardMode] = useState('total')
  const activeMode = leaderboardModes.find(mode => mode.key === leaderboardMode) || leaderboardModes[0]
  const myProfileDetails = useMemo(() => ({
    id: currentUserId,
    username: currentUsername,
    total_solved: stats?.totalSolved || 0,
    chapter_progress: stats?.chapterStats || {},
    difficulty_breakdown: stats?.difficultyBreakdown || { easy: 0, medium: 0, hard: 0 },
    solved_problems: stats?.solvedIds || [],
    tracker_progress: trackerProgress || {},
    avatar_url: profile?.avatarUrl || '',
    solved_at: solvedAtByProblem || {},
    weekly_solved: activityStats?.weeklySolved || 0,
    monthly_solved: activityStats?.monthlySolved || 0,
    current_streak: activityStats?.currentStreak || 0,
    best_streak: activityStats?.bestStreak || 0,
    last_active: new Date().toISOString(),
    __activityStats: activityStats,
  }), [activityStats, currentUserId, currentUsername, profile?.avatarUrl, solvedAtByProblem, stats, trackerProgress])

  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search)
      const friendId = params.get('friend')
      setViewingFriend(friendId || null)
    }

    handleUrlChange()
    window.addEventListener('popstate', handleUrlChange)
    return () => window.removeEventListener('popstate', handleUrlChange)
  }, [])

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
      setLeaderboard([])
    } finally {
      setLoading(false)
    }
  }

  const [communityTab, setCommunityTab] = useState('leaderboard') // 'leaderboard' | 'questions'

  // If viewing a friend's profile
  if (viewingFriend) {
    const isViewingMe = viewingFriend === currentUserId
    return (
      <div className="community-board">
        <FriendProfile
          friendId={viewingFriend}
          localProfile={isViewingMe ? myProfileDetails : null}
          solvedAtByProblem={isViewingMe ? solvedAtByProblem : null}
          fetchRecentActivity={communityHub?.fetchRecentActivity}
          onBack={() => {
            setViewingFriend(null)
            const url = new URL(window.location.href)
            url.searchParams.delete('friend')
            window.history.replaceState({}, '', url.toString())
          }}
        />
      </div>
    )
  }

  return (
    <div className="community-board">
      {/* ── Main community tab bar ── */}
      <div className="community-main-tabs">
        <button
          className={communityTab === 'leaderboard' ? 'is-active' : ''}
          onClick={() => setCommunityTab('leaderboard')}
        >
          <Trophy size={15} />
          Leaderboard
        </button>
        <button
          className={communityTab === 'questions' ? 'is-active' : ''}
          onClick={() => { setCommunityTab('questions'); communityHub?.markVisited?.() }}
        >
          <MessageSquare size={15} />
          Questions Hub
          {communityHub?.newQuestionCount > 0 && (
            <span className="tab-badge">{communityHub.newQuestionCount}</span>
          )}
        </button>
      </div>

      {/* ── Leaderboard Tab ── */}
      {communityTab === 'leaderboard' && (
        <>
          <header className="community-hero">
            <div className="hero-content">
              <div className="eyebrow">
                <Users size={16} /> Community
              </div>
              <div className="hero-title-row">
                <h2>Global Leaderboard</h2>
                <p>See how you stack up against other developers.</p>
              </div>
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
                      onClick={() => setViewingFriend(user.id)}
                      style={{ cursor: 'pointer' }}
                      title={`View ${isMe ? 'your' : `${user.username}'s`} profile`}
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
        </>
      )}

      {/* ── Questions Hub Tab ── */}
      {communityTab === 'questions' && communityHub && (
        <CommunityQuestionsHub
          questions={communityHub.questions}
          messages={communityHub.messages}
          companies={communityHub.companies}
          loading={communityHub.loading}
          chatLoading={communityHub.chatLoading}
          addingQuestion={communityHub.addingQuestion}
          sendingMessage={communityHub.sendingMessage}
          fetchingLeetcode={communityHub.fetchingLeetcode}
          isChecked={communityHub.isChecked}
          onAddQuestion={communityHub.addQuestion}
          onToggleCheck={communityHub.toggleCheck}
          onSendMessage={communityHub.sendMessage}
          onFetchLeetcode={communityHub.fetchLeetcodeProblem}
          isClaimed={profile?.claimed}
          onOpenProfile={onOpenProfile}
          userId={currentUserId}
        />
      )}
    </div>
  )
}
