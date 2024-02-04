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
  others: Post[]
}

export type MapOfTheWeekCollectionData = {
  mapId: string;
  nominatorId: string;
  remark: string;
  remarkAuthorId: string;
  year: number;
  week: number;
}

export type MapOfTheWeek = {
  map: {
    id: string;
    name: string;
    coverUrl: string;
    uploader: BeatSaverUser;
  },
  remark: string;
  nominator: BeatSaverUser;
  remarkAuthor: BeatSaverUser;
  year: number;
  week: number;
}

export type BeatSaverUser = {
  id: string;
  name: string;
  avatarUrl: string;
  verifiedMapper: boolean;
}

export type Playlist = {
  playlistId: number,
  name: string,
  description: string,
  playlistImage512: string,
  owner: Uploader
}

export type Uploader = {
  id: number,
  name: string,
  avatar: string,
  admin: boolean,
  curator: boolean,
  verifiedMapper: boolean
}

export type CardData = {
  slug: string
  image: string
  publish: string
  title?: string
  category?: string
}
