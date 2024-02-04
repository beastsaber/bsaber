import { DayOfWeek, getWeekOfYear } from '$lib/getWeekOfYear'
import type { Post, OrganizedPosts, MapOfTheWeek } from '../types'
export async function load() {
  const posts: Post[] = await Promise.all(
    Object.entries(import.meta.glob('/src/collections/posts/**/*.md')).map(
      async ([path, module]) => {
        const { metadata } = await module()
        const slug = path.split('/').reverse()[0].split('.')[0]
        const { image } = metadata
        return { slug, ...metadata, image: image?.replace('/static', '') }
      },
    ),
  )

  const now = new Date();
  const year = now.getFullYear();
  const week = getWeekOfYear(now, DayOfWeek.Monday);
  const pathToCurrentMapOfTheWeek = `/src/collections/map-of-the-week/${year}-${week}.md`;
  
  let motwData: MapOfTheWeek | undefined = undefined;
  try {
    const {metadata: motwCollectionData} = await import(pathToCurrentMapOfTheWeek);
    const beatSaverMapData = await fetch(`https://api.beatsaver.com/maps/id/${motwCollectionData.mapId}`).then(res => res.json());
    const beatSaverMapUploaderData = await fetch(`https://api.beatsaver.com/users/id/${beatSaverMapData.uploader.id}`).then(res => res.json());
    const beatLeaderLeaderBoardData = await fetch(`https://api.beatleader.xyz/leaderboard/${beatSaverMapData.id}`).then(res => res.json());
    const fullResolutionImageUrl = beatLeaderLeaderBoardData.song.fullCoverImage;
    const beatSaverNominatorData = await fetch(`https://api.beatsaver.com/users/id/${motwCollectionData.nominatorId}`).then(res => res.json());
    const beatSaverRemarkerAuthorData = await fetch(`https://api.beatsaver.com/users/id/${motwCollectionData.remarkAuthorId}`).then(res => res.json());
    
    motwData = {
      map: {
        id: beatSaverMapData.id,
        name: beatSaverMapData.name,
        coverUrl: fullResolutionImageUrl,
        uploader: {
          id: beatSaverMapData.uploader.id,
          name: beatSaverMapData.uploader.name,
          avatarUrl: beatSaverMapData.uploader.avatar,
          verifiedMapper: beatSaverMapUploaderData.verifiedMapper,
        },
      },
      remark: motwCollectionData.remark,
      nominator: {
        id: beatSaverNominatorData.id,
        name: beatSaverNominatorData.name,
        avatarUrl: beatSaverNominatorData.avatar,
        verifiedMapper: beatSaverNominatorData.verifiedMapper,
      },
      remarkAuthor: {
        id: beatSaverRemarkerAuthorData.id,
        name: beatSaverRemarkerAuthorData.name,
        avatarUrl: beatSaverRemarkerAuthorData.avatar,
        verifiedMapper: beatSaverRemarkerAuthorData.verifiedMapper,
      },
      year: motwCollectionData.year,
      week: motwCollectionData.week,
    };

  } catch (e) {
    console.error(`Could not find map of the week for ${year} week ${week}`);
  }

  const organizedPosts: OrganizedPosts = {
    announcements: [],
    news: [],
    communityEvents: [],
    others: [],
  }

  for (const post of posts) {
    const { section } = post
    switch (section) {
      case 'announcements':
        organizedPosts.announcements.push(post)
        break
      case 'news':
        organizedPosts.news.push(post)
        break
      case 'community-events':
        organizedPosts.communityEvents.push(post)
        break
      case 'maps-of-the-week':
        organizedPosts.mapsOfTheWeek.push(post)
        break
      default:
        organizedPosts.others.push(post)
        break
    }
  }

  // Sort all by publish data
  const sortByPublishDate = (a: Post, b: Post) => b.publish.localeCompare(a.publish)
  for (const [key, value] of Object.entries(organizedPosts)) {
    organizedPosts[key as keyof OrganizedPosts] = value.sort(sortByPublishDate)
  }

  return {currentMapOfTheWeek: motwData, ...organizedPosts}
}
