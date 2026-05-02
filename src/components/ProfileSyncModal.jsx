import { useEffect, useMemo, useState } from 'react'
import { Camera, Check, Copy, KeyRound, Link2, LogIn, Moon, RotateCcw, Share2, Sparkles, Sun, Trash2, UserRound, X } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import './ProfileSyncModal.css'

function buildSyncLink(syncCode) {
  if (!syncCode || typeof window === 'undefined') return ''
  const url = new URL(window.location.origin + window.location.pathname)
  url.searchParams.set('sync', syncCode)
  return url.toString()
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

async function createAvatarDataUrl(file) {
  if (!file || !/^image\/(png|jpe?g|webp)$/i.test(file.type)) {
    throw new Error('Use a PNG, JPG, or WebP image.')
  }

  const source = await readFileAsDataUrl(file)
  const image = await new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = source
  })

  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')
  ctx.imageSmoothingQuality = 'high'
  const size = Math.min(image.width, image.height)
  const sx = Math.max(0, (image.width - size) / 2)
  const sy = Math.max(0, (image.height - size) / 2)
  ctx.drawImage(image, sx, sy, size, size, 0, 0, 512, 512)
  return canvas.toDataURL('image/webp', 0.88)
}

export default function ProfileSyncModal({
  open,
  initialMode = 'welcome',
  profile,
  onClose,
  onClaim,
  onConnect,
  onFindProfiles,
  onRename,
  onOptInChange,
  onUploadAvatar,
  onStartFresh,
}) {
  const { theme, toggleTheme } = useTheme()
  const [mode, setMode] = useState(initialMode)
  const [name, setName] = useState(profile?.username && profile.username !== 'Private pilot' ? profile.username : '')
  const [code, setCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [avatarBusy, setAvatarBusy] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [profileMatches, setProfileMatches] = useState([])
  const [profileLookupBusy, setProfileLookupBusy] = useState(false)
  const [pendingAvatarDataUrl, setPendingAvatarDataUrl] = useState('')
  const [leaderboardOptIn, setLeaderboardOptInState] = useState(true)

  const syncLink = useMemo(() => buildSyncLink(profile?.syncCode), [profile?.syncCode])

  useEffect(() => {
    if (open) {
      setMode(profile?.claimed && initialMode === 'welcome' ? 'manage' : initialMode)
      setName(profile?.username && profile.username !== 'Private pilot' ? profile.username : '')
      setPendingAvatarDataUrl('')
      setLeaderboardOptInState(profile?.claimed ? Boolean(profile.leaderboardOptIn) : true)
      setFeedback('')
      setProfileMatches([])
    }
  }, [open, initialMode, profile?.claimed, profile?.leaderboardOptIn, profile?.username])

  useEffect(() => {
    if (!open || mode !== 'claim' || !name.trim() || !onFindProfiles) {
      setProfileMatches([])
      return undefined
    }

    const timer = window.setTimeout(async () => {
      setProfileLookupBusy(true)
      const result = await onFindProfiles(name)
      setProfileLookupBusy(false)
      setProfileMatches(result?.profiles || [])
    }, 350)

    return () => window.clearTimeout(timer)
  }, [mode, name, onFindProfiles, open])

  if (!open) return null

  const copyText = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text)
      setFeedback(`${label} copied.`)
    } catch {
      setFeedback(text)
    }
  }

  const claim = async () => {
    setBusy(true)
    setFeedback('')
    const result = await onClaim({ username: name, leaderboardOptIn })
    if (result?.ok) {
      let avatarResult = null
      if (pendingAvatarDataUrl && onUploadAvatar) {
        setAvatarBusy(true)
        avatarResult = await onUploadAvatar(pendingAvatarDataUrl, result.profile)
        setAvatarBusy(false)
      }
      setBusy(false)
      setMode('manage')
      setPendingAvatarDataUrl('')
      setFeedback(result?.localOnly
        ? 'Profile saved here. Add Supabase setup to sync publicly.'
        : avatarResult && !avatarResult.ok
          ? avatarResult.error?.message || 'Profile created, but photo upload failed.'
          : leaderboardOptIn
            ? 'Profile published.'
            : 'Private sync profile created.')
    } else if (!name.trim()) {
      setBusy(false)
      setFeedback('Enter a display name.')
    } else {
      setBusy(false)
      setFeedback(result?.error?.message || 'Could not create profile yet.')
    }
  }

  const connect = async () => {
    setBusy(true)
    setFeedback('')
    const result = await onConnect(code)
    setBusy(false)
    if (result?.ok) {
      setMode('manage')
      setFeedback('This device is connected.')
    } else {
      setFeedback('That sync code was not found.')
    }
  }

  const chooseExistingProfile = (match) => {
    setName(match?.username || name)
    setCode('')
    setMode('connect')
    setFeedback('Paste that profile sync code to connect safely.')
  }

  const rename = async () => {
    setBusy(true)
    const result = await onRename(name)
    setBusy(false)
    if (result?.ok && profile?.avatarUrl) {
      onClose()
      return
    }
    setFeedback(result?.ok ? 'Name saved.' : 'Enter a valid name.')
  }

  const handleAvatarFile = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    try {
      setAvatarBusy(true)
      setFeedback('')
      const avatarDataUrl = await createAvatarDataUrl(file)
      if (!profile?.claimed) {
        setPendingAvatarDataUrl(avatarDataUrl)
        setFeedback('Photo ready.')
        return
      }
      const result = await onUploadAvatar(avatarDataUrl)
      setFeedback(result?.ok ? 'Avatar updated.' : result?.error?.message || 'Avatar upload failed.')
    } catch (err) {
      setFeedback(err?.message || 'Avatar upload failed.')
    } finally {
      setAvatarBusy(false)
    }
  }

  const removeAvatar = async () => {
    if (!profile?.claimed) {
      setPendingAvatarDataUrl('')
      setFeedback('Photo removed.')
      return
    }
    setAvatarBusy(true)
    const result = await onUploadAvatar(null)
    setAvatarBusy(false)
    setFeedback(result?.ok ? 'Avatar removed.' : result?.error?.message || 'Avatar remove failed.')
  }

  const startFresh = () => {
    onStartFresh()
    setMode('welcome')
    setName('')
    setCode('')
    setPendingAvatarDataUrl('')
    setFeedback('Fresh local profile ready.')
  }

  const avatarPreview = profile?.claimed ? profile.avatarUrl : pendingAvatarDataUrl
  const avatarInitial = (name || profile?.username || 'P').charAt(0).toUpperCase()

  return (
    <div className="profile-modal-layer" role="presentation">
      <section className={`profile-modal profile-modal-${mode}`} role="dialog" aria-modal="true" aria-label="Profile sync">
        <button className="profile-close" type="button" onClick={onClose} aria-label="Close profile sync">
          <X size={17} />
        </button>
        <button
          className="profile-theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
          <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
        </button>
        {profile?.claimed && mode === 'manage' && (
          <button className="profile-back" type="button" onClick={startFresh} aria-label="Start fresh profile">
            <RotateCcw size={15} />
            <span>Reset</span>
          </button>
        )}

        <div className="profile-modal-hero">
          <span className="profile-orb"><Sparkles size={18} /></span>
          <p className="eyebrow">Profile sync</p>
          <h2>{mode === 'connect' ? 'Connect this device' : mode === 'claim' ? 'Create your profile' : profile?.claimed ? 'Your cockpit profile' : 'Keep your DSA progress yours'}</h2>
          <p>
            {mode === 'welcome'
              ? 'Create one cached profile for this browser, or restore an existing profile with a sync code.'
              : 'Sync across devices and appear on the global leaderboard only when you allow it.'}
          </p>
        </div>

        {mode === 'welcome' && !profile?.claimed && (
          <div className="profile-choice-grid">
            <button type="button" onClick={() => setMode('claim')}>
              <UserRound size={18} />
              <strong>Join leaderboard</strong>
              <span>Add your name and photo. You choose public or private before joining.</span>
            </button>
            <button type="button" onClick={() => setMode('connect')}>
              <KeyRound size={18} />
              <strong>Join with code</strong>
              <span>Open your same profile on a new phone, tablet, or desktop.</span>
            </button>
          </div>
        )}

        {(mode === 'claim' || mode === 'manage') && (
          <div className="profile-form">
            <label>
              <span>Display name</span>
              <input value={name} onChange={event => setName(event.target.value)} placeholder="Your leaderboard name" maxLength={32} />
            </label>

            {!profile?.claimed ? (
              <>
                <div className="avatar-panel avatar-panel-claim">
                  <div className="avatar-preview">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt={`${name || 'Profile'} avatar preview`} />
                    ) : (
                      <span>{avatarInitial}</span>
                    )}
                  </div>
                  <div className="avatar-copy">
                    <span className="sync-label">Profile photo</span>
                    <strong>{avatarPreview ? 'Photo selected' : 'Add a photo'}</strong>
                    <p>A square-friendly PNG, JPG, or WebP looks best on the leaderboard.</p>
                    <div className="avatar-actions">
                      <label className="avatar-upload">
                        <Camera size={14} />
                        {avatarBusy ? 'Preparing...' : avatarPreview ? 'Replace photo' : 'Upload photo'}
                        <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleAvatarFile} disabled={avatarBusy} />
                      </label>
                      {avatarPreview && (
                        <button type="button" onClick={removeAvatar} disabled={avatarBusy}>
                          <Trash2 size={14} /> Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <label className={`publish-toggle publish-toggle-large ${leaderboardOptIn ? 'is-on' : ''}`}>
                  <input
                    type="checkbox"
                    checked={leaderboardOptIn}
                    onChange={event => setLeaderboardOptInState(event.target.checked)}
                  />
                  <span>
                    <strong>{leaderboardOptIn ? 'Show on leaderboard' : 'Keep profile private'}</strong>
                    <em>{leaderboardOptIn ? 'Your name, photo, and stats can rank publicly.' : 'Sync works, but public ranking stays hidden.'}</em>
                  </span>
                </label>

                {(profileLookupBusy || profileMatches.length > 0) && (
                  <div className="profile-match-panel">
                    <span className="sync-label">Existing public profiles</span>
                    {profileLookupBusy ? (
                      <p>Checking leaderboard profiles...</p>
                    ) : (
                      profileMatches.map(match => (
                        <button key={match.id} type="button" onClick={() => chooseExistingProfile(match)}>
                          <span className="match-avatar">
                            {match.avatar_url ? (
                              <img src={match.avatar_url} alt={`${match.username || 'Profile'} avatar`} />
                            ) : (
                              <span>{(match.username || 'P').charAt(0).toUpperCase()}</span>
                            )}
                          </span>
                          <span>
                            <strong>{match.username}</strong>
                            <em>{match.total_solved || 0} solved</em>
                          </span>
                          <small>Enter</small>
                        </button>
                      ))
                    )}
                  </div>
                )}

                <div className="profile-actions-row">
                  <button className="profile-primary" type="button" disabled={busy || avatarBusy} onClick={claim}>
                    <Share2 size={16} />
                    {busy || avatarBusy ? 'Creating...' : leaderboardOptIn ? 'Join leaderboard' : 'Create private sync'}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="avatar-panel">
                  <div className="avatar-preview">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt={`${profile.username || 'Profile'} avatar`} />
                    ) : (
                      <span>{avatarInitial}</span>
                    )}
                  </div>
                  <div className="avatar-copy">
                    <span className="sync-label">Profile photo</span>
                    <strong>Make it yours</strong>
                    <p>Square PNG, JPG, or WebP. We crop and resize it before upload.</p>
                    <div className="avatar-actions">
                      <label className="avatar-upload">
                        <Camera size={14} />
                        {avatarBusy ? 'Uploading...' : profile.avatarUrl ? 'Replace photo' : 'Upload photo'}
                        <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleAvatarFile} disabled={avatarBusy} />
                      </label>
                      {profile.avatarUrl && (
                        <button type="button" onClick={removeAvatar} disabled={avatarBusy}>
                          <Trash2 size={14} /> Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="sync-card">
                  <span className="sync-label">Your sync code</span>
                  <strong>{profile.syncCode}</strong>
                  <div>
                    <button type="button" onClick={() => copyText(profile.syncCode, 'Sync code')}>
                      <Copy size={14} /> Copy code
                    </button>
                    <button type="button" onClick={() => copyText(syncLink, 'Sync link')}>
                      <Link2 size={14} /> Copy link
                    </button>
                  </div>
                </div>

                <div className="profile-actions-row">
                  <button className="profile-primary" type="button" onClick={rename}>
                    <Check size={16} />
                    {profile.avatarUrl ? 'Done' : 'Save name'}
                  </button>
                  <button className="profile-secondary" type="button" onClick={startFresh}>
                    <RotateCcw size={16} />
                    Start fresh
                  </button>
                  <label className={`publish-toggle ${profile.leaderboardOptIn ? 'is-on' : ''}`}>
                    <input
                      type="checkbox"
                      checked={Boolean(profile.leaderboardOptIn)}
                      onChange={event => onOptInChange(event.target.checked)}
                    />
                    <span>Show on leaderboard</span>
                  </label>
                </div>
              </>
            )}
          </div>
        )}

        {mode === 'connect' && (
          <div className="profile-form">
            <label>
              <span>Sync code</span>
              <input value={code} onChange={event => setCode(event.target.value.toUpperCase())} placeholder="DSA-ABCD-1234-WXYZ" />
            </label>
            <button className="profile-primary" type="button" disabled={busy} onClick={connect}>
              <LogIn size={16} />
              Connect profile
            </button>
          </div>
        )}

        {feedback && <p className="profile-feedback">{feedback}</p>}
      </section>
    </div>
  )
}
