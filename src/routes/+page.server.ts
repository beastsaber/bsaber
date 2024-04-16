import { getSortedMapsOfTheWeekNetlifyData } from '$lib/getMapsOfTheWeekNetlifyData'
import type {
  Post,
  MapOfTheWeek,
  CommunityEvent,
  ImportPostModuleData,
  ImportMapOfTheWeekModuleData,
  EventDateParams,
} from '../types'
import { retrieveAllCollectionDataOfType } from '$lib/retrieveCollectionData'
import dayjs from 'dayjs'

export type RootPageSSRData = {
  announcements: Post[]
  articles: Post[]
  others: Post[]
  communityEvents: CommunityEvent[]
  currentMapOfTheWeek: MapOfTheWeek | undefined
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

    const beatSaverMapData = await fetch(
      `https://api.beatsaver.com/maps/id/${currentMOTWCollectionData.mapId}`,
    ).then((res) => res.json())

    let coverUrl = currentMOTWCollectionData.coverUrlOverwrite
    if (coverUrl == null) {
      const beatLeaderLeaderBoardData = await fetch(
        `https://api.beatleader.xyz/leaderboard/${beatSaverMapData.id}`,
      ).then((res) => res.json())
      coverUrl = beatLeaderLeaderBoardData.song.fullCoverImage
    }

    if (coverUrl == null) {
      throw new Error('No cover URL found!')
    }

    currentMapOfTheWeek = {
      map: {
        id: beatSaverMapData.id,
        name: beatSaverMapData.name,
        coverUrl: coverUrl,
        uploader: {
          id: beatSaverMapData.uploader.id,
          name: beatSaverMapData.uploader.name,
          avatar: beatSaverMapData.uploader.avatar,
          description: beatSaverMapData.uploader.description,
          admin: beatSaverMapData.uploader.admin,
          curator: beatSaverMapData.uploader.curator,
          seniorCurator: beatSaverMapData.uploader.seniorCurator,
          verifiedMapper: beatSaverMapData.uploader.verifiedMapper,
        },
        collaborators: beatSaverMapData.collaborators,
      },
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

  const eventCollectionData = await retrieveAllCollectionDataOfType('events')
  const eventHostCollectionData = await retrieveAllCollectionDataOfType('event-hosts')
  const communityEvents = []
  for (const singleEvent of eventCollectionData) {
    const startDateTime = new Date(singleEvent.attributes.startDateTime)
    const endDateTime = singleEvent.attributes.endDateTime
      ? new Date(singleEvent.attributes.endDateTime)
      : undefined
    const dateParams: EventDateParams = {
      startDateUTC: dayjs(startDateTime).format('YYYY-MM-DD'),
    }
    if (singleEvent.attributes.ignoreStartTime !== true) {
      dateParams.startTimeUTC = dayjs(startDateTime).format('HH:mm:ss')
    }
    if (endDateTime != null) {
      dateParams.endDateUTC = dayjs(endDateTime).format('YYYY-MM-DD')
      if (singleEvent.attributes.ignoreEndTime !== true) {
        dateParams.endTimeUTC = dayjs(endDateTime).format('HH:mm:ss')
      }
    }
    const host = eventHostCollectionData.find(
      (singleEventHost) => singleEventHost.attributes.name === singleEvent.attributes.host,
    )
    if (host == null) {
      throw new Error('Host not found')
    }

    communityEvents.push({
      title: singleEvent.attributes.title,
      url: singleEvent.attributes.url,
      dateParams: dateParams,
      host: host.attributes,
      category: singleEvent.attributes.category,
    })
  }
  return {
    ...rootPageSSRData,
    communityEvents: communityEvents,
    currentMapOfTheWeek,
  }
}
