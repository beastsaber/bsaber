import type {
  Post,
  MapOfTheWeek,
  CommunityEvent,
  ImportPostModuleData,
  ImportMapOfTheWeekModuleData,
} from '../types'
export type RootPageSSRData = {
  announcements: Post[]
  news: Post[]
  others: Post[]
  communityEvents: CommunityEvent[]
  currentMapOfTheWeek: MapOfTheWeek | undefined
}
export async function load({ fetch }): Promise<RootPageSSRData> {
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

  const now = new Date()

  let currentMapOfTheWeek: MapOfTheWeek | undefined = undefined
  try {
    const mapsOfTheWeek = await Promise.all(
      Object.entries(
        import.meta.glob<ImportMapOfTheWeekModuleData>('/src/collections/map-of-the-week/*.md'),
      ).map(async ([_, module]) => {
        const { metadata } = await module()
        return { ...metadata, startDate: new Date(metadata.startDate) }
      }),
    )

    const possibleCurrentMotws = mapsOfTheWeek.filter(
      (motw) => motw.startDate.getTime() <= now.getTime(),
    )
    possibleCurrentMotws.sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
    // Since it's sorted it's last
    const currentMOTWCollectionData = possibleCurrentMotws[possibleCurrentMotws.length - 1]

    const beatSaverMapData = await fetch(
      `https://api.beatsaver.com/maps/id/${currentMOTWCollectionData.mapId}`,
    ).then((res) => res.json())
    const beatSaverMapUploaderData = await fetch(
      `https://api.beatsaver.com/users/id/${beatSaverMapData.uploader.id}`,
    ).then((res) => res.json())
    const beatLeaderLeaderBoardData = await fetch(
      `https://api.beatleader.xyz/leaderboard/${beatSaverMapData.id}`,
    ).then((res) => res.json())

    currentMapOfTheWeek = {
      map: {
        id: beatSaverMapData.id,
        name: beatSaverMapData.name,
        coverUrl: beatLeaderLeaderBoardData.song.fullCoverImage,
        uploader: {
          id: beatSaverMapData.uploader.id,
          name: beatSaverMapData.uploader.name,
          avatar: beatSaverMapData.uploader.avatar,
          admin: beatSaverMapUploaderData.admin,
          curator: beatSaverMapUploaderData.curator,
          verifiedMapper: beatSaverMapUploaderData.verifiedMapper,
        },
      },
      review: currentMOTWCollectionData.review,
      startDate: currentMOTWCollectionData.startDate,
    }
  } catch (e) {
    console.error(`Could not find a suitable map of the week.`)
  }

  const rootPageSSRData: Omit<RootPageSSRData, 'currentMapOfTheWeek' | 'communityEvents'> = {
    announcements: [],
    news: [],
    others: [],
  }

  for (const post of posts) {
    const { section } = post
    switch (section) {
      case 'announcements':
        rootPageSSRData.announcements.push(post)
        break
      case 'news':
        rootPageSSRData.news.push(post)
        break
      default:
        rootPageSSRData.others.push(post)
        break
    }
  }

  // Sort all by publish data
  const sortByPublishDate = (a: Post, b: Post) => b.publish.localeCompare(a.publish)
  for (const [key, value] of Object.entries(rootPageSSRData)) {
    rootPageSSRData[key as keyof typeof rootPageSSRData] = value.sort(sortByPublishDate)
  }

  return {
    ...rootPageSSRData,
    communityEvents: [],
    currentMapOfTheWeek,
  }
}
