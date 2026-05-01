import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Bookmark, RotateCcw, Search, X } from 'lucide-react'
import './FilterBar.css'

const filters = [
  { key: 'all', label: 'All' },
  { key: 'Easy', label: 'Easy' },
  { key: 'Medium', label: 'Med' },
  { key: 'Hard', label: 'Hard' },
  { key: 'bookmarked', label: 'Saved', icon: Bookmark },
]

export default function FilterBar({ filter, onFilter, search, onSearch, onReset }) {
  const [showResetModal, setShowResetModal] = useState(false)

  const resetModal = showResetModal ? (
    <div
      className="modal-overlay is-visible"
      role="presentation"
      onClick={() => setShowResetModal(false)}
    >
      <div
        className="modal-content is-visible"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reset-dialog-title"
        onClick={event => event.stopPropagation()}
      >
        <button className="modal-close" aria-label="Close reset dialog" onClick={() => setShowResetModal(false)}>
          <X size={16} />
        </button>
        <p className="modal-eyebrow">Reset roadmap</p>
        <h3 id="reset-dialog-title">Clear all saved progress?</h3>
        <p>This removes solved problems, bookmarks, notes, and milestone checks from this browser and cloud. Your roadmap content stays the same.</p>
        <div className="modal-actions">
          <button className="modal-secondary-action" onClick={() => setShowResetModal(false)}>Cancel</button>
          <button
            className="modal-danger-action"
            onClick={async () => {
              await onReset()
              setShowResetModal(false)
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  ) : null

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
          {filters.map(item => {
            const Icon = item.icon
            return (
              <button
                key={item.key}
                className={filter === item.key ? 'is-active' : ''}
                onClick={() => onFilter(item.key)}
              >
                {Icon && <Icon size={13} />}
                {item.label}
              </button>
            )
          })}
        </div>

        <button className="reset-control" onClick={() => setShowResetModal(true)}>
          <RotateCcw size={14} />
          Reset progress
        </button>
      </div>

      {resetModal && typeof document !== 'undefined' ? createPortal(resetModal, document.body) : resetModal}
    </>
  )
}
