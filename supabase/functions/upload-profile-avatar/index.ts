import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  })
}

async function digestSyncCode(syncCode: string) {
  const normalized = syncCode.trim().toUpperCase()
  const input = new TextEncoder().encode(normalized)
  const hash = await crypto.subtle.digest('SHA-256', input)
  return Array.from(new Uint8Array(hash))
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('')
}

function dataUrlToBytes(dataUrl: string) {
  const match = dataUrl.match(/^data:(image\/(?:webp|png|jpeg));base64,(.+)$/)
  if (!match) {
    throw new Error('Avatar must be a PNG, JPG, or WebP data URL.')
  }

  const [, mimeType, payload] = match
  const binary = atob(payload)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i)
  }

  if (bytes.byteLength > 2 * 1024 * 1024) {
    throw new Error('Avatar is too large.')
  }

  return { bytes, mimeType }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405)
  }

  try {
    const supabaseUrl =
      Deno.env.get('SUPABASE_URL') ||
      Deno.env.get('PROJECT_URL') ||
      Deno.env.get('SB_PROJECT_URL')
    const serviceRoleKey =
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ||
      Deno.env.get('SERVICE_ROLE_KEY') ||
      Deno.env.get('SB_SERVICE_ROLE_KEY')

    if (!supabaseUrl || !serviceRoleKey) {
      return jsonResponse({ error: 'Function is missing project URL or service role key secrets.' }, 500)
    }

    const { profileId, syncCode, avatarDataUrl } = await req.json()

    if (!profileId || !syncCode) {
      return jsonResponse({ error: 'profileId and syncCode are required.' }, 400)
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    })

    const { data: profile, error: profileError } = await supabase
      .from('community_profiles')
      .select('id, sync_code_hash, avatar_path')
      .eq('id', profileId)
      .single()

    if (profileError || !profile) {
      return jsonResponse({ error: 'Profile not found.' }, 404)
    }

    const syncHash = await digestSyncCode(syncCode)
    if (profile.sync_code_hash !== syncHash) {
      return jsonResponse({ error: 'Invalid sync code.' }, 403)
    }

    let avatarUrl = ''
    let avatarPath = ''

    if (avatarDataUrl) {
      const { bytes, mimeType } = dataUrlToBytes(String(avatarDataUrl))
      avatarPath = `${profileId}/avatar.webp`

      const { error: uploadError } = await supabase.storage
        .from('profile-avatars')
        .upload(avatarPath, bytes, {
          contentType: mimeType,
          upsert: true,
        })

      if (uploadError) {
        return jsonResponse({ error: uploadError.message }, 400)
      }

      const { data: publicData } = supabase.storage
        .from('profile-avatars')
        .getPublicUrl(avatarPath)

      avatarUrl = publicData?.publicUrl ? `${publicData.publicUrl}?v=${Date.now()}` : ''
    } else if (profile.avatar_path) {
      await supabase.storage.from('profile-avatars').remove([profile.avatar_path])
    }

    const { data: updatedProfile, error: updateError } = await supabase
      .from('community_profiles')
      .update({
        avatar_url: avatarUrl || null,
        avatar_path: avatarPath || null,
        avatar_updated_at: avatarUrl ? new Date().toISOString() : null,
        last_active: new Date().toISOString(),
      })
      .eq('id', profileId)
      .select('avatar_url, avatar_path')
      .single()

    if (updateError) {
      return jsonResponse({ error: updateError.message }, 400)
    }

    return jsonResponse({
      avatarUrl: updatedProfile?.avatar_url || '',
      avatarPath: updatedProfile?.avatar_path || '',
    })
  } catch (err) {
    return jsonResponse({ error: err instanceof Error ? err.message : 'Avatar upload failed.' }, 500)
  }
})
