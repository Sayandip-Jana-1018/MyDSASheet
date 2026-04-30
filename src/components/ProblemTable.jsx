import { useState } from 'react'
import { Bookmark, Check, ExternalLink, StickyNote, X } from 'lucide-react'
import './ProblemTable.css'

const difficultyClasses = {
  Easy: 'easy',
  Medium: 'medium',
  Hard: 'hard',
}

export default function ProblemTable({ problems, isProblemChecked, toggleProblem, isBookmarked, toggleBookmark, getNote, setNote }) {
  const [expandedNote, setExpandedNote] = useState(null)

  const handleNoteToggle = (id) => {
    setExpandedNote(prev => prev === id ? null : id)
  }

  const handleNoteChange = (id, text) => {
    setNote(id, text)
  }

  return (
    <div className="problems-surface">
      <div className="problem-head">
        <span>Status</span>
        <span>Problem</span>
        <span>Difficulty</span>
        <span>Pattern</span>
      </div>

      <div className="problem-list">
        {(problems || []).map((problem) => {
          if (!problem || !problem.id) {
            return null
          }
          const checked = isProblemChecked(problem.id)
          const bookmarked = isBookmarked ? isBookmarked(problem.id) : false
          const noteText = getNote ? getNote(problem.id) : ''
          const hasNote = noteText.length > 0
          const isNoteOpen = expandedNote === problem.id

          return (
            <div key={problem.id}>
              <div
                className={`problem-row ${checked ? 'is-solved' : ''} ${bookmarked ? 'is-bookmarked' : ''}`}
              >
                <label className="status-check">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleProblem(problem.id)}
                  />
                  <span>{checked && <Check size={13} />}</span>
                </label>

                <div className="problem-name-area">
                  <a href={problem.url} target="_blank" rel="noopener noreferrer" className="problem-title">
                    <span>{problem.name}</span>
                    <ExternalLink size={14} />
                  </a>
                  <div className="problem-actions">
                    {toggleBookmark && (
                      <button
                        className={`action-icon bookmark-icon ${bookmarked ? 'is-active' : ''}`}
                        onClick={() => toggleBookmark(problem.id)}
                        title={bookmarked ? 'Remove bookmark' : 'Review later'}
                        aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark for review'}
                      >
                        <Bookmark size={14} />
                      </button>
                    )}
                    {setNote && (
                      <button
                        className={`action-icon note-icon ${hasNote ? 'has-content' : ''} ${isNoteOpen ? 'is-active' : ''}`}
                        onClick={() => handleNoteToggle(problem.id)}
                        title={hasNote ? 'Edit note' : 'Add note'}
                        aria-label="Toggle note"
                      >
                        <StickyNote size={14} />
                        {hasNote && <span className="note-badge">{noteText.length}</span>}
                      </button>
                    )}
                  </div>
                </div>

                <span className={`difficulty-chip ${difficultyClasses[problem.difficulty] || ''}`}>
                  {problem.difficulty}
                </span>

                <span className="pattern-label">{problem.pattern}</span>
              </div>

              {/* Expandable note area */}
              {isNoteOpen && (
                <div className="note-row">
                  <div className="note-area">
                    <textarea
                      className="note-input"
                      value={noteText}
                      onChange={(e) => handleNoteChange(problem.id, e.target.value)}
                      placeholder="Write your notes here... (approach, edge cases, key insight)"
                      rows={3}
                      autoFocus
                    />
                    <div className="note-footer">
                      <span className="note-chars">{noteText.length} chars</span>
                      <button className="note-close" onClick={() => setExpandedNote(null)}>
                        <X size={12} />
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {(!problems || problems.length === 0) && (
          <div className="empty-state">
            <strong>No matching problems</strong>
            <span>Try a different search term or filter.</span>
          </div>
        )}
      </div>
    </div>
  )
}
