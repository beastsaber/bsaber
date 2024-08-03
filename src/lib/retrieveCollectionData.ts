import type { FeaturedPlaylistOverwriteCollectionData, ImportPersonModuleData } from './../types'
import { readFileSync, readdirSync } from 'fs'
import frontmatter from 'front-matter'
import { resolve } from 'path'
import type {
  Author,
  Community,
  CommunityEventCollectionData,
  CommunityEventHostCollectionData,
  CommunityLabel,
  MapOfTheWeekCollectionData,
  Post,
  PostWithAuthorAndContributor,
} from '../types'
import { beatSaverClientFactory } from './beatsaver-client'

export type ConvertToAttributeKeyedObject<T> = {
  body?: string
  attributes: Omit<T, 'body'>
}

type ConvertToAttributeKeyedObjectWithNoBody<T> = {
  body: undefined
  attributes: Omit<T, 'body'>
}

export type CollectionDataTypeMap = {
  'map-of-the-week': ConvertToAttributeKeyedObjectWithNoBody<MapOfTheWeekCollectionData>
  communities: ConvertToAttributeKeyedObjectWithNoBody<Community>
  'community-labels': ConvertToAttributeKeyedObjectWithNoBody<CommunityLabel>
  posts: ConvertToAttributeKeyedObject<Post>
  'community-events': ConvertToAttributeKeyedObject<CommunityEventCollectionData>
  'community-event-hosts': ConvertToAttributeKeyedObject<CommunityEventHostCollectionData>
  'featured-playlist-overwrites': ConvertToAttributeKeyedObjectWithNoBody<FeaturedPlaylistOverwriteCollectionData>
}
/**
 * Retrieve collection data from the markdown files. It will infer the type of the collection based on the collection parameter.
 * To add a new collection, add a new key to the CollectionDataTypeMap type and add a new case to the switch statement.
 *
 * @param collection The collection to retrieve data from {@see CollectionDataTypeMap}
 * @param filename The file to be retrieved. Can be with or without .md. A problematic case would be files that end with .md.md and similar cases.
 * @returns The information from the markdown file of the collection with the infered type. The part below the frontmatter will be returned with the key body.
 */
export const retrieveCollectionData = async <T extends keyof CollectionDataTypeMap>(
  collection: T,
  filename: string,
): Promise<CollectionDataTypeMap[T]> => {
  // Normalizing so both with and without .md can be accepted - only problematic with filenames that end with .md.md
  if (filename.endsWith('.md')) {
    filename = filename.slice(0, -3)
  }

  const markdown = readFileSync(resolve(`./src/collections/${collection}/${filename}.md`), {
    encoding: 'utf8',
  })

  const { attributes, body } = frontmatter(markdown)
  return {
    attributes,
    body,
  } as CollectionDataTypeMap[T]
}

export const retrieveAllCollectionDataOfType = async <T extends keyof CollectionDataTypeMap>(
  collectionType: T,
): Promise<CollectionDataTypeMap[T][]> => {
  const collectionFiles = readdirSync(resolve(`./src/collections/${collectionType}`))
  return Promise.all(
    collectionFiles.map(async (filename) => {
      return await retrieveCollectionData(collectionType, filename)
    }),
  )
}

export const retrievePostDataWithAuthorAndContributors = async (
  filename: string,
): Promise<ConvertToAttributeKeyedObject<PostWithAuthorAndContributor>> => {
  const { attributes, body } = await retrieveCollectionData('posts', filename)

  // Could potentially be moved outside this function to prevent constantly re-reading the files
  // However, might result in bugs in the dev setup when changing data
  const allPeople = await Promise.all(
    Object.entries(import.meta.glob<ImportPersonModuleData>('/src/collections/people/*.md')).map(
      async ([_, module]) => {
        const { metadata } = await module()
        return { ...metadata }
      },
    ),
  )

  const uploaderIds = [
    ...(attributes.authors ?? []),
    ...(attributes.credits?.flatMap((credit) => credit.contributors ?? []) ?? []),
  ].join(',')

  const allAuthorData = {} as Record<string, Author>
  if (uploaderIds.length > 0) {
    const beatsaverClient = beatSaverClientFactory.create()
    const intermediaryRelevantPeopleBeatSaverData = await beatsaverClient
      .fetch(`/users/ids/${uploaderIds}`)
      .then((x) => x.json())

    for (const beatSaverUser of intermediaryRelevantPeopleBeatSaverData) {
      const personFromMarkdown = allPeople.find((person) => person.beatsaverId == beatSaverUser.id)
      allAuthorData[beatSaverUser.id] = {
        id: beatSaverUser.id,
        name: beatSaverUser.name,
        avatar: beatSaverUser.avatar,
        admin: !!beatSaverUser.admin,
        curator: !!beatSaverUser.curator,
        verifiedMapper: !!beatSaverUser.verifiedMapper,
        socialLinks: personFromMarkdown?.socialLinks,
        bio: personFromMarkdown?.bio,
      } as Author
    }
  }

  const newAttributes = {
    ...attributes,
    authors: attributes.authors?.map((author: string) => allAuthorData[author]) ?? [],
    credits:
      attributes.credits?.map((credit) => ({
        ...credit,
        contributors:
          credit.contributors?.map((contributor: string) => allAuthorData[contributor]) ?? [],
      })) ?? [],
  }

  return {
    attributes: newAttributes,
    body,
  }
}
