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
  mapsOfTheWeek: Post[]
  others: Post[]
}

export type Playlist = {
  playlistId: number,
  name: string,
  description: string,
  playlistImage512: string,
  owner: Uploader
}

export type Beatmap = {
    id: number,
    name: string,
    description: string,
    uploader: Uploader,
    curator: Uploader | undefined,
    versions: BeatmapVersion[],
    tags: string[]
}

export type BeatmapVersion = {
    hash: string
    diffs: BeatmapDifficulty[]
}


export type BeatmapDifficulty = {
    characteristic: "Standard" | "OneSaber" | "NoArrows" | "90Degree" | "360Degree" | "Lightshow" | "Lawless" | "Legacy"
    difficulty: "Easy" | "Normal" | "Hard" | "Expert" | "ExpertPlus"
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
