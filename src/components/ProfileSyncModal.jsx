import { useEffect, useMemo, useState } from 'react'
import { Camera, Check, Copy, KeyRound, Link2, Lock, LogIn, RotateCcw, Share2, Sparkles, Trash2, UserRound, X } from 'lucide-react'
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

  const size = Math.min(image.width, image.height)
  const sx = Math.max(0, (image.width - size) / 2)
  const sy = Math.max(0, (image.height - size) / 2)
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(image, sx, sy, size, size, 0, 0, 512, 512)
  return canvas.toDataURL('image/webp', 0.88)
}

export default function ProfileSyncModal({
  open,
  initialMode = 'welcome',
  profile,
  stats,
  onClose,
  onClaim,
  onConnect,
  onRename,
  onOptInChange,
  onUploadAvatar,
  onContinuePrivate,
  onStartFresh,
}) {
  const [mode, setMode] = useState(initialMode)
  const [name, setName] = useState(profile?.username && profile.username !== 'Private pilot' ? profile.username : '')
  const [code, setCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [avatarBusy, setAvatarBusy] = useState(false)
  const [feedback, setFeedback] = useState('')

  const syncLink = useMemo(() => buildSyncLink(profile?.syncCode), [profile?.syncCode])

  useEffect(() => {
    if (open) {
      setMode(profile?.claimed && initialMode === 'welcome' ? 'manage' : initialMode)
      setName(profile?.username && profile.username !== 'Private pilot' ? profile.username : '')
      setFeedback('')
    }
  }, [open, initialMode, profile?.claimed, profile?.username])

  if (!open) return null

  const copyText = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text)
      setFeedback(`${label} copied.`)
    } catch {
      setFeedback(text)
    }
  }

  const claim = async (leaderboardOptIn = true) => {
    setBusy(true)
    setFeedback('')
    const result = await onClaim({ username: name, leaderboardOptIn })
    setBusy(false)
    if (result?.ok) {
      setMode('manage')
      setFeedback(leaderboardOptIn ? 'Profile published.' : 'Private sync profile created.')
    } else if (!name.trim()) {
      setFeedback('Enter a display name.')
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
      const result = await onUploadAvatar(avatarDataUrl)
      setFeedback(result?.ok ? 'Avatar updated.' : result?.error?.message || 'Avatar upload failed.')
    } catch (err) {
      setFeedback(err?.message || 'Avatar upload failed.')
    } finally {
      setAvatarBusy(false)
    }
  }

  const removeAvatar = async () => {
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
    setFeedback('Fresh local profile ready.')
  }

  return (
    <div className="profile-modal-layer" role="presentation">
      <section className={`profile-modal profile-modal-${mode}`} role="dialog" aria-modal="true" aria-label="Profile sync">
        <button className="profile-close" type="button" onClick={onClose} aria-label="Close profile sync">
          <X size={17} />
        </button>
        {profile?.claimed && mode === 'manage' && (
          <button className="profile-back" type="button" onClick={startFresh} aria-label="Back to guest mode">
            <RotateCcw size={15} />
            <span>Guest</span>
          </button>
        )}

        <div className="profile-modal-hero">
          <span className="profile-orb"><Sparkles size={18} /></span>
          <p className="eyebrow">Profile sync</p>
          <h2>{mode === 'connect' ? 'Connect this device' : profile?.claimed ? 'Your cockpit profile' : 'Keep your DSA progress yours'}</h2>
          <p>
            Practice privately, or claim one profile that syncs across devices and appears on the global leaderboard only when you allow it.
          </p>
        </div>

        {mode === 'welcome' && !profile?.claimed && (
          <div className="profile-choice-grid">
            <button type="button" onClick={() => setMode('claim')}>
              <UserRound size={18} />
              <strong>{stats?.totalSolved ? 'Use current progress' : 'Join leaderboard'}</strong>
              <span>{stats?.totalSolved ? 'Claim this browser progress publicly.' : 'Name required, public stats enabled.'}</span>
            </button>
            <button type="button" onClick={() => setMode('connect')}>
              <KeyRound size={18} />
              <strong>I have a sync code</strong>
              <span>Load the same profile on this device.</span>
            </button>
            <button type="button" onClick={startFresh}>
              <RotateCcw size={18} />
              <strong>Start fresh</strong>
              <span>Clear local progress and create a new browser profile.</span>
            </button>
            <button type="button" onClick={onContinuePrivate}>
              <Lock size={18} />
              <strong>Continue privately</strong>
              <span>No public row, progress stays on this browser.</span>
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
              <div className="profile-actions-row">
                <button className="profile-primary" type="button" disabled={busy} onClick={() => claim(true)}>
                  <Share2 size={16} />
                  Join leaderboard
                </button>
                <button className="profile-secondary" type="button" disabled={busy} onClick={() => claim(false)}>
                  <Lock size={16} />
                  Private sync
                </button>
              </div>
            ) : (
              <>
                <div className="avatar-panel">
                  <div className="avatar-preview">
                    {profile.avatarUrl ? (
                      <img src={profile.avatarUrl} alt={`${profile.username || 'Profile'} avatar`} />
                    ) : (
                      <span>{(profile.username || 'P').charAt(0).toUpperCase()}</span>
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
                    Back to guest
                  </button>
                  <label className="publish-toggle">
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
