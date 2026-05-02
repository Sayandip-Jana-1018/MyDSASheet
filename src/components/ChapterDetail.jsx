import { useState } from 'react'
import { BarChart3, BookOpen, CalendarDays, CheckCircle2, ExternalLink, Flame, Layers3, ListChecks, Route, Target, TrendingUp } from 'lucide-react'
import ProblemTable from './ProblemTable'
import TrackerBox from './TrackerBox'
import './ChapterDetail.css'

const tabs = [
  { key: 'overview', label: 'Overview', icon: BookOpen },
  { key: 'problems', label: 'Problems', icon: ListChecks },
  { key: 'tracker', label: 'Tracker', icon: Target },
]

const cleanText = value => String(value)
  .replaceAll('â€”', '-')
  .replaceAll('â€“', '-')
  .replaceAll('â€™', "'")
  .replaceAll('â€œ', '"')
  .replaceAll('â€\u009d', '"')
  .replaceAll('Â²', '^2')
  .replaceAll('Â', '')

function StatBlock({ label, value, tone }) {
  return (
    <div className={`hero-stat ${tone || ''}`}>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  )
}

function Section({ eyebrow, title, icon: Icon, children }) {
  return (
    <section className="content-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        {Icon && <span className="section-icon"><Icon size={18} /></span>}
      </div>
      {children}
    </section>
  )
}

const activityViews = [
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
  { key: 'year', label: 'Year' },
]

function ActivityPanel({ activityStats }) {
  const [range, setRange] = useState('week')
  const series = activityStats?.series?.[range] || []
  const maxCount = Math.max(1, ...series.map(item => item.count || 0))
  const hasActivity = series.some(item => item.count > 0)
  const metrics = [
    { label: 'This week', value: activityStats?.weeklySolved || 0, icon: CalendarDays },
    { label: 'This month', value: activityStats?.monthlySolved || 0, icon: BarChart3 },
    { label: 'Current streak', value: activityStats?.currentStreak || 0, unit: 'days', icon: Flame },
    { label: 'Best streak', value: activityStats?.bestStreak || 0, unit: 'days', icon: TrendingUp },
  ]

  return (
    <section className="insight-panel activity-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Practice activity</p>
          <h2>Solved momentum</h2>
        </div>
        <BarChart3 size={18} />
      </div>

      <div className="activity-tabs" aria-label="Activity range">
        {activityViews.map(view => (
          <button
            key={view.key}
            type="button"
            className={range === view.key ? 'is-active' : ''}
            onClick={() => setRange(view.key)}
          >
            {view.label}
          </button>
        ))}
      </div>

      <div className="activity-summary-grid">
        {metrics.map(metric => {
          const Icon = metric.icon
          return (
            <article key={metric.label} className="activity-metric">
              <Icon size={14} />
              <strong>
                {metric.value}
                {metric.unit && <small>{metric.unit}</small>}
              </strong>
              <span>{metric.label}</span>
            </article>
          )
        })}
      </div>

      <div className="activity-bars" aria-label={`${range} solved activity`}>
        {series.map((item, index) => (
          <div
            key={item.key}
            className="activity-row"
            style={{
              '--activity-width': `${Math.max(6, Math.round(((item.count || 0) / maxCount) * 100))}%`,
              '--activity-index': index,
            }}
          >
            <span className="activity-label">{item.label}</span>
            <span className="activity-track">
              <span className="activity-fill" />
            </span>
            <span className="activity-count">{item.count || 0}</span>
          </div>
        ))}
      </div>
      {!hasActivity && <p className="activity-empty">Solve a problem to start your activity graph.</p>}
    </section>
  )
}

export default function ChapterDetail({
  chapter,
  chapterStats,
  activityStats,
  filter,
  activeView,
  onViewChange,
  onFilter,
  filteredProblems,
  isProblemChecked,
  toggleProblem,
  isTrackerChecked,
  toggleTracker,
  isBookmarked,
  toggleBookmark,
  getNote,
  setNote,
}) {
  const { done, total } = chapterStats
  const pct = total ? Math.round((done / total) * 100) : 0
  const nextProblem = (chapter.problems || []).find(problem => !isProblemChecked(problem.id))
  const unsolvedCount = (chapter.problems || []).filter(problem => !isProblemChecked(problem.id)).length
  const isReviewingUnsolved = filter === 'unsolved'

  const reviewUnsolved = () => {
    onFilter(isReviewingUnsolved ? 'all' : 'unsolved', { scrollToProblems: true })
  }

  return (
    <div
      className="chapter-detail"
      style={{ '--chapter-color': chapter.color, '--chapter-progress': `${pct}%` }}
    >
      <header className="chapter-hero">
        <div className="hero-copy">
          <p className="eyebrow">Chapter {chapter.num}</p>
          <h1>{chapter.name}</h1>
          <p className="hero-summary">
            Master the core patterns, complete the curated set, and keep revision milestones visible while you practice.
          </p>
          <div className="hero-actions">
            {nextProblem ? (
              <a className="primary-action" href={nextProblem.url} target="_blank" rel="noopener noreferrer">
                Continue next problem
                <ExternalLink size={16} />
              </a>
            ) : (
              <button className="primary-action is-complete" disabled>
                Chapter complete
                <CheckCircle2 size={16} />
              </button>
            )}
            <button
              className={`secondary-action ${isReviewingUnsolved ? 'is-active' : ''}`}
              onClick={reviewUnsolved}
            >
              <ListChecks size={16} />
              {isReviewingUnsolved ? 'Show all problems' : `Review ${unsolvedCount} unsolved`}
            </button>
          </div>
        </div>

        <div className="hero-panel" aria-label={`${pct}% solved`}>
          <div className="progress-orbit">
            <span>{pct}%</span>
          </div>
          <div className="hero-stats">
            <StatBlock label="Easy" value={chapter.totalEasy} tone="easy" />
            <StatBlock label="Medium" value={chapter.totalMed} tone="medium" />
            <StatBlock label="Hard" value={chapter.totalHard} tone="hard" />
            <StatBlock label="Solved" value={`${done}/${total}`} />
          </div>
        </div>
      </header>

      <nav className="view-tabs" aria-label="Chapter views">
        {tabs.map(tab => {
          const Icon = tab.icon
          return (
            <button key={tab.key} className={activeView === tab.key ? 'is-active' : ''} onClick={() => onViewChange(tab.key)}>
              <Icon size={16} />
              {tab.label}
            </button>
          )
        })}
      </nav>

      <div className="detail-layout">
        <div className="main-stack">
          <div className={`view-section overview-view ${activeView === 'overview' ? 'is-active' : ''}`}>
            <Section eyebrow="Foundation" title="Core concepts" icon={BookOpen}>
              <ul className="concept-grid">
                {chapter.concepts.map((concept, index) => (
                  <li key={index}>{cleanText(concept)}</li>
                ))}
              </ul>
            </Section>

            <Section eyebrow="Recognition" title="Important patterns" icon={Route}>
              <div className="pattern-grid">
                {chapter.patterns.map((pattern, index) => (
                  <article key={index} className="pattern-item">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h3>{cleanText(pattern.title)}</h3>
                      <p>{cleanText(pattern.desc)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </Section>

            <Section eyebrow="Depth" title="Must-know variations" icon={Layers3}>
              <div className="variation-grid">
                {chapter.variations.map((variation, index) => (
                  <article key={index} className="variation-item">
                    <h3>{cleanText(variation.title)}</h3>
                    <div>
                      {variation.items.map((item, itemIndex) => (
                        <span key={itemIndex}>{cleanText(item)}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </Section>

            <div className="mobile-activity">
              <ActivityPanel activityStats={activityStats} />
            </div>
          </div>

          <div className={`view-section problems-view ${activeView === 'problems' ? 'is-active' : ''}`}>
            <Section eyebrow="Practice" title={`${filteredProblems.length} visible problems`} icon={ListChecks}>
              <ProblemTable
                problems={filteredProblems}
                isProblemChecked={isProblemChecked}
                toggleProblem={toggleProblem}
                isBookmarked={isBookmarked}
                toggleBookmark={toggleBookmark}
                getNote={getNote}
                setNote={setNote}
              />
            </Section>
          </div>

          <div className={`view-section mobile-tracker-view ${activeView === 'tracker' ? 'is-active' : ''}`}>
            <TrackerBox
              chapter={chapter}
              chapterStats={chapterStats}
              isTrackerChecked={isTrackerChecked}
              toggleTracker={toggleTracker}
            />
            <div className="mobile-activity mobile-activity-tracker">
              <ActivityPanel activityStats={activityStats} />
            </div>
          </div>
        </div>

        <aside className="insight-rail">
          <TrackerBox
            chapter={chapter}
            chapterStats={chapterStats}
            isTrackerChecked={isTrackerChecked}
            toggleTracker={toggleTracker}
          />

          <ActivityPanel activityStats={activityStats} />
        </aside>
      </div>
    </div>
  )
}
