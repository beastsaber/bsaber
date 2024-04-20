import { readFileSync, readdirSync } from 'fs'
import frontmatter from 'front-matter'
import { resolve } from 'path'
import type {
  Community,
  CommunityEventCollectionData,
  CommunityEventHostCollectionData,
  CommunityLabel,
  MapOfTheWeekCollectionData,
  Post,
} from '../types'

type ConvertToAttributeKeyedObject<T> = {
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
