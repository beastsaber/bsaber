export type Post = {
  title: string
  section: string
  publish: string
  body: string
  slug: string
  homepageText?: string
  image?: string
}

export type OrganizedPosts = {
  announcements: Post[]
  news: Post[]
  musicPacks: Post[]
  communityEvents: Post[]
  mapsOfTheWeek: Post[]
  others: Post[]
}
