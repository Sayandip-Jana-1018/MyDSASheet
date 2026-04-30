import { useState, useCallback, useMemo } from 'react'
import { chapters } from '../data/chapters'

function loadJSON(key, fallback) {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch { return fallback }
}
function saveJSON(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)) } catch { /* ignore */ }
}

export function useProgress() {
  const [problems, setProblems] = useState(() => loadJSON('dsa-problems', {}))
  const [tracker, setTracker] = useState(() => loadJSON('dsa-tracker', {}))

  const toggleProblem = useCallback((id) => {
    try {
      setProblems(prev => {
        const next = { ...prev, [id]: !prev[id] }
        saveJSON('dsa-problems', next)
        return next
      })
    } catch (err) {
      console.error('toggleProblem error:', err)
      window.__DSA_LAST_ERROR = err
    }
  }, [])

  const toggleTracker = useCallback((chId, type) => {
    const key = `${chId}-${type}`
    setTracker(prev => {
      const next = { ...prev, [key]: !prev[key] }
      saveJSON('dsa-tracker', next)
      return next
    })
  }, [])

  const isProblemChecked = useCallback((id) => !!problems[id], [problems])
  const isTrackerChecked = useCallback((chId, type) => !!tracker[`${chId}-${type}`], [tracker])

  const stats = useMemo(() => {
    try {
      let totalSolved = 0
      const chapterStats = {}
      for (const ch of chapters) {
        const chapterProblems = ch.problems || []
        const done = chapterProblems.filter(p => p && problems[p.id]).length
        totalSolved += done
        chapterStats[ch.id] = { done, total: chapterProblems.length }
      }
      const totalProblems = chapters.reduce((s, c) => s + (c.problems || []).length, 0)
      return { totalSolved, totalProblems, chapterStats, pct: totalProblems ? Math.round(totalSolved / totalProblems * 100) : 0 }
    } catch (err) {
      console.error('stats computation error:', err)
      window.__DSA_LAST_ERROR = err
      return { totalSolved: 0, totalProblems: 0, chapterStats: {}, pct: 0 }
    }
  }, [problems])

  const resetAll = useCallback(() => {
    setProblems({})
    setTracker({})
    saveJSON('dsa-problems', {})
    saveJSON('dsa-tracker', {})
  }, [])

  return { isProblemChecked, toggleProblem, isTrackerChecked, toggleTracker, stats, resetAll }
}
