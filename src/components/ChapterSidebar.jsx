import './ChapterSidebar.css'

export default function ChapterSidebar({ chapter, isActive, chapterStats, onClick }) {
  const { done, total } = chapterStats
  const pct = total ? Math.round(done / total * 100) : 0

  return (
    <button
      className={`sidebar-ch ${isActive ? 'active' : ''}`}
      onClick={onClick}
      title={chapter.name}
    >
      <div className="sch-color" style={{ background: chapter.color }} />
      <span className="sch-icon">{chapter.icon}</span>
      <div className="sch-info">
        <span className="sch-name">{chapter.name}</span>
        <div className="sch-row">
          <span className="sch-meta">{done}/{total}</span>
          <div className="sch-bar">
            <div className="sch-bar-fill" style={{ width: `${pct}%`, background: chapter.color }} />
          </div>
        </div>
      </div>
    </button>
  )
}
