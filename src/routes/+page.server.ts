import { getSortedMapsOfTheWeekNetlifyData } from '$lib/getMapsOfTheWeekNetlifyData'
import type {
  Post,
  MapOfTheWeek,
  CommunityEvent,
  ImportPostModuleData,
  FeaturedPlaylistOverwriteCollectionData,
} from '../types'
import { retrieveCommunityEvents } from '$lib/retrieveCommunityEvents'
import { retrieveAllCollectionDataOfType } from '$lib/retrieveCollectionData'
import { beatSaverClientFactory } from '$lib/beatsaver-client'

export type RootPageSSRData = {
  announcements: Post[]
  articles: Post[]
  others: Post[]
  communityEvents: CommunityEvent[]
  currentMapOfTheWeek: MapOfTheWeek | undefined
  featuredPlaylistOverwriteMap: Record<string, FeaturedPlaylistOverwriteCollectionData>
}

interface LoadParameters {
  fetch: typeof fetch
}

export async function load({ fetch }: LoadParameters): Promise<RootPageSSRData> {
  const posts: Post[] = await Promise.all(
    Object.entries(import.meta.glob<ImportPostModuleData>('/src/collections/posts/**/*.md')).map(
      async ([path, module]) => {
        const { metadata } = await module()
        const slug = path.split('/').reverse()[0].split('.')[0]
        const { image } = metadata
        return { slug, ...metadata, image: image?.replace('/static', '') }
      },
    ),
  )

  let currentMapOfTheWeek: MapOfTheWeek | undefined = undefined
  try {
    const mapsOfTheWeek = await getSortedMapsOfTheWeekNetlifyData()

    // Since it's sorted it's the first one
    const currentMOTWCollectionData = mapsOfTheWeek[0]

    const beatSaverClient = beatSaverClientFactory.create(fetch)
    const beatSaverMapData = await beatSaverClient
      .fetch(`/maps/id/${currentMOTWCollectionData.mapId}`)
      .then((res) => res.json())

    const coverUrl =
      currentMOTWCollectionData.coverUrlOverwrite ??
      `https://cdn.assets.beatleader.xyz/songcover-${currentMOTWCollectionData.mapId}-full.webp`

    currentMapOfTheWeek = {
      map: beatSaverMapData,
      coverUrl: coverUrl,
      showcase: currentMOTWCollectionData.showcase,
      review: currentMOTWCollectionData.review,
      startDate: currentMOTWCollectionData.startDate,
    }
  } catch (e) {
    console.error(`Could not find a suitable map of the week.`)
  }

  const rootPageSSRData: Omit<RootPageSSRData, 'currentMapOfTheWeek' | 'communityEvents'> = {
    announcements: [],
    articles: [],
    others: [],
  }

  rootPageSSRData.announcements = posts.filter((x) => x.section === 'announcements')
  rootPageSSRData.articles = posts
    .filter((x) => x.showInPostListing)
    .sort((a, b) => new Date(b.publish).getTime() - new Date(a.publish).getTime())

  const includedSlugs = [...rootPageSSRData.announcements, ...rootPageSSRData.articles].map(
    (x) => x.slug,
  )

  rootPageSSRData.others = posts.filter((maybeNotIncluded) =>
    includedSlugs.includes(maybeNotIncluded.slug),
  )

  // Sort all by publish data
  const sortByPublishDate = (a: Post, b: Post) => b.publish.localeCompare(a.publish)
  for (const [key, value] of Object.entries(rootPageSSRData)) {
    rootPageSSRData[key as keyof typeof rootPageSSRData] = value.sort(sortByPublishDate)
  }

  const communityEvents = await retrieveCommunityEvents()

  const featuredPlaylistOverwrites = await retrieveAllCollectionDataOfType(
    'featured-playlist-overwrites',
  )
  const featuredPlaylistOverwriteMap = Object.fromEntries(
    featuredPlaylistOverwrites.map((x) => [x.attributes.id, x.attributes]),
  )

  return {
    ...rootPageSSRData,
    communityEvents: communityEvents,
    currentMapOfTheWeek,
    featuredPlaylistOverwriteMap,
  }
}
