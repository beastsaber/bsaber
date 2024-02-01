import type { Post, OrganizedPosts } from '../types'
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

  const organizedPosts: OrganizedPosts = {
    announcements: [],
    news: [],
    communityEvents: [],
    mapsOfTheWeek: [],
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

  return organizedPosts
}
