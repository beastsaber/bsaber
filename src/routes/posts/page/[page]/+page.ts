import { paginateArray } from '$lib/paginateArray'
import type { Post } from '../../../../types'

const pageSize = 10

type LoadParameter = {
  params: {
    page: string
  }
  fetch: typeof fetch
}

export type PostPagePaginatedSSRData = {
  posts: Post[]
  pageSize: number
  pageCount: number
  currentPage: number
}

export async function load({ params: { page } }: LoadParameter): Promise<PostPagePaginatedSSRData> {
  const pageNumber = parseInt(page, 10)

  const allPostData: Post[] = (
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

  const { paginatedArray: paginatedPosts, pageCount } = paginateArray(
    allPostData,
    pageSize,
    pageNumber,
  )

  return {
    posts: paginatedPosts,
    pageSize,
    pageCount,
    currentPage: pageNumber,
  }
}
