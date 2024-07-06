import type { iconMapping } from '$lib/iconMapping'

export type Post = {
  title: string
  section: 'announcements' | 'articles' | 'speciality'
  publish: string
  lastUpdated?: string
  body: string
  slug: string
  homepageText?: string
  image?: string
  icon?: string
  category: '' | 'announcement' | 'news' | 'articles' | 'interview' | 'event'
  showInPostListing: boolean
  linkToSpecialtyPage?: string
  authors: string[]
  credits: { contributors: string[]; contribution?: string }[]
}

export type Person = {
  name: string
  beatsaverId: string
  bio?: string
  socialLinks: {
    platform: keyof typeof iconMapping
    id: string
  }[]
}

export interface Author extends Uploader {
  bio: Person['bio']
  socialLinks: Person['socialLinks']
}

export type PostWithAuthorAndContributor = Omit<Post, 'authors' | 'credits'> & {
  authors: Author[]
  credits: { contributors: Uploader[]; contribution?: string }[]
}

export type CommunityEventCategory = 'tournament' | 'social' | 'learning' | 'awards' | 'generic'

export type CommunityEventCollectionData = {
  title: string
  url: string
  category: CommunityEventCategory
  startDateTime: string
  useStartTime: boolean
  endDateTime?: string
  useEndTime: boolean
  host: string
}

export type CommunityEventHostCollectionData = {
  name: string
  url: string
}

export type CommunityEventHost = CommunityEventHostCollectionData

export type CommunityEvent = {
  title: string
  url: string
  dateParams: EventDateParams
  host: CommunityEventHost
  category: CommunityEventCategory
}

export type EventDateParams = {
  startDateTimeUTC: Date
  endDateTimeUTC?: Date
  useStartTime: boolean
  useEndTime: boolean
}

export type MapOfTheWeekCollectionData = {
  mapId: string
  review: string
  startDate: string
  showcase?: {
    id?: string
    type?: 'youtube-short' | 'youtube-video'
  }
  coverUrlOverwrite?: string
}

export type FeaturedPlaylistOverwriteCollectionData = {
  id: string
  linkOverwrite?: string
}

export type MapOfTheWeek = {
  map: Beatmap
  coverUrl: string
  review: string
  showcase: MapOfTheWeekCollectionData['showcase']
  startDate: Date
}

export type Playlist = {
  playlistId: number
  name: string
  description: string
  playlistImage: string
  playlistImage512: string
  owner: Uploader
}

export type Beatmap = {
  id: string
  name: string
  description: string
  uploader: Uploader
  curator: Uploader | undefined
  versions: BeatmapVersion[]
  tags: string[] | undefined
  collaborators: Uploader[]
}

export type BeatmapVersion = {
  hash: string
  diffs: BeatmapDifficulty[]
  downloadURL: string
  coverURL: string
  previewURL: string
}

export type BeatmapDifficulty = {
  characteristic:
    | 'Standard'
    | 'OneSaber'
    | 'NoArrows'
    | '90Degree'
    | '360Degree'
    | 'Lightshow'
    | 'Lawless'
    | 'Legacy'
  difficulty: 'Easy' | 'Normal' | 'Hard' | 'Expert' | 'ExpertPlus'
  nps: number
}

export type Uploader = {
  id: number
  name: string
  description: string
  avatar: string
  admin: boolean
  curator: boolean
  seniorCurator: boolean
  verifiedMapper: boolean
}

export type CardData = {
  slug: string
  image: string
  publish: string
  title?: string
  category?: string
}

type ImportModuleData<T> = {
  metadata: T
}

export type ImportPostModuleData = ImportModuleData<Omit<Post, 'slug'>>

export type ImportMapOfTheWeekModuleData = ImportModuleData<MapOfTheWeekCollectionData>

export type ImportPersonModuleData = ImportModuleData<Person>

export type CommunityLabel = {
  label: string
  description: string
  color: string
}

export type SocialMediaTypes =
  | 'Discord'
  | 'Twitter/X'
  | 'Facebook'
  | 'Instagram'
  | 'Twitch'
  | 'YouTube'
  | 'Reddit'
  | 'GitHub'
  | 'Website'
  | 'Documentation'

export type Social = {
  name: SocialMediaTypes
  url: string
  titleOverwrite?: string
}

export type LanguageKeys =
  | 'en'
  | 'de'
  | 'fr'
  | 'es'
  | 'it'
  | 'ja'
  | 'ko'
  | 'nl'
  | 'pl'
  | 'pt'
  | 'ru'
  | 'zh'
  | 'sv'
  | 'no'
  | 'da'
  | 'fi'
  | 'hu'
  | 'cs'
  | 'tr'
  | 'th'
  | 'ar'
  | 'he'
  | 'el'
  | 'id'
  | 'vi'
  | 'ro'
  | 'bg'
  | 'uk'
  | 'ms'
  | 'hr'
  | 'sk'
  | 'sl'
  | 'et'
  | 'lv'
  | 'lt'
  | 'sr'
  | 'tl'
  | 'is'
  | 'ga'
  | 'sq'
  | 'bs'
  | 'mk'
  | 'mt'
  | 'cy'
  | 'be'
export type Community = {
  name: string
  description: string
  image?: string
  circleFrameImage: boolean
  activityLevel: 'high' | 'medium' | 'low'
  labels: string[]
  socials: Social[]
  language: LanguageKeys[]
}
