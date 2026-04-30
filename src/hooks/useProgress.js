import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { chapters } from '../data/chapters'
import { supabase } from '../lib/supabase'

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
  const [bookmarks, setBookmarks] = useState(() => loadJSON('dsa-bookmarks', {}))
  const [notes, setNotes] = useState(() => loadJSON('dsa-notes', {}))

  // Ensure the user has a unique ID for community tracking
  const [userId, setUserId] = useState(() => {
    let id = localStorage.getItem('dsa-user-id')
    if (!id) {
      id = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36)
      localStorage.setItem('dsa-user-id', id)
    }
    return id
  })

  // Also store username, fallback to a fun random name
  const [username, setUsername] = useState(() => {
    let name = localStorage.getItem('dsa-username')
    if (!name) {
      const adjectives = ['Anonymous', 'Silent', 'Mysterious', 'Determined', 'Focused', 'Rapid', 'Stealthy', 'Clever']
      const nouns = ['Coder', 'Developer', 'Hacker', 'Engineer', 'Ninja', 'Solver', 'Architect', 'Alchemist']
      const randName = `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`
      name = randName
      localStorage.setItem('dsa-username', name)
    }
    return name
  })

  const toggleProblem = useCallback((id) => {
    setProblems(prev => {
      const next = { ...prev, [id]: !prev[id] }
      saveJSON('dsa-problems', next)
      return next
    })
  }, [])

  const toggleTracker = useCallback((chId, type) => {
    const key = `${chId}-${type}`
    setTracker(prev => {
      const next = { ...prev, [key]: !prev[key] }
      saveJSON('dsa-tracker', next)
      return next
    })
  }, [])

  const toggleBookmark = useCallback((id) => {
    setBookmarks(prev => {
      const next = { ...prev, [id]: !prev[id] }
      // Clean up false values
      if (!next[id]) delete next[id]
      saveJSON('dsa-bookmarks', next)
      return next
    })
  }, [])

  const setNote = useCallback((id, text) => {
    setNotes(prev => {
      const next = { ...prev }
      if (text.trim()) {
        next[id] = text
      } else {
        delete next[id]
      }
      saveJSON('dsa-notes', next)
      return next
    })
  }, [])

  const getNote = useCallback((id) => notes[id] || '', [notes])

  const isProblemChecked = useCallback((id) => !!problems[id], [problems])
  const isTrackerChecked = useCallback((chId, type) => !!tracker[`${chId}-${type}`], [tracker])
  const isBookmarked = useCallback((id) => !!bookmarks[id], [bookmarks])

  const stats = useMemo(() => {
    try {
      let totalSolved = 0
      let easyCount = 0, medCount = 0, hardCount = 0
      const chapterStats = {}
      const solvedIds = []

      for (const ch of chapters) {
        const chapterProblems = ch.problems || []
        let chDone = 0
        for (const p of chapterProblems) {
          if (p && problems[p.id]) {
            chDone++
            totalSolved++
            solvedIds.push(p.id)
            if (p.difficulty === 'Easy') easyCount++
            else if (p.difficulty === 'Medium') medCount++
            else if (p.difficulty === 'Hard') hardCount++
          }
        }
        chapterStats[ch.id] = { done: chDone, total: chapterProblems.length }
      }

      const totalProblems = chapters.reduce((s, c) => s + (c.problems || []).length, 0)
      return {
        totalSolved,
        totalProblems,
        chapterStats,
        pct: totalProblems ? Math.round(totalSolved / totalProblems * 100) : 0,
        difficultyBreakdown: { easy: easyCount, medium: medCount, hard: hardCount },
        solvedIds,
        bookmarkCount: Object.keys(bookmarks).length,
        noteCount: Object.keys(notes).length,
      }
    } catch (err) {
      console.error('stats computation error:', err)
      return { totalSolved: 0, totalProblems: 0, chapterStats: {}, pct: 0, difficultyBreakdown: { easy: 0, medium: 0, hard: 0 }, solvedIds: [], bookmarkCount: 0, noteCount: 0 }
    }
  }, [problems, bookmarks, notes])

  // Stable reference for Supabase sync — prevents re-triggering on every object change
  const syncDataRef = useRef({ userId, username, stats, tracker, bookmarks })
  syncDataRef.current = { userId, username, stats, tracker, bookmarks }

  // Sync to Supabase in the background (debounced)
  useEffect(() => {
    const timer = setTimeout(async () => {
      const { userId: uid, username: uname, stats: s, tracker: t, bookmarks: b } = syncDataRef.current
      try {
        if (!supabase || !uid) return
        await supabase
          .from('community_profiles')
          .upsert({
            id: uid,
            username: uname,
            total_solved: s.totalSolved,
            chapter_progress: s.chapterStats,
            difficulty_breakdown: s.difficultyBreakdown,
            solved_problems: s.solvedIds,
            bookmarked_problems: Object.keys(b),
            tracker_progress: t,
            last_active: new Date().toISOString()
          }, { onConflict: 'id' })
      } catch (err) {
        console.error('Failed to sync to Supabase:', err)
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [problems, tracker, bookmarks, username])

  const resetAll = useCallback(async () => {
    // Clear localStorage
    setProblems({})
    setTracker({})
    setBookmarks({})
    setNotes({})
    saveJSON('dsa-problems', {})
    saveJSON('dsa-tracker', {})
    saveJSON('dsa-bookmarks', {})
    saveJSON('dsa-notes', {})

    // Delete from Supabase
    try {
      if (supabase && userId) {
        await supabase.from('community_profiles').delete().eq('id', userId)
      }
    } catch (err) {
      console.error('Failed to delete Supabase profile:', err)
    }

    // Generate new identity
    const newId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36)
    localStorage.setItem('dsa-user-id', newId)
    setUserId(newId)

    const adjectives = ['Anonymous', 'Silent', 'Mysterious', 'Determined', 'Focused', 'Rapid', 'Stealthy', 'Clever']
    const nouns = ['Coder', 'Developer', 'Hacker', 'Engineer', 'Ninja', 'Solver', 'Architect', 'Alchemist']
    const newName = `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`
    localStorage.setItem('dsa-username', newName)
    setUsername(newName)
  }, [userId])

  return {
    isProblemChecked, toggleProblem,
    isTrackerChecked, toggleTracker,
    isBookmarked, toggleBookmark,
    getNote, setNote, notes,
    stats, resetAll,
    userId, username, setUsername,
  }
}
