import { useState } from 'react'
import { chapters } from './data/chapters'
import { useProgress } from './hooks/useProgress'
import TopBar from './components/TopBar'
import FilterBar from './components/FilterBar'
import ChapterSidebar from './components/ChapterSidebar'
import ChapterDetail from './components/ChapterDetail'

export default function App() {
  const { isProblemChecked, toggleProblem, isTrackerChecked, toggleTracker, stats, resetAll } = useProgress()
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [activeChapter, setActiveChapter] = useState(chapters[0]?.id || null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const activeData = chapters.find(c => c.id === activeChapter)

  return (
    <div className="app">
      <TopBar
        stats={stats}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(s => !s)}
      />

      <div className="app-layout">
        {sidebarOpen && (
          <aside className="sidebar">
            <div className="sidebar-header">
              <h2 className="sidebar-title">Chapters</h2>
              <span className="sidebar-badge">{stats.totalSolved}/{stats.totalProblems}</span>
            </div>
            <FilterBar
              onFilter={setFilter}
              onSearch={setSearch}
              onReset={resetAll}
            />
            <div className="sidebar-chapters">
              {chapters.map(ch => (
                <ChapterSidebar
                  key={ch.id}
                  chapter={ch}
                  isActive={activeChapter === ch.id}
                  chapterStats={stats.chapterStats[ch.id] || { done: 0, total: ch.problems.length }}
                  onClick={() => setActiveChapter(ch.id)}
                />
              ))}
            </div>
          </aside>
        )}

        <main className="content-area">
          {activeData && (
            <ChapterDetail
              key={activeData.id}
              chapter={activeData}
              chapterStats={stats.chapterStats[activeData.id] || { done: 0, total: activeData.problems.length }}
              filter={filter}
              search={search}
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
