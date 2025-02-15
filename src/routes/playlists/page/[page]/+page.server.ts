import { retrieveAllCollectionDataOfType } from '$lib/retrieveCollectionData'
import type { FeaturedPlaylistOverwriteCollectionData, Playlist } from '../../../../types'
import { beatSaverClientFactory } from '$lib/beatsaver-client'

const pageSize = 20

const overrideFiles = import.meta.glob('/src/collections/playlist-curation-date-override/*.md', {
  eager: true,
})
let curationDateOverrideMap: Record<string, string> = {}
for (const path in overrideFiles) {
  const file = overrideFiles[path] as any
  const { id, curationDateOverride } = file?.metadata ?? {}
  if (id && curationDateOverride) {
    curationDateOverrideMap[id] = curationDateOverride
  }
}

export type FeaturedPlaylistOverviewPageData = {
  playlists: Playlist[]
  currentPage: number
  pageSize: number
  pageCount: number
  featuredPlaylistOverwriteMap: Record<string, FeaturedPlaylistOverwriteCollectionData>
}

type LoadFunctionParameter = {
  params: {
    page: string
  }
  fetch: typeof fetch
}

export const load = async ({
  fetch,
  params,
}: LoadFunctionParameter): Promise<FeaturedPlaylistOverviewPageData> => {
  const pageNumber = parseInt(params.page, 10)
  if (isNaN(pageNumber) || pageNumber < 1 || !isFinite(pageNumber)) {
    throw new Error('Invalid page number')
  }

  const beatSaverClient = beatSaverClientFactory.create(fetch)

  let allPlaylists: Playlist[] = []
  let currentIndex = 0

  while (true) {
    const batch = await beatSaverClient
      .fetch(`/playlists/search/${currentIndex}?sortOrder=Curated&curated=true`)
      .then((res) => res.json())
      .then((json) => json.docs as Playlist[])

    if (!batch || batch.length === 0) {
      break
    }

    allPlaylists.push(...batch)
    currentIndex++

    if (batch.length < pageSize) {
      break
    }
  }

  allPlaylists.forEach((p) => {
    if (curationDateOverrideMap[p.playlistId]) {
      p.curatedAt = curationDateOverrideMap[p.playlistId]
    }
  })

  allPlaylists.sort((a, b) => new Date(b.curatedAt).getTime() - new Date(a.curatedAt).getTime())

  const totalItemCount = allPlaylists.length
  const pageCount = Math.ceil(totalItemCount / pageSize)

  if (pageNumber > pageCount && pageCount > 0) {
    throw new Error('Requested page number is out of range')
  }

  const startIndex = (pageNumber - 1) * pageSize
  const endIndex = startIndex + pageSize
  const thisPagePlaylists = allPlaylists.slice(startIndex, endIndex)

  const featuredPlaylistOverwrites = await retrieveAllCollectionDataOfType(
    'featured-playlist-overwrites',
  )
  const featuredPlaylistOverwriteMap = Object.fromEntries(
    featuredPlaylistOverwrites.map((x) => [x.attributes.id, x.attributes]),
  )

  return {
    playlists: thisPagePlaylists,
    currentPage: pageNumber,
    pageSize,
    pageCount,
    featuredPlaylistOverwriteMap,
  }
}
