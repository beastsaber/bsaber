export const prerender = false

type BeatSaverPlaylist = {
  id: number
  name: string
  maps: Array<{
    map: {
      id: string
      name: string
      versions?: Array<{ coverURL?: string }>
    }
  }>
}

export async function load({ fetch }) {
  const playlistId = 1020231
  const url = `https://api.beatsaver.com/playlists/id/${playlistId}/0`

  let json: BeatSaverPlaylist | null = null
  try {
    const res = await fetch(url, { headers: { accept: 'application/json' } })
    if (!res.ok) throw new Error(`BeatSaver responded ${res.status}`)
    json = (await res.json()) as BeatSaverPlaylist
  } catch (e) {
    console.error('BeatSaver fetch failed:', e)
  }

  const maps = json?.maps ?? []
  const getMap = (i: number) => maps[i]?.map

  const days = Array.from({ length: 24 }, (_, i) => {
    const m = getMap(i)
    const cover = m?.versions?.[0]?.coverURL ?? undefined
    return {
      number: i + 1,
      title: m.name,
      url: m ? `https://beatsaver.com/maps/${m.id}` : '#',
      cover,
    }
  })

  const bonus = Array.from({ length: Math.max(0, maps.length - 24) }, (_, i) => {
    const m = getMap(24 + i)
    const cover = m?.versions?.[0]?.coverURL ?? undefined
    return {
      label: `Bonus ${i + 1}`,
      title: m ? m.name : `Bonus — Coming soon`,
      url: m ? `https://beatsaver.com/maps/${m.id}` : '#',
      cover,
    }
  })

  const credits = [
    {
      name: '@threedotwav',
      role: 'Ado Sabers',
      url: 'https://discord.com/users/620821427779534858',
      photo: '/uploads/playlists/threedotwav.jpg',
      alt: 'threedotwav',
    },
    {
      name: '@Rize2296',
      role: 'Cover Illustration',
      url: 'https://x.com/rize2296',
      photo: 'https://pbs.twimg.com/profile_images/1901783844564635648/YoHcvjR9_400x400.jpg',
      alt: 'Rize2296',
    },
    {
      name: '@_NiKOV_',
      role: 'Cover Animation',
      url: 'https://x.com/_NiKOV_',
      photo: 'https://pbs.twimg.com/profile_images/1963770249859538944/ced7jTJS_400x400.jpg',
      alt: '_NiKOV_',
    },
    {
      name: '@blametofu',
      role: 'Cover Background',
      url: 'https://beatsaver.com/profile/4284377',
      photo: 'https://cdn.beatsaver.com/avatar/1c57aa441461f5badffe321b2218c35f71f24b9a.png',
      alt: 'blametofu',
    },
  ]

  return {
    playlistId,
    playlistName: json?.name ?? 'ADOvent Calendar Pack',
    days,
    bonus,
    credits,
  }
}
