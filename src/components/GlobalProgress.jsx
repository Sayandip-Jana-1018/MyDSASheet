import './GlobalProgress.css'

export default function GlobalProgress({ stats }) {
  return (
    <div className="global-progress-wrap">
      <div className="global-progress-bar-container">
        <div
          className="global-progress-bar"
          style={{ width: `${stats.pct}%` }}
        />
      </div>
      <p className="global-progress-label">
        {stats.totalSolved} / {stats.totalProblems} problems solved
      </p>
    </div>
  )
}
