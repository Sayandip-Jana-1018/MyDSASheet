import { useMemo, useRef, useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { chapters } from './data/chapters'
import { useProgress } from './hooks/useProgress'
import { ErrorBoundary } from './components/ErrorBoundary'
import TopBar from './components/TopBar'
import FilterBar from './components/FilterBar'
import ChapterSidebar from './components/ChapterSidebar'
import ChapterDetail from './components/ChapterDetail'
import CommunityLeaderboard from './components/CommunityLeaderboard'

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
    stats, resetAll, syncNow,
    userId, username, setUsername,
  } = useProgress()

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

  // Check if a friend's link was shared
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.has('friend')) {
      setShowCommunity(true)
    }
  }, [])

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
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(open => !open)}
        onToggleCommunity={() => {
          setShowCommunity(!showCommunity)
          resetWorkspaceScroll()
        }}
        isCommunityView={showCommunity}
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
              syncNow={syncNow}
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
                filter={filter}
                search={search}
                activeView={activeView}
                onViewChange={handleViewChange}
                onFilter={handleFilterChange}
                filteredProblems={filteredProblems}
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
    </div>
  )
}
