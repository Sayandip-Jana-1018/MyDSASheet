import { useState, useRef, useEffect } from 'react'
import ProblemTable from './ProblemTable'
import TrackerBox from './TrackerBox'
import './ChapterCard.css'

export default function ChapterCard({ chapter, chapterStats, filter, search, isProblemChecked, toggleProblem, isTrackerChecked, toggleTracker, forceOpen }) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef(null)

  useEffect(() => {
    if (forceOpen === 'all') setOpen(true)
    else if (forceOpen === 'none') setOpen(false)
  }, [forceOpen])

  const { done, total } = chapterStats
  const pct = total ? Math.round(done / total * 100) : 0

  return (
    <section className="chapter-card" id={chapter.id}>
      <div
        className="chapter-header"
        style={{ '--ch-color': chapter.color }}
        onClick={() => setOpen(o => !o)}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(o => !o); } }}
      >
        <div className="ch-title-area">
          <span className="ch-num">Ch {chapter.num}</span>
          <span className="ch-icon">{chapter.icon}</span>
          <span className="ch-name">{chapter.name}</span>
        </div>
        <div className="ch-meta-area">
          <span className="ch-pill ch-pill-easy">Easy: {chapter.totalEasy}</span>
          <span className="ch-pill ch-pill-med">Med: {chapter.totalMed}</span>
          <span className="ch-pill ch-pill-hard">Hard: {chapter.totalHard}</span>
          <span className="ch-pill ch-pill-total">Total: {total}</span>
          <span className="ch-progress-badge">{done}/{total}</span>
          <span className={`ch-chevron ${open ? 'open' : ''}`}>▼</span>
        </div>
      </div>

      {/* Mini progress bar on header */}
      <div className="ch-header-progress">
        <div className="ch-header-progress-fill" style={{ width: `${pct}%`, background: chapter.color }} />
      </div>

      <div className={`chapter-body ${open ? 'open' : ''}`} ref={bodyRef}>
        <div className="chapter-body-inner">
          {/* Concepts + Patterns Grid */}
          <div className="section-grid">
            <div className="content-box">
              <h3 className="box-title">📌 Core Concepts</h3>
              <ul className="concept-list">
                {chapter.concepts.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
            <div className="content-box">
              <h3 className="box-title">🧠 Important Patterns</h3>
              <div className="patterns-list">
                {chapter.patterns.map((p, i) => (
                  <div key={i} className="pattern-item">
                    <strong>{p.title}</strong> — {p.desc}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Problem Table */}
          <div className="content-box full-width">
            <h3 className="box-title">
              ✅ Practice Checklist
              <span className="sub-prog">({done}/{total} solved)</span>
            </h3>
            <ProblemTable
              problems={chapter.problems}
              filter={filter}
              search={search}
              isProblemChecked={isProblemChecked}
              toggleProblem={toggleProblem}
            />
          </div>

          {/* Variations + Tracker Grid */}
          <div className="section-grid">
            <div className="content-box">
              <h3 className="box-title">🔁 Must-Know Variations</h3>
              {chapter.variations.map((v, i) => (
                <div key={i} className="variation-group">
                  <strong>{v.title}:</strong>
                  <ul>
                    {v.items.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            <TrackerBox
              chapter={chapter}
              chapterStats={chapterStats}
              isTrackerChecked={isTrackerChecked}
              toggleTracker={toggleTracker}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
