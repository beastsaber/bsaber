import { getSortedMapsOfTheWeekNetlifyData } from "$lib/getMapsOfTheWeekNetlifyData";

const pageSize = 10;

export type PartialMapOfTheWeek = {
    map: {
        id: string;
        coverUrl: string;
    }
    review: string;
    startDate: Date;
};

export type MapsOfTheWeekPagePaginatedSSRData = {
    mapsOfTheWeek: PartialMapOfTheWeek[];
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
    if (isNaN(pageNumber) || pageNumber < 1 || isFinite(pageNumber) === false) {
        throw new Error("Invalid page number");
    }

    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = pageNumber * pageSize;

    const mapsOfTheWeek = await getSortedMapsOfTheWeekNetlifyData();
    const paginatedMapsOfTheWeek = mapsOfTheWeek.slice(startIndex, endIndex);

    const result = [] as PartialMapOfTheWeek[];

    for (const singleMapOfTheWeek of paginatedMapsOfTheWeek) {
        const beatLeaderLeaderBoardData = await fetch(
            `https://api.beatleader.xyz/leaderboard/${singleMapOfTheWeek.mapId}`,
        ).then((res) => res.json())

        result.push({
            map: {
                id: singleMapOfTheWeek.mapId,
                coverUrl: beatLeaderLeaderBoardData.song.fullCoverImage,
            },
            review: singleMapOfTheWeek.review,
            startDate: singleMapOfTheWeek.startDate,
        });
    }

    return {mapsOfTheWeek: result};
}