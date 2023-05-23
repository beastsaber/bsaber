export type Post = {
  title: string
  section: string
  publish: string
  body: string
  slug: string
  homepageText?: string
  image?: string
  icon?: string
  category?: string
}

export type CommunityEvent = {
  title: string
  slug: string
  publishDateISO: string
  dateParams: EventDateParams
  hostUsername: string
  category: 'tournament' | 'social' | 'learning' | 'competition' | 'generic' // category determines icon
}

export type EventDateParams = {
  startDateUTC: string
  endDateUTC?: string
  startTimeUTC?: string
  endTimeUTC?: string
}

export type OrganizedPosts = {
  announcements: Post[]
  news: Post[]
  musicPacks: Post[]
  mapsOfTheWeek: Post[]
  others: Post[]
}

export type CardData = {
  slug: string
  image: string
  publish: string
  title?: string
  category?: string
}
