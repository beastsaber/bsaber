import type { CommunityEvent } from '../../../types'
import { paginateArray } from '$lib/paginateArray'
import { retrieveCommunityEvents } from '$lib/retrieveCommunityEvents'

const pageSize = 18

export type CommunityEventsPagePaginatedSSRData = {
  communityEvents: CommunityEvent[]
  pageSize: number
  pageCount: number
  currentPage: number
}

type LoadFunctionParameter = {
  params: {
    page: string
  }
  fetch: typeof fetch
}

export async function load({
  fetch,
  params,
}: LoadFunctionParameter): Promise<CommunityEventsPagePaginatedSSRData> {
  // Starts at 1
  const pageNumber = parseInt(params.page, 10)
  if (isNaN(pageNumber) || pageNumber < 1 || !isFinite(pageNumber)) {
    throw new Error('Invalid page number')
  }

  const communityEvents = await retrieveCommunityEvents()
  const { paginatedArray: paginatedCommunityEvents, pageCount } = paginateArray(
    communityEvents,
    pageSize,
    pageNumber,
  )

  return { communityEvents: paginatedCommunityEvents, pageSize, pageCount, currentPage: pageNumber }
}
