import './TrackerBox.css'

const TRACKER_ITEMS = [
  { type: 'concept', label: 'Concept Revision', icon: '📖' },
  { type: 'easy', label: 'Easy Problems Done', icon: '🟢' },
  { type: 'medium', label: 'Medium Problems Done', icon: '🟡' },
  { type: 'hard', label: 'Hard Problems Done', icon: '🔴' },
  { type: 'revision', label: 'Revision Completed', icon: '✅' },
]

export default function TrackerBox({ chapter, chapterStats, isTrackerChecked, toggleTracker }) {
  const { done, total } = chapterStats
  const pct = total ? Math.round(done / total * 100) : 0
  const checkedCount = TRACKER_ITEMS.filter(i => isTrackerChecked(chapter.id, i.type)).length

  return (
    <div className="detail-box tracker-box">
      <h3 className="detail-box-title">📊 Chapter Completion Tracker</h3>

      <div className="tracker-items">
        {TRACKER_ITEMS.map(item => {
          const checked = isTrackerChecked(chapter.id, item.type)
          return (
            <label key={item.type} className={`tracker-row ${checked ? 'checked' : ''}`}>
              <input
                type="checkbox"
                className="sr-only"
                checked={checked}
                onChange={() => toggleTracker(chapter.id, item.type)}
              />
              <span className="tracker-icon">{item.icon}</span>
              <span className="tracker-label">{item.label}</span>
              <span className={`tracker-badge ${checked ? 'done' : ''}`}>
                {checked ? '✓' : '—'}
              </span>
            </label>
          )
        })}
      </div>

      <div className="tracker-footer">
        <div className="tracker-progress-bar">
          <div
            className="tracker-progress-fill"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="tracker-stats">
          <span>{done} / {total} problems</span>
          <span>{checkedCount}/5 milestones</span>
        </div>
      </div>
    </div>
  )
}
