import { getSortedMapsOfTheWeekNetlifyData } from "$lib/getMapsOfTheWeekNetlifyData";
import type { MapOfTheWeek } from "../../../types";

const pageSize = 15;

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

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

    const paginatedFullMapsOfTheWeek = [];
    // Not Promise.all'ing since that will just get you rate limited from beatsaver
    for (const singleMapOfTheWeek of paginatedMapsOfTheWeek) {

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

        // BeatSaver allows 10 per second - there are two requests - to play it safe we wait 220ms (200ms + 20ms for good measure)
        // Not a perfect solution, but an easy one
        // Since the pages are pre-rendered it will not be slow in the final deployment - but take longer to build
        await sleep(220);

        paginatedFullMapsOfTheWeek.push({
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
        });
    }

    return { mapsOfTheWeek: paginatedFullMapsOfTheWeek, pageSize, pageCount, currentPage: pageNumber };
}