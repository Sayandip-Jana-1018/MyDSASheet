import { useState } from 'react'
import './FilterBar.css'

export default function FilterBar({ onFilter, onSearch, onReset }) {
  const [active, setActive] = useState('all')
  const [showResetModal, setShowResetModal] = useState(false)

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'Easy', label: 'Easy' },
    { key: 'Medium', label: 'Med' },
    { key: 'Hard', label: 'Hard' },
    { key: 'unsolved', label: '○' },
  ]

  const handleFilter = (key) => {
    setActive(key)
    onFilter(key)
  }

  return (
    <>
      <div className="filter-bar">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            type="text"
            placeholder="Search…"
            onChange={e => onSearch(e.target.value)}
          />
        </div>
        <div className="filter-pills">
          {filters.map(f => (
            <button
              key={f.key}
              className={`filter-btn ${active === f.key ? 'active' : ''}`}
              onClick={() => handleFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button className="action-btn reset-btn" onClick={() => setShowResetModal(true)}>Reset</button>
      </div>

      {showResetModal && (
        <div className="modal-overlay" onClick={() => setShowResetModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">Reset Progress?</h3>
            <p className="modal-text">This will clear all your solved problems and tracker data. This cannot be undone.</p>
            <div className="modal-actions">
              <button className="modal-btn modal-cancel" onClick={() => setShowResetModal(false)}>Cancel</button>
              <button className="modal-btn modal-confirm" onClick={() => { onReset(); setShowResetModal(false); }}>Reset</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
