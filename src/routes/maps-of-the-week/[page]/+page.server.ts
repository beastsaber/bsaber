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

    const mapsOfTheWeek = await getSortedMapsOfTheWeekNetlifyData();

    const pageCount = Math.ceil(mapsOfTheWeek.length / pageSize);

    const paginatedMapsOfTheWeek = mapsOfTheWeek.slice(startIndex, endIndex);

    const result = await Promise.all(paginatedMapsOfTheWeek.map(async (singleMapOfTheWeek) => {
        const beatLeaderLeaderBoardData = await fetch(
            `https://api.beatleader.xyz/leaderboard/${singleMapOfTheWeek.mapId}`,
        ).then((res) => res.json())

        return {
            map: {
                id: singleMapOfTheWeek.mapId,
                coverUrl: beatLeaderLeaderBoardData.song.fullCoverImage,
            },
            review: singleMapOfTheWeek.review,
            startDate: singleMapOfTheWeek.startDate,
        };
    }));

    return {mapsOfTheWeek: result, pageSize, pageCount, currentPage: pageNumber};
}