import { motion } from 'framer-motion'
import { Check, ExternalLink } from 'lucide-react'
import './ProblemTable.css'

const difficultyClasses = {
  Easy: 'easy',
  Medium: 'medium',
  Hard: 'hard',
}

export default function ProblemTable({ problems, isProblemChecked, toggleProblem }) {
  return (
    <div className="problems-surface">
      <div className="problem-head">
        <span>Status</span>
        <span>Problem</span>
        <span>Difficulty</span>
        <span>Pattern</span>
      </div>

      <div className="problem-list">
        {problems.map((problem, index) => {
          const checked = isProblemChecked(problem.id)

          return (
            <motion.div
              className={`problem-row ${checked ? 'is-solved' : ''}`}
              key={problem.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, delay: Math.min(index * 0.012, 0.12) }}
            >
              <label className="status-check">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleProblem(problem.id)}
                />
                <span>{checked && <Check size={13} />}</span>
              </label>

              <a href={problem.url} target="_blank" rel="noopener noreferrer" className="problem-title">
                <span>{problem.name}</span>
                <ExternalLink size={14} />
              </a>

              <span className={`difficulty-chip ${difficultyClasses[problem.difficulty] || ''}`}>
                {problem.difficulty}
              </span>

              <span className="pattern-label">{problem.pattern}</span>
            </motion.div>
          )
        })}

        {problems.length === 0 && (
          <div className="empty-state">
            <strong>No matching problems</strong>
            <span>Try a different search term or filter.</span>
          </div>
        )}
      </div>
    </div>
  )
}
