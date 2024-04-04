import type { Post } from '../../types'

export type ContactUsPageSSRData = {
  posts: Post[]
}

export async function load(): Promise<ContactUsPageSSRData> {
  const posts: Post[] = (
    await Promise.all(
      Object.entries(import.meta.glob('/src/collections/posts/*.md')).map(
        async ([path, module]) => {
          const { metadata } = await module()
          const slug = path.split('/').reverse()[0].split('.')[0]
          const { image } = metadata
          return {
            slug,
            ...metadata,
            image: image?.replace('/static', ''),
            publishDate: Date.parse(metadata.publish),
          }
        },
      ),
    )
  )
    .filter((x) => x.showInPostListing)
    .sort((a, b) => b.publishDate - a.publishDate)

  return {
    posts,
  }
}
