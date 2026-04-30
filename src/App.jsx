import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { chapters } from './data/chapters'
import { useProgress } from './hooks/useProgress'
import TopBar from './components/TopBar'
import FilterBar from './components/FilterBar'
import ChapterSidebar from './components/ChapterSidebar'
import ChapterDetail from './components/ChapterDetail'

const views = ['overview', 'problems', 'tracker']

export default function App() {
  const { isProblemChecked, toggleProblem, isTrackerChecked, toggleTracker, stats, resetAll } = useProgress()
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [activeChapter, setActiveChapter] = useState(chapters[0]?.id || null)
  const chapterListRef = useRef(null)
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window === 'undefined') return true
    return window.innerWidth > 860
  })
  const [activeView, setActiveView] = useState('overview')

  const activeData = chapters.find(c => c.id === activeChapter) || chapters[0]
  const chapterStats = stats.chapterStats[activeData?.id] || { done: 0, total: (activeData?.problems || []).length }

  const filteredProblems = useMemo(() => {
    if (!activeData || !activeData.problems) return []

    return activeData.problems.filter(problem => {
      if (filter === 'Easy' || filter === 'Medium' || filter === 'Hard') {
        if (problem.difficulty !== filter) return false
      } else if (filter === 'unsolved' && isProblemChecked(problem.id)) {
        return false
      }

      if (search.trim() && !problem.name.toLowerCase().includes(search.trim().toLowerCase())) {
        return false
      }

      return true
    })
  }, [activeData, filter, search, isProblemChecked])

  const handleChapterSelect = chapterId => {
    setActiveChapter(chapterId)
    setActiveView('overview')

    if (window.innerWidth <= 860) {
      setSidebarOpen(false)
    }
  }

  const handleViewChange = view => {
    if (views.includes(view)) setActiveView(view)
  }

  const scrollToProblems = () => {
    window.setTimeout(() => {
      const workspace = document.querySelector('.workspace')
      const problemsView = document.querySelector('.problems-view')
      if (workspace && problemsView) {
        const top = problemsView.getBoundingClientRect().top + workspace.scrollTop - workspace.getBoundingClientRect().top - 20
        workspace.scrollTo({ top, behavior: 'smooth' })
      }
    }, 0)
  }

  const handleFilterChange = nextFilter => {
    setFilter(nextFilter)
    setActiveView('problems')
    scrollToProblems()
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
      />

      <div className="app-shell">
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              className="chapter-rail"
              initial={{ x: -24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -24, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
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
            </motion.aside>
          )}
        </AnimatePresence>

        {sidebarOpen && <button className="drawer-scrim" aria-label="Close chapters" onClick={() => setSidebarOpen(false)} />}

        <main className="workspace">
          {activeData && (
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
            />
          )}
        </main>
      </div>
    </div>
  )
}
