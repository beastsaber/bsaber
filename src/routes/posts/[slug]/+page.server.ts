import { retrieveCollectionData } from '$lib/retrieveCollectionData'

type LoadParameter = {
  params: {
    slug: string
  }
  fetch: typeof fetch
}

export const load = ({ params }: LoadParameter) => retrieveCollectionData('posts', params.slug)
