import { useMemo, useRef, useState, useEffect } from 'react'
import { ChevronDown, MessageSquare } from 'lucide-react'
import { chapters } from './data/chapters'
import { useProgress } from './hooks/useProgress'
import { useCommunityQuestions, getDisplayTitle, getDisplayUrl, getDisplayDifficulty } from './hooks/useCommunityQuestions'
import { ErrorBoundary } from './components/ErrorBoundary'
import TopBar from './components/TopBar'
import FilterBar from './components/FilterBar'
import ChapterSidebar from './components/ChapterSidebar'
import ChapterDetail from './components/ChapterDetail'
import CommunityLeaderboard from './components/CommunityLeaderboard'
import ProfileSyncModal from './components/ProfileSyncModal'
import GlobalSearchModal from './components/GlobalSearchModal'

const views = ['overview', 'problems', 'tracker']

function WorkspaceFallback({ error, reset }) {
  return (
    <div className="workspace-fallback" role="alert">
      <p className="eyebrow">Workspace recovered</p>
      <h2>The practice view hit a render issue.</h2>
      <p>
        Your saved progress is still intact. Try recovering the view, or switch chapters if a stale browser state caused it.
      </p>
      {error?.message && <code>{error.message}</code>}
      <button type="button" onClick={reset}>Recover workspace</button>
    </div>
  )
}

export default function App() {
  const {
    isProblemChecked, toggleProblem,
    isTrackerChecked, toggleTracker,
    isBookmarked, toggleBookmark,
    getNote, setNote,
    stats, activityStats, solvedAtByProblem, trackerProgress, resetAll, syncNow,
    userId, username, setUsername,
    profile, claimProfile, connectWithCode, findProfilesByName, setLeaderboardOptIn, uploadAvatar,
    dismissOnboarding, startFreshLocal,
  } = useProgress()

  const communityHub = useCommunityQuestions(userId, profile)

  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [activeChapter, setActiveChapter] = useState(chapters[0]?.id || null)
  const chapterListRef = useRef(null)
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window === 'undefined') return true
    return window.innerWidth > 860
  })
  const [activeView, setActiveView] = useState('overview')
  const [showCommunity, setShowCommunity] = useState(false)
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const [profileModalMode, setProfileModalMode] = useState('welcome')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [highlightedProblemId, setHighlightedProblemId] = useState(null)
  
  // TopBar Dropdown State
  const [copyState, setCopyState] = useState('idle')
  const [shareHint, setShareHint] = useState('')
  const [isEditingName, setIsEditingName] = useState(false)
  const [tempName, setTempName] = useState(username || '')

  useEffect(() => {
    if (username) setTempName(username)
  }, [username])

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

  const handleCopyProfileLink = async () => {
    if (!profile?.claimed) {
      setShareHint('Claim a profile first to share.')
      setProfileModalMode('welcome')
      setProfileModalOpen(true)
      return
    }

    if (!profile?.leaderboardOptIn) {
      setShareHint('Turn on leaderboard visibility to share.')
      setProfileModalMode('manage')
      setProfileModalOpen(true)
      return
    }

    const url = new URL(window.location.origin + window.location.pathname)
    url.searchParams.set('friend', userId)
    const shareUrl = url.toString()

    setCopyState('syncing')
    setShareHint('')

    const syncResult = syncNow ? await syncNow() : { skipped: true }

    try {
      const copied = await copyText(shareUrl)
      if (!copied) throw new Error('Clipboard copy failed')
      setCopyState('copied')
      setShareHint(syncResult?.ok
        ? 'Latest stats synced.'
        : syncResult?.skipped
          ? 'Profile link copied.'
          : 'Stats sync will retry in background.')
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
      setTempName(username)
    }
    setIsEditingName(false)
  }

  // Global search keyboard shortcut
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(open => !open);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleSelectProblem = (problem) => {
    setIsSearchOpen(false);
    handleChapterSelect(problem.chapterId);
    setFilter('all');
    setSearch('');
    setActiveView('problems');
    setHighlightedProblemId(problem.id);
    
    // Clear highlight after a few seconds
    setTimeout(() => {
      setHighlightedProblemId(null);
    }, 4000);

    // Scroll to the problem
    setTimeout(() => {
      window.requestAnimationFrame(() => {
        const workspace = document.querySelector('.workspace');
        const problemEl = document.getElementById(`problem-${problem.id}`);
        if (!workspace || !problemEl) return;
        
        const workspaceRect = workspace.getBoundingClientRect();
        const targetRect = problemEl.getBoundingClientRect();
        const targetTop = workspace.scrollTop + targetRect.top - workspaceRect.top - 100;

        workspace.scrollTo({
          top: Math.max(0, targetTop),
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        });
      });
    }, 100); // small delay to let react render view
  };

  // Check if a friend's link was shared
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.has('friend')) {
      setShowCommunity(true)
    }
    const syncCode = params.get('sync')
    if (syncCode) {
      setProfileModalMode('connect')
      setProfileModalOpen(true)
      connectWithCode(syncCode).then(result => {
        if (result?.ok) {
          setProfileModalMode('manage')
          const url = new URL(window.location.href)
          url.searchParams.delete('sync')
          window.history.replaceState({}, '', url.toString())
        }
      })
    }
  }, [connectWithCode])

  useEffect(() => {
    if (!profile.claimed && !profile.dismissedOnboarding && !localStorage.getItem('dsa-profile-prompted')) {
      const timer = window.setTimeout(() => {
        localStorage.setItem('dsa-profile-prompted', 'true')
        setProfileModalMode('welcome')
        setProfileModalOpen(true)
      }, 700)
      return () => window.clearTimeout(timer)
    }
    return undefined
  }, [profile.claimed, profile.dismissedOnboarding])

  useEffect(() => {
    if (profile.claimed && profile.syncCode) {
      syncNow()
    }
  }, [profile.claimed, profile.syncCode, syncNow])

  const activeData = chapters.find(c => c.id === activeChapter) || chapters[0]
  const chapterStats = stats.chapterStats[activeData?.id] || { done: 0, total: (activeData?.problems || []).length }

  const resetWorkspaceScroll = () => {
    window.setTimeout(() => {
      const workspace = document.querySelector('.workspace')
      workspace?.scrollTo({ top: 0, behavior: 'auto' })
    }, 0)
  }

  const filteredProblems = useMemo(() => {
    if (!activeData || !activeData.problems) return []

    return activeData.problems.filter(problem => {
      if (filter === 'Easy' || filter === 'Medium' || filter === 'Hard') {
        if (problem.difficulty !== filter) return false
      } else if (filter === 'unsolved' && isProblemChecked(problem.id)) {
        return false
      } else if (filter === 'bookmarked' && !isBookmarked(problem.id)) {
        return false
      }

      if (search.trim() && !problem.name.toLowerCase().includes(search.trim().toLowerCase())) {
        return false
      }

      return true
    })
  }, [activeData, filter, search, isProblemChecked, isBookmarked])

  const handleChapterSelect = chapterId => {
    setActiveChapter(chapterId)
    setActiveView('overview')
    setShowCommunity(false)
    resetWorkspaceScroll()

    if (window.innerWidth <= 860) {
      setSidebarOpen(false)
    }
  }

  const handleViewChange = view => {
    if (views.includes(view)) setActiveView(view)
  }

  const scrollToProblems = () => {
    window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        const workspace = document.querySelector('.workspace')
        const problemsView = document.querySelector('.problems-view')

        if (!workspace || !problemsView) return

        const workspaceRect = workspace.getBoundingClientRect()
        const targetRect = problemsView.getBoundingClientRect()
        const targetTop = workspace.scrollTop + targetRect.top - workspaceRect.top - 18

        workspace.scrollTo({
          top: Math.max(0, targetTop),
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        })
      })
    }, 0)
  }

  const handleFilterChange = (nextFilter, options = {}) => {
    setFilter(nextFilter)
    setActiveView('problems')
    if (options.scrollToProblems) {
      scrollToProblems()
    }
  }

  const scrollChapterList = () => {
    chapterListRef.current?.scrollBy({ top: 260, behavior: 'smooth' })
  }


  return (
    <div className="app" style={{ '--chapter-color': activeData?.color || '#315cf6' }}>
      <TopBar
        stats={stats}
        profile={profile}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(open => !open)}
        onOpenProfile={() => {
          setProfileModalMode(profile.claimed ? 'manage' : 'welcome')
          setProfileModalOpen(true)
        }}
        onToggleCommunity={() => {
          setShowCommunity(!showCommunity)
          if (!showCommunity) communityHub.markVisited()
          resetWorkspaceScroll()
        }}
        isCommunityView={showCommunity}
        newQuestionCount={communityHub.newQuestionCount}
        onOpenSearch={() => setIsSearchOpen(true)}
        currentUsername={username}
        currentUserId={userId}
        onViewMyProfile={() => {
          const url = new URL(window.location.href)
          url.searchParams.set('friend', userId)
          window.history.pushState({}, '', url.toString())
          setShowCommunity(true)
          window.dispatchEvent(new Event('popstate'))
        }}
        onCopyProfileLink={handleCopyProfileLink}
        copyState={copyState}
        shareHint={shareHint}
        isEditingName={isEditingName}
        setIsEditingName={setIsEditingName}
        tempName={tempName}
        setTempName={setTempName}
        onSaveName={handleSaveName}
      />

      <GlobalSearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProblem={handleSelectProblem}
      />

      <div className="app-shell">
        {sidebarOpen && (
          <aside className="chapter-rail">
            <div className="rail-head">
              <div>
                <p className="eyebrow">Curriculum</p>
                <h2>22 chapters</h2>
              </div>
              <span className="rail-count">{stats.totalSolved}/{stats.totalProblems}</span>
            </div>

            <FilterBar
              filter={filter}
              onFilter={handleFilterChange}
              search={search}
              onSearch={setSearch}
              onReset={resetAll}
            />

            <div className="chapter-list" aria-label="Chapters" ref={chapterListRef}>
              {chapters.map(chapter => (
                <ChapterSidebar
                  key={chapter.id}
                  chapter={chapter}
                  isActive={activeData?.id === chapter.id}
                  chapterStats={stats.chapterStats[chapter.id] || { done: 0, total: (chapter.problems || []).length }}
                  onClick={() => handleChapterSelect(chapter.id)}
                />
              ))}
            </div>

            <button className="rail-scroll-cue" type="button" onClick={scrollChapterList} aria-label="Scroll chapters">
              <ChevronDown size={20} />
            </button>

            {/* Community questions in sidebar */}
            {communityHub.questions.length > 0 && (
              <div className="sidebar-community-section">
                <div className="sidebar-community-header">
                  <MessageSquare size={14} />
                  <span>Community Questions</span>
                  <span className="sidebar-community-count">{communityHub.checkedCount}/{communityHub.questions.length}</span>
                </div>
                <div className="sidebar-community-list">
                  {communityHub.questions.slice(0, 20).map(q => {
                    const title = getDisplayTitle(q)
                    const diff = getDisplayDifficulty(q)
                    const checked = communityHub.isChecked(q.id)
                    return (
                      <button
                        key={q.id}
                        className={`sidebar-cq-item ${checked ? 'is-checked' : ''}`}
                        onClick={() => communityHub.toggleCheck(q.id)}
                        title={title}
                      >
                        <span className={`sidebar-cq-check ${checked ? 'checked' : ''}`}>
                          {checked && '✓'}
                        </span>
                        <span className="sidebar-cq-title">{title}</span>
                        {diff && <span className={`sidebar-cq-diff ${diff.toLowerCase()}`}>{diff.charAt(0)}</span>}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </aside>
        )}

        {sidebarOpen && <button className="drawer-scrim" aria-label="Close chapters" onClick={() => setSidebarOpen(false)} />}

        <main className="workspace">
          {showCommunity ? (
            <CommunityLeaderboard
              currentUserId={userId}
              currentUsername={username}
              setUsername={setUsername}
              stats={stats}
              activityStats={activityStats}
              solvedAtByProblem={solvedAtByProblem}
              trackerProgress={trackerProgress}
              syncNow={syncNow}
              profile={profile}
              onOpenProfile={() => {
                setProfileModalMode(profile.claimed ? 'manage' : 'welcome')
                setProfileModalOpen(true)
              }}
              communityHub={communityHub}
            />
          ) : activeData ? (
            <ErrorBoundary
              resetKey={`${activeData.id}-${activeView}-${filter}-${search}`}
              fallback={({ error, reset }) => <WorkspaceFallback error={error} reset={reset} />}
            >
              <ChapterDetail
                key={activeData.id}
                chapter={activeData}
                chapterStats={chapterStats}
                activityStats={activityStats}
                filter={filter}
                search={search}
                activeView={activeView}
                onViewChange={handleViewChange}
                onFilter={handleFilterChange}
                filteredProblems={filteredProblems}
                highlightedProblemId={highlightedProblemId}
                isProblemChecked={isProblemChecked}
                toggleProblem={toggleProblem}
                isTrackerChecked={isTrackerChecked}
                toggleTracker={toggleTracker}
                isBookmarked={isBookmarked}
                toggleBookmark={toggleBookmark}
                getNote={getNote}
                setNote={setNote}
              />
            </ErrorBoundary>
          ) : null}
        </main>
      </div>

      <ProfileSyncModal
        open={profileModalOpen}
        initialMode={profileModalMode}
        profile={profile}
        stats={stats}
        onClose={() => {
          if (!profile.claimed) dismissOnboarding()
          setProfileModalOpen(false)
        }}
        onClaim={claimProfile}
        onConnect={connectWithCode}
        onFindProfiles={findProfilesByName}
        onRename={setUsername}
        onOptInChange={setLeaderboardOptIn}
        onUploadAvatar={uploadAvatar}
        onStartFresh={startFreshLocal}
      />
    </div>
  )
}
