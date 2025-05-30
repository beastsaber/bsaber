import { getSortedMapsOfTheWeekNetlifyData } from '$lib/getMapsOfTheWeekNetlifyData'
import type { MapOfTheWeek } from '../../../types'
import { paginateArray } from '$lib/paginateArray'
import { beatSaverClientFactory } from '$lib/beatsaver-client'

const pageSize = 15

if (pageSize > 50) {
  throw new Error(
    'Page sizes above 50 are not supported. You need to adjust the beatsaver call to accomodate that.',
  )
}

export type MapsOfTheWeekPagePaginatedSSRData = {
  mapsOfTheWeek: MapOfTheWeek[]
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
}: LoadFunctionParameter): Promise<MapsOfTheWeekPagePaginatedSSRData> {
  // Starts at 1
  const pageNumber = parseInt(params.page, 10)
  if (isNaN(pageNumber) || pageNumber < 1 || !isFinite(pageNumber)) {
    throw new Error('Invalid page number')
  }

  const allMapsOfTheWeekNetlifyData = await getSortedMapsOfTheWeekNetlifyData()
  const { paginatedArray: paginatedMapsOfTheWeek, pageCount } = paginateArray(
    allMapsOfTheWeekNetlifyData,
    pageSize,
    pageNumber,
  )

  const beatSaverClient = beatSaverClientFactory.create(fetch)
  const mapIds = paginatedMapsOfTheWeek.map((map) => map.mapId).join(',')
  // Data structure is an object with a key of the mapId and the value is the map data
  const allBeatSaverMapData = await beatSaverClient
    .fetch(`/maps/ids/${mapIds}`)
    .then((x) => x.json())

  const paginatedFullMapsOfTheWeek = []
  for (const singleMapOfTheWeek of paginatedMapsOfTheWeek) {
    try {
      const coverUrl =
        singleMapOfTheWeek.coverUrlOverwrite ??
        `https://cdn.assets.beatleader.xyz/songcover-${singleMapOfTheWeek.mapId}-full.webp`

      const beatSaverMapData = allBeatSaverMapData[singleMapOfTheWeek.mapId]
      if (beatSaverMapData == null) {
        console.warn(
          `Map of the Week with the id ${singleMapOfTheWeek.mapId} does not seem to exist - skipping.`,
        )
        continue
      }

      paginatedFullMapsOfTheWeek.push({
        map: beatSaverMapData,
        coverUrl: coverUrl,
        review: singleMapOfTheWeek.review,
        startDate: singleMapOfTheWeek.startDate,
        showcase: singleMapOfTheWeek.showcase,
      })
    } catch {
      console.error(`Something went wrong fetching info for map ${singleMapOfTheWeek.mapId}.`)
    }
  }

  return { mapsOfTheWeek: paginatedFullMapsOfTheWeek, pageSize, pageCount, currentPage: pageNumber }
}
