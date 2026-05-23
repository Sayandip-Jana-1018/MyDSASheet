import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Search, Send, Check, ExternalLink, Building2,
  Briefcase, ChevronDown, ChevronUp, FileText,
  Loader2, MessageCircle, X, Filter, Sparkles, Trash2, ArrowRight
} from 'lucide-react'
import LeetCodeIcon from './LeetCodeIcon'
import { timeAgo, getDisplayTitle, getDisplayUrl, getDisplayDifficulty } from '../hooks/useCommunityQuestions'
import './CommunityQuestionsHub.css'

const difficultyOptions = ['Easy', 'Medium', 'Hard']

function AddQuestionPanel({
  onAdd,
  onFetchLeetcode,
  fetchingLeetcode,
  addingQuestion,
  companies,
  isClaimed,
  onOpenProfile,
}) {
  const [expanded, setExpanded] = useState(true)
  const [mode, setMode] = useState('leetcode') // 'leetcode' | 'custom'
  const [leetcodeNum, setLeetcodeNum] = useState('')
  const [leetcodePreview, setLeetcodePreview] = useState(null)
  const [customTitle, setCustomTitle] = useState('')
  const [customUrl, setCustomUrl] = useState('')
  const [customDifficulty, setCustomDifficulty] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [driveName, setDriveName] = useState('')
  const [description, setDescription] = useState('')
  const [feedback, setFeedback] = useState('')
  const [showCompanySuggestions, setShowCompanySuggestions] = useState(false)

  const filteredCompanies = useMemo(() => {
    if (!companyName.trim()) return []
    return companies.filter(c =>
      c.toLowerCase().includes(companyName.trim().toLowerCase())
    ).slice(0, 5)
  }, [companyName, companies])

  const handleFetchLeetcode = async () => {
    setFeedback('')
    setLeetcodePreview(null)
    const result = await onFetchLeetcode(leetcodeNum)
    if (result?.found) {
      setLeetcodePreview(result)
      setFeedback('')
    } else if (result?.ok === false && result?.error) {
      setFeedback(result.error.message || 'Could not fetch.')
    } else {
      setFeedback(`Problem #${leetcodeNum} not found on LeetCode.`)
    }
  }

  const handleSubmit = async () => {
    if (!isClaimed) {
      onOpenProfile?.()
      return
    }

    setFeedback('')
    let questionData = {}

    if (mode === 'leetcode') {
      if (!leetcodePreview) {
        setFeedback('Fetch the problem first.')
        return
      }
      questionData = {
        leetcodeNumber: parseInt(leetcodeNum, 10),
        leetcodeTitle: leetcodePreview.title,
        leetcodeUrl: leetcodePreview.url,
        leetcodeDifficulty: leetcodePreview.difficulty,
        companyName,
        driveName,
        description,
      }
    } else {
      if (!customTitle.trim()) {
        setFeedback('Enter a question title.')
        return
      }
      questionData = {
        customTitle: customTitle.trim(),
        customUrl: customUrl.trim(),
        customDifficulty: customDifficulty || null,
        companyName,
        driveName,
        description,
      }
    }

    const result = await onAdd(questionData)
    if (result?.ok) {
      setLeetcodeNum('')
      setLeetcodePreview(null)
      setCustomTitle('')
      setCustomUrl('')
      setCustomDifficulty('')
      setCompanyName('')
      setDriveName('')
      setDescription('')
      setFeedback('Question added!')
      setTimeout(() => setFeedback(''), 2500)
    } else {
      setFeedback(result?.error?.message || 'Failed to add question.')
    }
  }

  return (
    <div className="add-question-panel">
      <button
        className={`add-question-toggle ${expanded ? 'is-expanded' : ''}`}
        type="button"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="add-toggle-left">
          <span className="add-toggle-icon">
            <Plus size={16} />
          </span>
          <span>Add a question from your interview</span>
        </div>
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            className="add-question-form"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="add-form-inner">
              {/* Mode toggle */}
              <div className="mode-toggle">
                <button
                  className={mode === 'leetcode' ? 'is-active' : ''}
                  onClick={() => { setMode('leetcode'); setFeedback('') }}
                >
                  <LeetCodeIcon size={14} />
                  LeetCode Problem
                </button>
                <button
                  className={mode === 'custom' ? 'is-active' : ''}
                  onClick={() => { setMode('custom'); setFeedback('') }}
                >
                  <FileText size={14} />
                  Custom Question
                </button>
              </div>

              {/* LeetCode mode */}
              {mode === 'leetcode' && (
                <div className="leetcode-fetch-row">
                  <div className="leetcode-input-group">
                    <LeetCodeIcon size={14} />
                    <input
                      type="number"
                      min="1"
                      value={leetcodeNum}
                      onChange={e => { setLeetcodeNum(e.target.value); setLeetcodePreview(null) }}
                      placeholder="Problem number (e.g. 1234)"
                      onKeyDown={e => e.key === 'Enter' && handleFetchLeetcode()}
                    />
                  </div>
                  <button
                    className="fetch-btn"
                    type="button"
                    onClick={handleFetchLeetcode}
                    disabled={fetchingLeetcode || !leetcodeNum}
                  >
                    {fetchingLeetcode ? <Loader2 size={14} className="spinner" /> : <Search size={14} />}
                    {fetchingLeetcode ? 'Fetching...' : 'Fetch'}
                  </button>
                </div>
              )}

              {/* LeetCode preview */}
              {mode === 'leetcode' && leetcodePreview && (
                <motion.div
                  className="leetcode-preview"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Check size={14} className="preview-check" />
                  <div className="preview-info">
                    <strong>{leetcodePreview.title}</strong>
                    <span className={`difficulty-chip ${(leetcodePreview.difficulty || '').toLowerCase()}`}>
                      {leetcodePreview.difficulty}
                    </span>
                  </div>
                  <a href={leetcodePreview.url} target="_blank" rel="noopener noreferrer" className="preview-link">
                    <ExternalLink size={12} />
                  </a>
                </motion.div>
              )}

              {/* Custom mode */}
              {mode === 'custom' && (
                <div className="custom-fields">
                  <div className="field-group">
                    <input
                      value={customTitle}
                      onChange={e => setCustomTitle(e.target.value)}
                      placeholder="Question title"
                    />
                  </div>
                  <div className="custom-row">
                    <input
                      value={customUrl}
                      onChange={e => setCustomUrl(e.target.value)}
                      placeholder="URL (GFG, CodeChef, etc.) — optional"
                    />
                    <select value={customDifficulty} onChange={e => setCustomDifficulty(e.target.value)}>
                      <option value="">Difficulty</option>
                      {difficultyOptions.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {/* Company + Drive */}
              <div className="company-row">
                <div className="company-input-wrap">
                  <Building2 size={14} />
                  <input
                    value={companyName}
                    onChange={e => { setCompanyName(e.target.value); setShowCompanySuggestions(true) }}
                    onFocus={() => setShowCompanySuggestions(true)}
                    onBlur={() => setTimeout(() => setShowCompanySuggestions(false), 150)}
                    placeholder="Company name"
                  />
                  {showCompanySuggestions && filteredCompanies.length > 0 && (
                    <div className="company-suggestions">
                      {filteredCompanies.map(c => (
                        <button key={c} type="button" onMouseDown={() => { setCompanyName(c); setShowCompanySuggestions(false) }}>
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="drive-input-wrap">
                  <Briefcase size={14} />
                  <input
                    value={driveName}
                    onChange={e => setDriveName(e.target.value)}
                    placeholder="Drive / Round (optional)"
                  />
                </div>
              </div>

              {/* Description */}
              <textarea
                className="desc-input"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Any extra context? (optional)"
                rows={2}
              />

              {/* Submit */}
              <div className="add-actions">
                <button
                  className="add-submit"
                  type="button"
                  onClick={handleSubmit}
                  disabled={addingQuestion}
                >
                  {addingQuestion ? <Loader2 size={14} className="spinner" /> : <Plus size={14} />}
                  {!isClaimed ? 'Claim Profile to Add' : addingQuestion ? 'Adding...' : 'Add to Community'}
                </button>
              </div>

              {feedback && (
                <p className={`add-feedback ${feedback.includes('added') ? 'is-success' : ''}`}>
                  {feedback}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function QuestionCard({ question, userId, onDelete }) {
  const title = getDisplayTitle(question)
  const url = getDisplayUrl(question)
  const diff = getDisplayDifficulty(question)
  const author = question.author
  const isAuthor = userId && question.added_by === userId
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async (e) => {
    e.stopPropagation()
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return
    setDeleting(true)
    const result = await onDelete?.(question.id)
    if (!result?.ok) {
      setDeleting(false)
    }
  }

  return (
    <motion.div
      className="question-card"
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <div className="q-content">
        <div className="q-title-row">
          {url ? (
            <a href={url} target="_blank" rel="noopener noreferrer" className="q-title">
              {title}
              <ExternalLink size={12} />
            </a>
          ) : (
            <span className="q-title no-link">{title}</span>
          )}
          {diff && (
            <span className={`difficulty-chip ${diff.toLowerCase()}`}>{diff}</span>
          )}
        </div>

        <div className="q-meta">
          {question.company_name && (
            <span className="q-tag company-tag">
              <Building2 size={10} />
              {question.company_name}
            </span>
          )}
          {question.drive_name && (
            <span className="q-tag drive-tag">
              <Briefcase size={10} />
              {question.drive_name}
            </span>
          )}
          {question.leetcode_number && (
            <span className="q-tag lc-tag">
              <LeetCodeIcon size={10} />
              LC {question.leetcode_number}
            </span>
          )}
        </div>

        {question.description && (
          <p className="q-desc">{question.description}</p>
        )}

        <div className="q-footer">
          <span className="q-author">
            {author?.avatar_url ? (
              <img src={author.avatar_url} alt="" />
            ) : (
              <span className="q-author-initial">{(author?.username || '?').charAt(0).toUpperCase()}</span>
            )}
            Contributed by <strong>{author?.username || 'Anonymous'}</strong>
          </span>
          <div className="q-footer-right">
            <span className="q-time">{timeAgo(question.created_at)}</span>
            {isAuthor && onDelete && (
              <button
                type="button"
                className="q-delete-btn"
                onClick={handleDelete}
                disabled={deleting}
                title="Delete this question"
                aria-label="Delete question"
              >
                <Trash2 size={12} />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ChatFeed({ messages, onSend, sendingMessage, chatLoading, isClaimed, onOpenProfile, userId }) {
  const [text, setText] = useState('')
  const [chatFeedback, setChatFeedback] = useState('')
  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  const handleSend = async () => {
    if (!isClaimed) {
      onOpenProfile?.()
      return
    }
    setChatFeedback('')
    const result = await onSend(text)
    if (result?.ok) {
      setText('')
    } else {
      setChatFeedback(result?.error?.message || 'Failed to send.')
    }
  }

  return (
    <div className="chat-section">
      <div className="chat-header">
        <MessageCircle size={16} />
        <h3>Discussion</h3>
        <span className="chat-count">{messages.length}</span>
      </div>

      <div className="chat-feed">
        {chatLoading ? (
          <div className="chat-empty">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="chat-empty">
            <MessageCircle size={20} />
            <p>No messages yet. Start the discussion!</p>
          </div>
        ) : (
          messages.map(msg => {
            const author = msg.author
            const isMe = msg.user_id === userId
            return (
              <div key={msg.id} className={`chat-msg ${isMe ? 'is-mine' : ''}`}>
                <div className="msg-avatar">
                  {author?.avatar_url ? (
                    <img src={author.avatar_url} alt="" />
                  ) : (
                    <span>{(author?.username || '?').charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div className="msg-body">
                  <div className="msg-head">
                    <strong>{author?.username || 'Anonymous'}</strong>
                    <span>{timeAgo(msg.created_at)}</span>
                  </div>
                  <p className="msg-text">{msg.message}</p>
                </div>
              </div>
            )
          })
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-input-bar">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={isClaimed ? 'Share your experience...' : 'Claim profile to chat'}
          disabled={!isClaimed}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
        />
        <button
          className="chat-send"
          type="button"
          onClick={handleSend}
          disabled={sendingMessage || !text.trim()}
        >
          {sendingMessage ? <Loader2 size={14} className="spinner" /> : <Send size={14} />}
        </button>
      </div>
      {chatFeedback && <p className="chat-feedback">{chatFeedback}</p>}
    </div>
  )
}

export default function CommunityQuestionsHub({
  questions,
  messages,
  companies,
  loading,
  chatLoading,
  addingQuestion,
  sendingMessage,
  fetchingLeetcode,
  isChecked,
  onAddQuestion,
  onToggleCheck,
  onSendMessage,
  onFetchLeetcode,
  isClaimed,
  onOpenProfile,
  userId,
  onExploreCommunity,
  onDeleteQuestion,
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterDifficulty, setFilterDifficulty] = useState('')
  const [filterCompany, setFilterCompany] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const title = getDisplayTitle(q).toLowerCase()
      const diff = getDisplayDifficulty(q)

      if (searchQuery.trim() && !title.includes(searchQuery.trim().toLowerCase())) return false
      if (filterDifficulty && diff !== filterDifficulty) return false
      if (filterCompany && q.company_name !== filterCompany) return false

      return true
    })
  }, [questions, searchQuery, filterDifficulty, filterCompany])

  const uniqueCompanies = useMemo(() => {
    const set = new Set(questions.map(q => q.company_name).filter(Boolean))
    return [...set].sort()
  }, [questions])

  const hasActiveFilters = filterDifficulty || filterCompany

  return (
    <div className="questions-hub">
      {/* Main content: Add + Questions left, Chat right */}
      <div className="hub-content">
        <div className="hub-left">

          <AddQuestionPanel
            onAdd={onAddQuestion}
            onFetchLeetcode={onFetchLeetcode}
            fetchingLeetcode={fetchingLeetcode}
            addingQuestion={addingQuestion}
            companies={companies}
            isClaimed={isClaimed}
            onOpenProfile={onOpenProfile}
          />



          {/* Question cards — 2-column grid, limited to 10 */}
          <div className="questions-list">
            {loading ? (
              <div className="feed-empty">
                <Loader2 size={20} className="spinner" />
                <p>Loading questions...</p>
              </div>
            ) : filteredQuestions.length === 0 && questions.length > 0 ? (
              <div className="feed-empty">
                <Search size={20} />
                <p>No matching questions.</p>
              </div>
            ) : (
              filteredQuestions.slice(0, 10).map(q => (
                <QuestionCard
                  key={q.id}
                  question={q}
                  userId={userId}
                  onDelete={onDeleteQuestion}
                />
              ))
            )}
          </div>

          {/* Explore more button */}
          {filteredQuestions.length > 10 && onExploreCommunity && (
            <button
              type="button"
              className="explore-more-btn"
              onClick={onExploreCommunity}
            >
              Explore all {questions.length} questions in Community
              <ArrowRight size={16} />
            </button>
          )}
          {filteredQuestions.length > 0 && filteredQuestions.length <= 10 && onExploreCommunity && (
            <button
              type="button"
              className="explore-more-btn explore-more-subtle"
              onClick={onExploreCommunity}
            >
              Open Community Questions chapter
              <ArrowRight size={16} />
            </button>
          )}
        </div>

        {/* Chat feed - right column */}
        <ChatFeed
          messages={messages}
          onSend={onSendMessage}
          sendingMessage={sendingMessage}
          chatLoading={chatLoading}
          isClaimed={isClaimed}
          onOpenProfile={onOpenProfile}
          userId={userId}
        />
      </div>
    </div>
  )
}
