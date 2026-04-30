import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import './ChapterSidebar.css'

export default function ChapterSidebar({ chapter, isActive, chapterStats, onClick }) {
  const { done, total } = chapterStats
  const pct = total ? Math.round((done / total) * 100) : 0

  return (
    <motion.button
      type="button"
      className={`chapter-item ${isActive ? 'is-active' : ''}`}
      onClick={onClick}
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.99 }}
      style={{ '--chapter-color': chapter.color }}
    >
      <span className="chapter-index">{chapter.num}</span>
      <span className="chapter-accent" />
      <span className="chapter-copy">
        <span className="chapter-name">{chapter.name}</span>
        <span className="chapter-meta">{done}/{total} solved</span>
        <span className="chapter-meter">
          <span style={{ width: `${pct}%` }} />
        </span>
      </span>
      <ChevronRight className="chapter-arrow" size={16} />
    </motion.button>
  )
}
