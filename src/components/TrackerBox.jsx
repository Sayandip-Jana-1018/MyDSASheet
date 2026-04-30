import { Check, Circle, GraduationCap, ListChecks, RotateCcw, Target, Trophy } from 'lucide-react'
import './TrackerBox.css'

const TRACKER_ITEMS = [
  { type: 'concept', label: 'Concept revision', icon: GraduationCap },
  { type: 'easy', label: 'Easy set complete', icon: Circle },
  { type: 'medium', label: 'Medium set complete', icon: Target },
  { type: 'hard', label: 'Hard set complete', icon: Trophy },
  { type: 'revision', label: 'Final revision complete', icon: RotateCcw },
]

export default function TrackerBox({ chapter, chapterStats, isTrackerChecked, toggleTracker }) {
  const { done, total } = chapterStats
  const pct = total ? Math.round((done / total) * 100) : 0
  const checkedCount = TRACKER_ITEMS.filter(item => isTrackerChecked(chapter.id, item.type)).length

  return (
    <section className="tracker-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Milestones</p>
          <h2>Chapter tracker</h2>
        </div>
        <span className="section-pill">{checkedCount}/5</span>
      </div>

      <div className="tracker-stack">
        {TRACKER_ITEMS.map(item => {
          const checked = isTrackerChecked(chapter.id, item.type)
          const Icon = item.icon

          return (
            <label key={item.type} className={`tracker-row ${checked ? 'is-checked' : ''}`}>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleTracker(chapter.id, item.type)}
              />
              <span className="tracker-icon"><Icon size={16} /></span>
              <span>{item.label}</span>
              <span className="tracker-state">{checked ? <Check size={14} /> : <ListChecks size={14} />}</span>
            </label>
          )
        })}
      </div>

      <div className="tracker-summary">
        <div className="tracker-meter">
          <span style={{ width: `${pct}%` }} />
        </div>
        <div>
          <span>{done}/{total} problems</span>
          <span>{pct}% solved</span>
        </div>
      </div>
    </section>
  )
}
