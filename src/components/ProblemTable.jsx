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
  const [interactionError, setInteractionError] = useState('')

  const handleProblemToggle = (event, id) => {
    event.preventDefault()
    event.stopPropagation()
    setInteractionError('')

    try {
      toggleProblem(id)
    } catch (err) {
      console.error('Failed to update problem progress:', err)
      setInteractionError('Could not update this problem yet. Your page is still safe, please try again.')
    }
  }

  const handleNoteToggle = (id) => {
    setExpandedNote(prev => prev === id ? null : id)
  }

  const handleNoteChange = (id, text) => {
    try {
      setNote(id, text)
    } catch (err) {
      console.error('Failed to update note:', err)
      setInteractionError('Could not save that note yet. Please try again.')
    }
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
        {interactionError && (
          <div className="problem-inline-error" role="status">
            {interactionError}
          </div>
        )}

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
            <div key={problem.id} className={`problem-item ${isNoteOpen ? 'has-open-note' : ''}`}>
              <div
                className={`problem-row ${checked ? 'is-solved' : ''} ${bookmarked ? 'is-bookmarked' : ''}`}
              >
                <button
                  type="button"
                  className="status-check"
                  aria-pressed={checked}
                  aria-label={checked ? `Mark ${problem.name} unsolved` : `Mark ${problem.name} solved`}
                  onClick={event => handleProblemToggle(event, problem.id)}
                >
                  <span>{checked && <Check size={13} />}</span>
                </button>

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

              {isNoteOpen && (
                <section
                  className="note-bubble"
                  role="dialog"
                  aria-label={`Notes for ${problem.name}`}
                >
                  <div className="note-bubble-head">
                    <div>
                      <p className="note-eyebrow">Problem note</p>
                      <h3>{problem.name}</h3>
                    </div>
                    <button className="note-bubble-close" onClick={() => setExpandedNote(null)} aria-label="Close note">
                      <X size={15} />
                    </button>
                  </div>

                  <textarea
                    className="note-bubble-input"
                    value={noteText}
                    onChange={event => handleNoteChange(problem.id, event.target.value)}
                    placeholder="Capture the trick, edge case, or mistake you want to remember..."
                    rows={4}
                    autoFocus
                  />

                  <div className="note-bubble-footer">
                    <span>{noteText.length} chars</span>
                    <button type="button" onClick={() => setExpandedNote(null)}>Done</button>
                  </div>
                </section>
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
