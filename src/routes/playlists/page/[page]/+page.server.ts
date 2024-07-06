import { paginateArray } from '$lib/paginateArray'
import { retrieveAllCollectionDataOfType } from '$lib/retrieveCollectionData'
import type { FeaturedPlaylistOverwriteCollectionData, Playlist } from '../../../../types'

const pageSize = 20

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

  const featuredMapsForPage = await fetch(
    `${
      import.meta.env.VITE_BSABER_API_BASE ?? 'https://api.beatsaver.com'
    }/playlists/search/${pageNumber}?sortOrder=Latest&curated=true`,
  ).then((x: any) => x.json())

  const { paginatedArray: paginatedFeaturedPlaylists, pageCount } = paginateArray(
    featuredMapsForPage,
    pageSize,
    pageNumber,
  )

  const featuredPlaylistOverwrites = await retrieveAllCollectionDataOfType(
    'featured-playlist-overwrites',
  )
  const featuredPlaylistOverwriteMap = Object.fromEntries(
    featuredPlaylistOverwrites.map((x) => [x.attributes.id, x.attributes]),
  )

  return {
    playlists: paginatedFeaturedPlaylists as Playlist[],
    currentPage: pageNumber,
    pageSize,
    pageCount,
    featuredPlaylistOverwriteMap,
  }
}
