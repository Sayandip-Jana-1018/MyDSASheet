import { useState } from 'react'
import { RotateCcw, Search, X } from 'lucide-react'
import './FilterBar.css'

const filters = [
  { key: 'all', label: 'All' },
  { key: 'Easy', label: 'Easy' },
  { key: 'Medium', label: 'Med' },
  { key: 'Hard', label: 'Hard' },
  { key: 'bookmarked', label: '🔖 Saved' },
]

export default function FilterBar({ filter, onFilter, search, onSearch, onReset }) {
  const [showResetModal, setShowResetModal] = useState(false)

  return (
    <>
      <div className="filter-panel">
        <label className="search-field">
          <Search size={15} />
          <input
            type="search"
            value={search}
            placeholder="Search problems"
            onChange={event => onSearch(event.target.value)}
          />
        </label>

        <div className="filter-set" aria-label="Problem filters">
          {filters.map(item => (
            <button
              key={item.key}
              className={filter === item.key ? 'is-active' : ''}
              onClick={() => onFilter(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button className="reset-control" onClick={() => setShowResetModal(true)}>
          <RotateCcw size={14} />
          Reset progress
        </button>
      </div>

      {/* CSS-only animated modal — no framer-motion */}
      <div
        className={`modal-overlay ${showResetModal ? 'is-visible' : ''}`}
        onClick={() => setShowResetModal(false)}
      >
        <div
          className={`modal-content ${showResetModal ? 'is-visible' : ''}`}
          onClick={event => event.stopPropagation()}
        >
          <button className="modal-close" aria-label="Close reset dialog" onClick={() => setShowResetModal(false)}>
            <X size={16} />
          </button>
          <p className="modal-eyebrow">Reset roadmap</p>
          <h3>Clear all saved progress?</h3>
          <p>This removes solved problems, bookmarks, notes, and milestone checks from this browser and cloud. Your roadmap content stays the same.</p>
          <div className="modal-actions">
            <button className="secondary-action" onClick={() => setShowResetModal(false)}>Cancel</button>
            <button
              className="danger-action"
              onClick={() => {
                onReset()
                setShowResetModal(false)
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
