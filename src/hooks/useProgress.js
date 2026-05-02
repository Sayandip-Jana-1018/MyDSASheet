import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { chapters } from '../data/chapters'
import { supabase } from '../lib/supabase'
import { buildActivityStats, normalizeSolvedAt } from '../lib/activity'

const PROFILE_KEY = 'dsa-profile'
const LEGACY_ID_KEY = 'dsa-user-id'
const LEGACY_NAME_KEY = 'dsa-username'
const SOLVED_AT_KEY = 'dsa-solved-at'
const EMPTY_PROGRESS = {}

function loadJSON(key, fallback) {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch { return fallback }
}

function saveJSON(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)) } catch { /* ignore */ }
}

function saveText(key, val) {
  try { localStorage.setItem(key, val) } catch { /* ignore */ }
}

function removeText(key) {
  try { localStorage.removeItem(key) } catch { /* ignore */ }
}

function normalizeMap(value, valueGuard = Boolean) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}

  return Object.entries(value).reduce((acc, [key, val]) => {
    if (typeof key === 'string' && key && valueGuard(val)) {
      acc[key] = val
    }
    return acc
  }, {})
}

function normalizeTextMap(value) {
  return normalizeMap(value, val => typeof val === 'string' && val.trim().length > 0)
}

function createId() {
  return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36)
}

function createSyncCode() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const bytes = new Uint8Array(12)
  crypto.getRandomValues(bytes)
  const chars = Array.from(bytes, byte => alphabet[byte % alphabet.length])
  return `DSA-${chars.slice(0, 4).join('')}-${chars.slice(4, 8).join('')}-${chars.slice(8, 12).join('')}`
}

function cleanName(value) {
  return String(value || '').replace(/\s+/g, ' ').trim().slice(0, 32)
}

function loadProfile() {
  const saved = loadJSON(PROFILE_KEY, null)
  if (saved && typeof saved === 'object') {
    return {
      id: saved.id || createId(),
      username: cleanName(saved.username),
      syncCode: typeof saved.syncCode === 'string' ? saved.syncCode : '',
      avatarUrl: typeof saved.avatarUrl === 'string' ? saved.avatarUrl : '',
      avatarPath: typeof saved.avatarPath === 'string' ? saved.avatarPath : '',
      claimed: Boolean(saved.claimed),
      leaderboardOptIn: Boolean(saved.leaderboardOptIn),
      dismissedOnboarding: Boolean(saved.dismissedOnboarding),
    }
  }

  const legacyId = localStorage.getItem(LEGACY_ID_KEY)
  const legacyName = cleanName(localStorage.getItem(LEGACY_NAME_KEY))

  return {
    id: legacyId || createId(),
    username: legacyName,
    syncCode: '',
    avatarUrl: '',
    avatarPath: '',
    claimed: false,
    leaderboardOptIn: false,
    dismissedOnboarding: false,
  }
}

function buildProfilePayload({ stats, tracker, bookmarks, solvedAtByProblem, activityStats }) {
  const activity = activityStats || buildActivityStats(solvedAtByProblem)

  return {
    total_solved: stats.totalSolved,
    chapter_progress: stats.chapterStats,
    difficulty_breakdown: stats.difficultyBreakdown,
    solved_problems: stats.solvedIds,
    solved_at: solvedAtByProblem,
    bookmarked_problems: Object.keys(bookmarks),
    tracker_progress: tracker,
    weekly_solved: activity.weeklySolved,
    monthly_solved: activity.monthlySolved,
    current_streak: activity.currentStreak,
    best_streak: activity.bestStreak,
    last_active: new Date().toISOString()
  }
}

function payloadToLocalProgress(profile) {
  const solved = Array.isArray(profile?.solved_problems) ? profile.solved_problems : []
  const saved = Array.isArray(profile?.bookmarked_problems) ? profile.bookmarked_problems : []

  return {
    problems: solved.reduce((acc, id) => {
      if (typeof id === 'string' && id) acc[id] = true
      return acc
    }, {}),
    bookmarks: saved.reduce((acc, id) => {
      if (typeof id === 'string' && id) acc[id] = true
      return acc
    }, {}),
    tracker: normalizeMap(profile?.tracker_progress || {}, Boolean),
    solvedAtByProblem: normalizeSolvedAt(profile?.solved_at || {}),
  }
}

async function getFunctionErrorMessage(error) {
  try {
    const context = error?.context
    if (context && typeof context.json === 'function') {
      const body = await context.json()
      return body?.error || body?.message || error.message
    }
    if (context && typeof context.text === 'function') {
      const text = await context.text()
      return text || error.message
    }
  } catch {
    // Keep the original error if the response body was already read or invalid.
  }

  return error?.message || 'Edge Function request failed.'
}

export function useProgress() {
  const [problems, setProblems] = useState(() => normalizeMap(loadJSON('dsa-problems', {}), Boolean))
  const [solvedAtByProblem, setSolvedAtByProblem] = useState(() => normalizeSolvedAt(loadJSON(SOLVED_AT_KEY, {})))
  const [tracker, setTracker] = useState(() => normalizeMap(loadJSON('dsa-tracker', {}), Boolean))
  const [bookmarks, setBookmarks] = useState(() => normalizeMap(loadJSON('dsa-bookmarks', {}), Boolean))
  const [notes, setNotes] = useState(() => normalizeTextMap(loadJSON('dsa-notes', {})))
  const [profile, setProfileState] = useState(loadProfile)
  const [syncStatus, setSyncStatus] = useState({ state: 'idle', message: '' })

  const persistProfile = useCallback((nextProfile) => {
    const normalized = {
      id: nextProfile.id || createId(),
      username: cleanName(nextProfile.username),
      syncCode: nextProfile.syncCode || '',
      avatarUrl: nextProfile.avatarUrl || '',
      avatarPath: nextProfile.avatarPath || '',
      claimed: Boolean(nextProfile.claimed),
      leaderboardOptIn: Boolean(nextProfile.leaderboardOptIn),
      dismissedOnboarding: Boolean(nextProfile.dismissedOnboarding),
    }
    saveJSON(PROFILE_KEY, normalized)
    saveText(LEGACY_ID_KEY, normalized.id)
    if (normalized.username) {
      saveText(LEGACY_NAME_KEY, normalized.username)
    } else {
      removeText(LEGACY_NAME_KEY)
    }
    setProfileState(normalized)
    return normalized
  }, [])

  const toggleProblem = useCallback((id) => {
    if (!id) return
    const solvedAt = new Date().toISOString()
    setProblems(prev => {
      const next = normalizeMap(prev, Boolean)
      if (next[id]) {
        delete next[id]
        setSolvedAtByProblem(prevSolvedAt => {
          const nextSolvedAt = normalizeSolvedAt(prevSolvedAt)
          delete nextSolvedAt[id]
          saveJSON(SOLVED_AT_KEY, nextSolvedAt)
          return nextSolvedAt
        })
      } else {
        next[id] = true
        setSolvedAtByProblem(prevSolvedAt => {
          const nextSolvedAt = normalizeSolvedAt(prevSolvedAt)
          nextSolvedAt[id] = nextSolvedAt[id] || solvedAt
          saveJSON(SOLVED_AT_KEY, nextSolvedAt)
          return nextSolvedAt
        })
      }
      saveJSON('dsa-problems', next)
      return next
    })
  }, [])

  const toggleTracker = useCallback((chId, type) => {
    const key = `${chId}-${type}`
    setTracker(prev => {
      const next = normalizeMap(prev, Boolean)
      if (next[key]) {
        delete next[key]
      } else {
        next[key] = true
      }
      saveJSON('dsa-tracker', next)
      return next
    })
  }, [])

  const toggleBookmark = useCallback((id) => {
    if (!id) return
    setBookmarks(prev => {
      const next = normalizeMap(prev, Boolean)
      if (next[id]) {
        delete next[id]
      } else {
        next[id] = true
      }
      saveJSON('dsa-bookmarks', next)
      return next
    })
  }, [])

  const setNote = useCallback((id, text) => {
    if (!id) return
    setNotes(prev => {
      const next = normalizeTextMap(prev)
      const nextText = String(text || '').trim()
      if (nextText) {
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

  const activityStats = useMemo(() => buildActivityStats(solvedAtByProblem), [solvedAtByProblem])

  const syncDataRef = useRef({ profile, stats, tracker, bookmarks, solvedAtByProblem, activityStats })
  syncDataRef.current = { profile, stats, tracker, bookmarks, solvedAtByProblem, activityStats }

  const claimRemoteProfile = useCallback(async (nextProfile, payload) => {
    const { data, error } = await supabase.rpc('claim_community_profile', {
      p_id: nextProfile.id,
      p_username: cleanName(nextProfile.username) || 'DSA Pilot',
      p_sync_code: nextProfile.syncCode,
      p_leaderboard_opt_in: Boolean(nextProfile.leaderboardOptIn),
      p_payload: payload,
    })

    if (error) throw error
    const remote = Array.isArray(data) ? data[0] : data
    return persistProfile({
      ...nextProfile,
      avatarUrl: remote?.avatar_url || nextProfile.avatarUrl || '',
      avatarPath: remote?.avatar_path || nextProfile.avatarPath || '',
    })
  }, [persistProfile])

  const syncNow = useCallback(async (overrideProfile) => {
    const { profile: currentProfile, stats: s, tracker: t, bookmarks: b, solvedAtByProblem: solvedAt, activityStats: activity } = syncDataRef.current
    const nextProfile = overrideProfile || currentProfile

    try {
      if (!supabase) return { ok: false, skipped: true, reason: 'missing-config' }
      if (!nextProfile?.claimed || !nextProfile?.syncCode) {
        return { ok: false, skipped: true, reason: 'private-profile' }
      }

      const payload = buildProfilePayload({ stats: s, tracker: t, bookmarks: b, solvedAtByProblem: solvedAt, activityStats: activity })
      const { data, error } = await supabase.rpc('sync_community_profile', {
        p_id: nextProfile.id,
        p_sync_code: nextProfile.syncCode,
        p_username: cleanName(nextProfile.username) || 'DSA Pilot',
        p_leaderboard_opt_in: Boolean(nextProfile.leaderboardOptIn),
        p_payload: payload,
      })

      if (error) {
        await claimRemoteProfile(nextProfile, payload)
        setSyncStatus({ state: 'synced', message: '' })
        return { ok: true, recovered: true }
      }
      const remote = Array.isArray(data) ? data[0] : data
      if (
        (remote?.avatar_url !== undefined || remote?.avatar_path !== undefined) &&
        ((remote?.avatar_url || '') !== (nextProfile.avatarUrl || '') ||
          (remote?.avatar_path || '') !== (nextProfile.avatarPath || ''))
      ) {
        persistProfile({
          ...nextProfile,
          avatarUrl: remote?.avatar_url || nextProfile.avatarUrl || '',
          avatarPath: remote?.avatar_path || nextProfile.avatarPath || '',
        })
      }
      setSyncStatus({ state: 'synced', message: nextProfile.leaderboardOptIn ? 'Leaderboard synced.' : 'Private profile synced.' })
      return { ok: true }
    } catch (err) {
      setSyncStatus({ state: 'error', message: '' })
      return { ok: false, error: err }
    }
  }, [claimRemoteProfile, persistProfile])

  useEffect(() => {
    if (!profile.claimed) return undefined
    const timer = setTimeout(async () => {
      await syncNow()
    }, 1800)
    return () => clearTimeout(timer)
  }, [problems, tracker, bookmarks, solvedAtByProblem, profile, syncNow])

  const claimProfile = useCallback(async ({ username, leaderboardOptIn = true }) => {
    const displayName = cleanName(username)
    if (!displayName) {
      return { ok: false, error: new Error('Name is required') }
    }

    const nextProfile = persistProfile({
      ...profile,
      username: displayName,
      syncCode: profile.syncCode || createSyncCode(),
      claimed: true,
      leaderboardOptIn,
      dismissedOnboarding: true,
    })

    setSyncStatus({ state: 'syncing', message: 'Creating profile...' })

    try {
      if (!supabase) {
        setSyncStatus({ state: 'local', message: 'Saved locally. Add Supabase env vars to publish.' })
        return { ok: true, profile: nextProfile, localOnly: true }
      }

      const payload = buildProfilePayload({ stats, tracker, bookmarks, solvedAtByProblem, activityStats })
      const savedProfile = await claimRemoteProfile(nextProfile, payload)
      setSyncStatus({ state: 'synced', message: savedProfile.leaderboardOptIn ? 'Profile joined leaderboard.' : 'Private sync profile ready.' })
      return { ok: true, profile: savedProfile }
    } catch (err) {
      console.error('Failed to claim Supabase profile:', err)
      setSyncStatus({ state: 'error', message: 'Profile saved locally. Run the new Supabase schema to publish.' })
      return { ok: true, profile: nextProfile, localOnly: true, error: err }
    }
  }, [activityStats, bookmarks, claimRemoteProfile, persistProfile, profile, solvedAtByProblem, stats, tracker])

  const connectWithCode = useCallback(async (code) => {
    const syncCode = String(code || '').trim().toUpperCase()
    if (!syncCode) return { ok: false, error: new Error('Sync code is required') }

    setSyncStatus({ state: 'syncing', message: 'Loading profile...' })

    try {
      if (!supabase) throw new Error('Supabase is not configured')

      const { data, error } = await supabase.rpc('restore_community_profile', {
        p_sync_code: syncCode,
      })

      if (error) throw error
      const remote = Array.isArray(data) ? data[0] : data
      if (!remote?.id) throw new Error('No profile found for this sync code')

      const restored = payloadToLocalProgress(remote)
      setProblems(restored.problems)
      setBookmarks(restored.bookmarks)
      setTracker(restored.tracker)
      setSolvedAtByProblem(restored.solvedAtByProblem)
      saveJSON('dsa-problems', restored.problems)
      saveJSON('dsa-bookmarks', restored.bookmarks)
      saveJSON('dsa-tracker', restored.tracker)
      saveJSON(SOLVED_AT_KEY, restored.solvedAtByProblem)

      const nextProfile = persistProfile({
        id: remote.id,
        username: cleanName(remote.username) || 'DSA Pilot',
        syncCode,
        avatarUrl: remote.avatar_url || '',
        avatarPath: remote.avatar_path || '',
        claimed: true,
        leaderboardOptIn: Boolean(remote.leaderboard_opt_in),
        dismissedOnboarding: true,
      })

      setSyncStatus({ state: 'synced', message: 'Profile connected on this device.' })
      return { ok: true, profile: nextProfile }
    } catch (err) {
      console.error('Failed to restore profile:', err)
      setSyncStatus({ state: 'error', message: 'Could not find that sync code.' })
      return { ok: false, error: err }
    }
  }, [persistProfile])

  const findProfilesByName = useCallback(async (name) => {
    const displayName = cleanName(name)
    if (!displayName || !supabase) return { ok: true, profiles: [] }

    try {
      const { data, error } = await supabase
        .from('community_profiles')
        .select('id, username, total_solved, avatar_url, last_active')
        .eq('leaderboard_opt_in', true)
        .ilike('username', `%${displayName}%`)
        .order('last_active', { ascending: false })
        .limit(5)

      if (error) throw error
      return { ok: true, profiles: data || [] }
    } catch (err) {
      return { ok: false, profiles: [], error: err }
    }
  }, [])

  const updateProfileName = useCallback(async (name) => {
    const displayName = cleanName(name)
    if (!displayName) return { ok: false }
    const nextProfile = persistProfile({ ...profile, username: displayName, dismissedOnboarding: true })
    const syncResult = await syncNow(nextProfile)
    return { ok: true, profile: nextProfile, syncResult }
  }, [persistProfile, profile, syncNow])

  const setLeaderboardOptIn = useCallback((value) => {
    const nextProfile = persistProfile({ ...profile, leaderboardOptIn: Boolean(value), dismissedOnboarding: true })
    syncNow(nextProfile)
    return nextProfile
  }, [persistProfile, profile, syncNow])

  const uploadAvatar = useCallback(async (avatarDataUrl, profileOverride) => {
    const targetProfile = profileOverride || profile

    if (!targetProfile.claimed || !targetProfile.syncCode) {
      return { ok: false, error: new Error('Claim your profile before uploading an avatar.') }
    }

    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel, then redeploy.')
      }
      setSyncStatus({ state: 'syncing', message: avatarDataUrl ? 'Uploading avatar...' : 'Removing avatar...' })

      const { stats: s, tracker: t, bookmarks: b, solvedAtByProblem: solvedAt, activityStats: activity } = syncDataRef.current
      const ensuredProfile = await claimRemoteProfile(targetProfile, buildProfilePayload({ stats: s, tracker: t, bookmarks: b, solvedAtByProblem: solvedAt, activityStats: activity }))

      const { data, error } = await supabase.functions.invoke('upload-profile-avatar', {
        body: {
          profileId: ensuredProfile.id,
          syncCode: ensuredProfile.syncCode,
          avatarDataUrl,
        },
      })

      if (error) throw new Error(await getFunctionErrorMessage(error))

      const nextProfile = persistProfile({
        ...ensuredProfile,
        avatarUrl: data?.avatarUrl || '',
        avatarPath: data?.avatarPath || '',
        dismissedOnboarding: true,
      })

      setSyncStatus({ state: 'synced', message: nextProfile.avatarUrl ? 'Avatar updated.' : 'Avatar removed.' })
      return { ok: true, profile: nextProfile }
    } catch (err) {
      setSyncStatus({ state: 'error', message: err?.message || 'Avatar upload failed. Check env vars, schema, bucket, and Edge Function deploy.' })
      return { ok: false, error: err }
    }
  }, [claimRemoteProfile, persistProfile, profile])

  const dismissOnboarding = useCallback(() => {
    persistProfile({ ...profile, dismissedOnboarding: true })
  }, [persistProfile, profile])

  const startFreshLocal = useCallback(() => {
    setProblems({})
    setSolvedAtByProblem({})
    setTracker({})
    setBookmarks({})
    setNotes({})
    saveJSON('dsa-problems', EMPTY_PROGRESS)
    saveJSON(SOLVED_AT_KEY, EMPTY_PROGRESS)
    saveJSON('dsa-tracker', EMPTY_PROGRESS)
    saveJSON('dsa-bookmarks', EMPTY_PROGRESS)
    saveJSON('dsa-notes', EMPTY_PROGRESS)

    const nextProfile = persistProfile({
      id: createId(),
      username: '',
      syncCode: '',
      avatarUrl: '',
      avatarPath: '',
      claimed: false,
      leaderboardOptIn: false,
      dismissedOnboarding: false,
    })

    setSyncStatus({ state: 'idle', message: 'Fresh browser profile ready.' })
    return nextProfile
  }, [persistProfile])

  const resetAll = useCallback(async () => {
    setProblems({})
    setSolvedAtByProblem({})
    setTracker({})
    setBookmarks({})
    setNotes({})
    saveJSON('dsa-problems', {})
    saveJSON(SOLVED_AT_KEY, {})
    saveJSON('dsa-tracker', {})
    saveJSON('dsa-bookmarks', {})
    saveJSON('dsa-notes', {})

    window.setTimeout(() => {
      syncNow()
    }, 0)
  }, [syncNow])

  return {
    isProblemChecked, toggleProblem,
    isTrackerChecked, toggleTracker,
    isBookmarked, toggleBookmark,
    getNote, setNote, notes,
    stats, activityStats, resetAll, syncNow,
    userId: profile.id,
    username: profile.username || 'Private pilot',
    setUsername: updateProfileName,
    profile,
    syncStatus,
    claimProfile,
    connectWithCode,
    findProfilesByName,
    updateProfileName,
    setLeaderboardOptIn,
    uploadAvatar,
    dismissOnboarding,
    startFreshLocal,
  }
}
