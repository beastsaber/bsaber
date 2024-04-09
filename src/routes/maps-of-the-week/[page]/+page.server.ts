import { getSortedMapsOfTheWeekNetlifyData } from '$lib/getMapsOfTheWeekNetlifyData'
import type { MapOfTheWeek } from '../../../types'
import { paginateArray } from '$lib/paginateArray'

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

export async function load({ fetch, params }: LoadFunctionParameter): Promise<MapsOfTheWeekPagePaginatedSSRData> {
    // Starts at 1
    const pageNumber = parseInt(params.page, 10);
    if (isNaN(pageNumber) || pageNumber < 1 || !isFinite(pageNumber)) {
        throw new Error("Invalid page number");
    }

    const allMapsOfTheWeekNetlifyData = await getSortedMapsOfTheWeekNetlifyData();
    const {
        paginatedArray: paginatedMapsOfTheWeek,
        pageCount,
    } = paginateArray(allMapsOfTheWeekNetlifyData, pageSize, pageNumber);

    const mapIds = paginatedMapsOfTheWeek.map((map) => map.mapId).join(",");
    // Data structure is an object with a key of the mapId and the value is the map data
    const allBeatSaverMapData = await fetch(`https://api.beatsaver.com/maps/ids/${mapIds}`).then(x => x.json());

    const paginatedFullMapsOfTheWeek = [];
    // Not Promise.all'ing since that will just get you rate limited from beatsaver
    for (const singleMapOfTheWeek of paginatedMapsOfTheWeek) {
        try {
            let coverUrl = singleMapOfTheWeek.coverUrlOverwrite;

            // Fetch BeatLeader URL if not given
            // If this is happens to frequently it will get rate limited
            if (coverUrl == null) {
                const beatLeaderLeaderBoardData = await fetch(
                  `https://api.beatleader.xyz/leaderboard/${singleMapOfTheWeek.mapId}`,
                ).then((res) => res.json());

                coverUrl = beatLeaderLeaderBoardData.song.fullCoverImage;
            }

            if (coverUrl == null) {
                throw new Error('No cover URL found!')
            }

            const beatSaverMapData = allBeatSaverMapData[singleMapOfTheWeek.mapId];

            paginatedFullMapsOfTheWeek.push({
                map: {
                    id: singleMapOfTheWeek.mapId,
                    name: beatSaverMapData.name,
                    coverUrl: coverUrl,
                    uploader: {
                        id: beatSaverMapData.uploader.id,
                        name: beatSaverMapData.uploader.name,
                        avatar: beatSaverMapData.uploader.avatar,
                        description: beatSaverMapData.uploader.description,
                        admin: beatSaverMapData.uploader.admin,
                        curator: beatSaverMapData.uploader.curator,
                        seniorCurator: beatSaverMapData.uploader.seniorCurator,
                        verifiedMapper: beatSaverMapData.uploader.verifiedMapper,
                    },
                    collaborators: beatSaverMapData.collaborators
                },
                review: singleMapOfTheWeek.review,
                startDate: singleMapOfTheWeek.startDate,
                showcase: singleMapOfTheWeek.showcase,
            });
        } catch (e) {
            console.error(`Something went wrong fetching info for map ${singleMapOfTheWeek.mapId}.`)
        }
    }

    return { mapsOfTheWeek: paginatedFullMapsOfTheWeek, pageSize, pageCount, currentPage: pageNumber };
}
