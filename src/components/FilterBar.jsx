import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RotateCcw, Search, X } from 'lucide-react'
import './FilterBar.css'

const filters = [
  { key: 'all', label: 'All' },
  { key: 'Easy', label: 'Easy' },
  { key: 'Medium', label: 'Med' },
  { key: 'Hard', label: 'Hard' },
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

      <AnimatePresence>
        {showResetModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowResetModal(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.96, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 10 }}
              onClick={event => event.stopPropagation()}
            >
              <button className="modal-close" aria-label="Close reset dialog" onClick={() => setShowResetModal(false)}>
                <X size={16} />
              </button>
              <p className="modal-eyebrow">Reset roadmap</p>
              <h3>Clear all saved progress?</h3>
              <p>This removes solved problems and milestone checks from this browser. Your roadmap content stays the same.</p>
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
