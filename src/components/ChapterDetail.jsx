import ProblemTable from './ProblemTable'
import TrackerBox from './TrackerBox'
import './ChapterDetail.css'

export default function ChapterDetail({ chapter, chapterStats, filter, search, isProblemChecked, toggleProblem, isTrackerChecked, toggleTracker }) {
  const { done, total } = chapterStats
  const pct = total ? Math.round(done / total * 100) : 0

  return (
    <div className="chapter-detail" key={chapter.id}>
      {/* Hero Header */}
      <div className="detail-hero" style={{ '--ch-color': chapter.color }}>
        <div className="detail-hero-inner">
          <div className="detail-hero-left">
            <span className="detail-num">Chapter {chapter.num}</span>
            <h1 className="detail-title">
              <span className="detail-icon">{chapter.icon}</span>
              {chapter.name}
            </h1>
          </div>
          <div className="detail-hero-stats">
            <div className="dh-stat">
              <span className="dh-val dh-easy">{chapter.totalEasy}</span>
              <span className="dh-label">Easy</span>
            </div>
            <div className="dh-stat">
              <span className="dh-val dh-med">{chapter.totalMed}</span>
              <span className="dh-label">Medium</span>
            </div>
            <div className="dh-stat">
              <span className="dh-val dh-hard">{chapter.totalHard}</span>
              <span className="dh-label">Hard</span>
            </div>
            <div className="dh-stat dh-progress">
              <span className="dh-val">{pct}%</span>
              <span className="dh-label">Done</span>
            </div>
          </div>
        </div>
        <div className="detail-hero-bar">
          <div className="detail-hero-bar-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Content */}
      <div className="detail-content">
        {/* Concepts + Patterns */}
        <div className="detail-grid">
          <div className="detail-box">
            <h3 className="detail-box-title">📌 Core Concepts</h3>
            <ul className="concept-list">
              {chapter.concepts.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>
          <div className="detail-box">
            <h3 className="detail-box-title">🧠 Important Patterns</h3>
            <div className="patterns-grid">
              {chapter.patterns.map((p, i) => (
                <div key={i} className="pattern-card">
                  <span className="pattern-num">{i + 1}</span>
                  <div className="pattern-info">
                    <div className="pattern-name">{p.title}</div>
                    <div className="pattern-desc">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Problem Table */}
        <div className="detail-box">
          <h3 className="detail-box-title">
            ✅ Practice Checklist
            <span className="detail-sub">({done}/{total} solved)</span>
          </h3>
          <ProblemTable
            problems={chapter.problems}
            filter={filter}
            search={search}
            isProblemChecked={isProblemChecked}
            toggleProblem={toggleProblem}
          />
        </div>

        {/* Variations + Tracker + Tips — last grid stretches */}
        <div className="detail-grid">
          <div className="detail-box">
            <h3 className="detail-box-title">🔁 Must-Know Variations</h3>
            <div className="variations-list">
              {chapter.variations.map((v, i) => (
                <div key={i} className="variation-card">
                  <div className="variation-card-title">{v.title}</div>
                  <div className="variation-card-items">
                    {v.items.map((item, j) => (
                      <span key={j} className="variation-chip">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="detail-right-stack">
            <TrackerBox
              chapter={chapter}
              chapterStats={chapterStats}
              isTrackerChecked={isTrackerChecked}
              toggleTracker={toggleTracker}
            />
            <div className="detail-box">
              <h3 className="detail-box-title">💡 Interview Tips</h3>
              <ul className="concept-list">
                <li>Clarify edge cases (empty input, single element, duplicates) before coding</li>
                <li>State the brute-force approach first, then optimize step by step</li>
                <li>Discuss time and space complexity of each approach</li>
                <li>Write clean, readable code — use descriptive variable names</li>
                <li>Test with examples: normal case, edge case, and a large/stress case</li>
                <li>Think out loud — explain your thought process as you work through the problem</li>
                <li>Identify the pattern early: is it sliding window, two pointers, hashing, or DP?</li>
                <li>Dry-run your code on paper before submitting — catch off-by-one errors</li>
                <li>Ask about constraints: input size determines whether O(n²) or O(n log n) is needed</li>
                <li>Handle integer overflow: use long/BigInt for sum/product of large arrays</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
