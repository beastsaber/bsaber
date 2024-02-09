import { getSortedMapsOfTheWeekNetlifyData } from "$lib/getMapsOfTheWeekNetlifyData";
import type { MapOfTheWeek } from "../../../types";

const pageSize = 10;

export type MapsOfTheWeekPagePaginatedSSRData = {
    mapsOfTheWeek: MapOfTheWeek[];
    pageSize: number;
    pageCount: number;
    currentPage: number;
}

type LoadFunctionParameter = {
    params: {
        page: string;
    },
    fetch: typeof fetch,
}

export async function load({ fetch, params }: LoadFunctionParameter): Promise<MapsOfTheWeekPagePaginatedSSRData> {
    // Starts at 1
    const pageNumber = parseInt(params.page, 10);
    if (isNaN(pageNumber) || pageNumber < 1 || !isFinite(pageNumber)) {
        throw new Error("Invalid page number");
    }

    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = pageNumber * pageSize;

    const allMapsOfTheWeekNetlifyData = await getSortedMapsOfTheWeekNetlifyData();

    const pageCount = Math.ceil(allMapsOfTheWeekNetlifyData.length / pageSize);

    const paginatedMapsOfTheWeek = allMapsOfTheWeekNetlifyData.slice(startIndex, endIndex);

    const paginatedFullMapsOfTheWeek = await Promise.all(paginatedMapsOfTheWeek.map(async (singleMapOfTheWeek) => {

        let coverUrl = singleMapOfTheWeek.coverUrlOverwrite;
        
        // Fetch BeatLeader URL if not given
        if(coverUrl == null) {
            const beatLeaderLeaderBoardData = await fetch(
                `https://api.beatleader.xyz/leaderboard/${singleMapOfTheWeek.mapId}`,
            ).then((res) => res.json());

            coverUrl = beatLeaderLeaderBoardData.song.fullCoverImage;
        }
        
        const beatSaverMapData = await fetch(
            `https://api.beatsaver.com/maps/id/${singleMapOfTheWeek.mapId}`,
        ).then((res) => res.json())
        const beatSaverMapUploaderData = await fetch(
            `https://api.beatsaver.com/users/id/${beatSaverMapData.uploader.id}`,
        ).then((res) => res.json())

        return {
            map: {
                id: singleMapOfTheWeek.mapId,
                name: beatSaverMapData.name,
                coverUrl: coverUrl,
                uploader: {
                    id: beatSaverMapData.uploader.id,
                    name: beatSaverMapData.uploader.name,
                    avatar: beatSaverMapData.uploader.avatar,
                    admin: beatSaverMapUploaderData.admin,
                    curator: beatSaverMapUploaderData.curator,
                    verifiedMapper: beatSaverMapUploaderData.verifiedMapper,
                },
            },
            review: singleMapOfTheWeek.review,
            startDate: singleMapOfTheWeek.startDate,
        }
    }));

    return { mapsOfTheWeek: paginatedFullMapsOfTheWeek, pageSize, pageCount, currentPage: pageNumber };
}