import './ProblemTable.css'

const DIFF_CLASSES = {
  Easy: 'badge-easy',
  Medium: 'badge-medium',
  Hard: 'badge-hard',
}

export default function ProblemTable({ problems, filter, search, isProblemChecked, toggleProblem }) {
  const filtered = problems.filter(p => {
    if (filter === 'Easy' || filter === 'Medium' || filter === 'Hard') {
      if (p.difficulty !== filter) return false
    } else if (filter === 'unsolved') {
      if (isProblemChecked(p.id)) return false
    }
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="table-wrap">
      <table className="prob-table">
        <thead>
          <tr>
            <th style={{ width: '60px' }}>Status</th>
            <th>Problem</th>
            <th style={{ width: '100px' }} className="center">Difficulty</th>
            <th>Pattern</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(p => {
            const checked = isProblemChecked(p.id)
            return (
              <tr key={p.id} className={checked ? 'solved' : ''}>
                <td>
                  <label className="checkbox-wrap">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => toggleProblem(p.id)}
                    />
                    <span className={`custom-check ${checked ? 'checked' : ''}`}>
                      {checked && <span className="check-icon">✓</span>}
                    </span>
                  </label>
                </td>
                <td>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="prob-link">
                    {p.name}
                  </a>
                </td>
                <td className="center">
                  <span className={`badge ${DIFF_CLASSES[p.difficulty] || ''}`}>
                    {p.difficulty}
                  </span>
                </td>
                <td className="pattern-cell">{p.pattern}</td>
              </tr>
            )
          })}
          {filtered.length === 0 && (
            <tr>
              <td colSpan="4" className="empty-row">No problems match the current filter</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
