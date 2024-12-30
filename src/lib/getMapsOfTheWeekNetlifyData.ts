import type { ImportMapOfTheWeekModuleData } from '../types'

/**
 * This function returns the maps of the week that are currently active and sorted by start date newest -> oldest.
 */
export const getSortedMapsOfTheWeekNetlifyData = async () => {
  const unsortedMapsOfTheWeeks = await Promise.all(
    Object.entries(
      import.meta.glob<ImportMapOfTheWeekModuleData>('/src/collections/map-of-the-week/*.md'),
    ).map(async ([_, module]) => {
      const { metadata } = await module()
      return { ...metadata, startDate: new Date(metadata.startDate) }
    }),
  )


  const mapsOfTheWeeksToShow = unsortedMapsOfTheWeeks
  .filter((motw) => motw.hide !== true)
  .filter(
    (motw) => motw.startDate.getTime() <= new Date().getTime() ,
  )

  return mapsOfTheWeeksToShow
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
    .reverse()
}
