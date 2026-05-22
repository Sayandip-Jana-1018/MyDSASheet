import { useState, useCallback, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'

const CHAT_COOLDOWN_MS = 5000
const LAST_VISIT_KEY = 'dsa-community-last-visit'

function loadLastVisit() {
  try {
    return localStorage.getItem(LAST_VISIT_KEY) || null
  } catch { return null }
}

function saveLastVisit() {
  try {
    localStorage.setItem(LAST_VISIT_KEY, new Date().toISOString())
  } catch { /* ignore */ }
}

function timeAgo(dateStr) {
  if (!dateStr) return ''
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  return `${months}mo ago`
}

function getDisplayTitle(q) {
  return q.leetcode_title || q.custom_title || 'Untitled Question'
}

function getDisplayUrl(q) {
  return q.leetcode_url || q.custom_url || ''
}

function getDisplayDifficulty(q) {
  return q.leetcode_difficulty || q.custom_difficulty || ''
}

export { timeAgo, getDisplayTitle, getDisplayUrl, getDisplayDifficulty }

export function useCommunityQuestions(userId, profile) {
  const [questions, setQuestions] = useState([])
  const [checks, setChecks] = useState({})
  const [messages, setMessages] = useState([])
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [chatLoading, setChatLoading] = useState(true)
  const [addingQuestion, setAddingQuestion] = useState(false)
  const [sendingMessage, setSendingMessage] = useState(false)
  const [fetchingLeetcode, setFetchingLeetcode] = useState(false)
  const [newQuestionCount, setNewQuestionCount] = useState(0)
  const lastChatSentRef = useRef(0)

  // Fetch community questions
  const fetchQuestions = useCallback(async () => {
    if (!supabase) { setLoading(false); return }
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('community_questions')
        .select(`
          *,
          author:community_profiles!added_by(id, username, avatar_url)
        `)
        .order('created_at', { ascending: false })
        .limit(200)

      if (error) throw error
      setQuestions(data || [])

      // Count new questions since last visit
      const lastVisit = loadLastVisit()
      if (lastVisit) {
        const newCount = (data || []).filter(q => q.created_at > lastVisit).length
        setNewQuestionCount(newCount)
      }
    } catch (err) {
      console.error('Failed to fetch community questions:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch current user's checks
  const fetchChecks = useCallback(async () => {
    if (!supabase || !userId) return
    try {
      const { data, error } = await supabase
        .from('community_question_checks')
        .select('question_id, checked_at')
        .eq('user_id', userId)

      if (error) throw error
      const checksMap = {}
      for (const row of (data || [])) {
        checksMap[row.question_id] = row.checked_at
      }
      setChecks(checksMap)
    } catch (err) {
      console.error('Failed to fetch checks:', err)
    }
  }, [userId])

  // Fetch chat messages
  const fetchMessages = useCallback(async () => {
    if (!supabase) { setChatLoading(false); return }
    try {
      setChatLoading(true)
      const { data, error } = await supabase
        .from('community_chat_messages')
        .select(`
          *,
          author:community_profiles!user_id(id, username, avatar_url)
        `)
        .order('created_at', { ascending: true })
        .limit(100)

      if (error) throw error
      setMessages(data || [])
    } catch (err) {
      console.error('Failed to fetch chat messages:', err)
    } finally {
      setChatLoading(false)
    }
  }, [])

  // Fetch distinct company names for autocomplete
  const fetchCompanies = useCallback(async () => {
    if (!supabase) return
    try {
      const { data, error } = await supabase
        .from('community_questions')
        .select('company_name')
        .neq('company_name', '')
        .limit(500)

      if (error) throw error
      const unique = [...new Set((data || []).map(r => r.company_name))].sort()
      setCompanies(unique)
    } catch (err) {
      console.error('Failed to fetch companies:', err)
    }
  }, [])

  // Load all data on mount
  useEffect(() => {
    fetchQuestions()
    fetchChecks()
    fetchMessages()
    fetchCompanies()
  }, [fetchQuestions, fetchChecks, fetchMessages, fetchCompanies])

  // Mark community as visited
  const markVisited = useCallback(() => {
    saveLastVisit()
    setNewQuestionCount(0)
  }, [])

  // Add a question
  const addQuestion = useCallback(async (questionData) => {
    if (!supabase || !userId || !profile?.claimed) {
      return { ok: false, error: new Error('Claim your profile first.') }
    }
    try {
      setAddingQuestion(true)
      const { data, error } = await supabase
        .from('community_questions')
        .insert({
          added_by: userId,
          company_name: (questionData.companyName || '').trim(),
          drive_name: (questionData.driveName || '').trim(),
          leetcode_number: questionData.leetcodeNumber || null,
          leetcode_title: questionData.leetcodeTitle || null,
          leetcode_url: questionData.leetcodeUrl || null,
          leetcode_difficulty: questionData.leetcodeDifficulty || null,
          custom_title: questionData.customTitle || null,
          custom_url: questionData.customUrl || null,
          custom_difficulty: questionData.customDifficulty || null,
          description: (questionData.description || '').trim(),
        })
        .select(`
          *,
          author:community_profiles!added_by(id, username, avatar_url)
        `)
        .single()

      if (error) throw error
      setQuestions(prev => [data, ...prev])
      fetchCompanies()
      return { ok: true, question: data }
    } catch (err) {
      console.error('Failed to add question:', err)
      return { ok: false, error: err }
    } finally {
      setAddingQuestion(false)
    }
  }, [userId, profile?.claimed, fetchCompanies])

  // Toggle check on a question
  const toggleCheck = useCallback(async (questionId) => {
    if (!supabase || !userId || !profile?.claimed) {
      return { ok: false, error: new Error('Claim your profile first.') }
    }

    const isCurrentlyChecked = !!checks[questionId]

    try {
      if (isCurrentlyChecked) {
        const { error } = await supabase
          .from('community_question_checks')
          .delete()
          .eq('question_id', questionId)
          .eq('user_id', userId)
        if (error) throw error
        setChecks(prev => {
          const next = { ...prev }
          delete next[questionId]
          return next
        })
      } else {
        const { error } = await supabase
          .from('community_question_checks')
          .insert({ question_id: questionId, user_id: userId })
        if (error) throw error
        setChecks(prev => ({
          ...prev,
          [questionId]: new Date().toISOString(),
        }))
      }
      return { ok: true }
    } catch (err) {
      console.error('Failed to toggle check:', err)
      return { ok: false, error: err }
    }
  }, [userId, profile?.claimed, checks])

  // Send chat message
  const sendMessage = useCallback(async (text, questionId = null) => {
    if (!supabase || !userId || !profile?.claimed) {
      return { ok: false, error: new Error('Claim your profile first.') }
    }

    const trimmed = (text || '').trim()
    if (!trimmed) return { ok: false, error: new Error('Message is empty.') }

    const now = Date.now()
    if (now - lastChatSentRef.current < CHAT_COOLDOWN_MS) {
      const remaining = Math.ceil((CHAT_COOLDOWN_MS - (now - lastChatSentRef.current)) / 1000)
      return { ok: false, error: new Error(`Wait ${remaining}s before sending another message.`) }
    }

    try {
      setSendingMessage(true)
      const { data, error } = await supabase
        .from('community_chat_messages')
        .insert({
          user_id: userId,
          question_id: questionId || null,
          message: trimmed,
        })
        .select(`
          *,
          author:community_profiles!user_id(id, username, avatar_url)
        `)
        .single()

      if (error) throw error
      lastChatSentRef.current = Date.now()
      setMessages(prev => [...prev, data])
      return { ok: true, message: data }
    } catch (err) {
      console.error('Failed to send message:', err)
      return { ok: false, error: err }
    } finally {
      setSendingMessage(false)
    }
  }, [userId, profile?.claimed])

  // Fetch LeetCode problem via Edge Function
  const fetchLeetcodeProblem = useCallback(async (problemNumber) => {
    if (!supabase) {
      return { ok: false, found: false, error: new Error('Supabase not configured.') }
    }

    const num = parseInt(problemNumber, 10)
    if (!num || num < 1) {
      return { ok: false, found: false, error: new Error('Enter a valid problem number.') }
    }

    try {
      setFetchingLeetcode(true)
      const { data, error } = await supabase.functions.invoke('fetch-leetcode-problem', {
        body: { problemNumber: num },
      })

      if (error) throw error
      if (!data?.found) {
        return { ok: true, found: false }
      }

      return {
        ok: true,
        found: true,
        title: data.title,
        difficulty: data.difficulty,
        url: data.url,
        slug: data.slug,
      }
    } catch (err) {
      console.error('Failed to fetch LeetCode problem:', err)
      return { ok: false, found: false, error: err }
    } finally {
      setFetchingLeetcode(false)
    }
  }, [])

  // Get recent community activity for any user
  const fetchRecentActivity = useCallback(async (targetUserId, limit = 5) => {
    if (!supabase || !targetUserId) return []

    try {
      const { data, error } = await supabase.rpc('get_user_recent_community_activity', {
        p_user_id: targetUserId,
        p_limit: limit,
      })
      if (error) throw error
      return data || []
    } catch (err) {
      console.error('Failed to fetch recent activity:', err)
      return []
    }
  }, [])

  const isChecked = useCallback((questionId) => !!checks[questionId], [checks])
  const checkedCount = Object.keys(checks).length

  return {
    questions,
    checks,
    messages,
    companies,
    loading,
    chatLoading,
    addingQuestion,
    sendingMessage,
    fetchingLeetcode,
    newQuestionCount,
    checkedCount,
    isChecked,
    addQuestion,
    toggleCheck,
    sendMessage,
    fetchLeetcodeProblem,
    fetchRecentActivity,
    fetchQuestions,
    fetchMessages,
    markVisited,
  }
}
