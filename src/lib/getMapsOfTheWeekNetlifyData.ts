import type { ImportMapOfTheWeekModuleData, MapOfTheWeekCollectionData } from "../types"

export const getMapsOfTheWeekNetlifyData = () => {
    return Promise.all(
        Object.entries(
          import.meta.glob<ImportMapOfTheWeekModuleData>('/src/collections/map-of-the-week/*.md'),
        ).map(async ([_, module]) => {
          const { metadata } = await module()
          return { ...metadata, startDate: new Date(metadata.startDate) }
        }),
      )
}