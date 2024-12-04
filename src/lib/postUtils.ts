import { postCategories } from '../maps'
import { postEventTypes } from '../maps'
import {
  faTrophy,
  faGraduationCap,
  faComments,
  faAward,
  faHeart,
  faTree,
} from '@fortawesome/free-solid-svg-icons'

// Define PostEventType
export type PostEventType = 'tournament' | 'learning' | 'social' | 'awards' | 'charity' | 'seasonal'

// FontAwesome icons for post types
export const FaIcons = {
  tournament: faTrophy,
  learning: faGraduationCap,
  social: faComments,
  awards: faAward,
  charity: faHeart,
  seasonal: faTree,
}

// Utility function to check PostEventType validity
export function isPostEventType(type: any): type is PostEventType {
  return ['tournament', 'learning', 'social', 'awards', 'charity', 'seasonal'].includes(type)
}

// Utility function to process posts
export function processPosts(posts: any[]) {
  return posts.map((post) => {
    const postEventType: PostEventType | undefined = isPostEventType(post.postEventType)
      ? post.postEventType
      : undefined
    const postTypeLabel = postEventType ? postEventTypes[postEventType] : ''
    const faIcon = postEventType ? FaIcons[postEventType] : null
    const categoryLabel = postCategories[post.category] || ''

    return {
      ...post,
      postTypeLabel,
      faIcon,
      categoryLabel,
    }
  })
}

// Utility function for background images
export function getBackgroundImage(image: string | undefined): string {
  return image ? `url(${image})` : 'none'
}
