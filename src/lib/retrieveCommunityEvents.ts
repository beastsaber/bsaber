import { retrieveAllCollectionDataOfType } from '$lib/retrieveCollectionData'
import type { CommunityEvent, EventDateParams } from '../types'
import dayjs from 'dayjs'

export const retrieveCommunityEvents = async (): Promise<CommunityEvent[]> => {
  const eventCollectionData = await retrieveAllCollectionDataOfType('events')
  const eventHostCollectionData = await retrieveAllCollectionDataOfType('event-hosts')
  const communityEvents = []
  eventCollectionData.sort(
    (a, b) =>
      new Date(b.attributes.startDateTime).getTime() -
      new Date(a.attributes.startDateTime).getTime(),
  )
  for (const singleEvent of eventCollectionData) {
    const startDateTime = new Date(singleEvent.attributes.startDateTime)
    const endDateTime = singleEvent.attributes.endDateTime
      ? new Date(singleEvent.attributes.endDateTime)
      : undefined
    const dateParams: EventDateParams = {
      startDateUTC: dayjs(startDateTime).format('YYYY-MM-DD'),
    }
    if (singleEvent.attributes.ignoreStartTime !== true) {
      dateParams.startTimeUTC = dayjs(startDateTime).format('HH:mm:ss')
    }
    if (endDateTime != null) {
      dateParams.endDateUTC = dayjs(endDateTime).format('YYYY-MM-DD')
      if (singleEvent.attributes.ignoreEndTime !== true) {
        dateParams.endTimeUTC = dayjs(endDateTime).format('HH:mm:ss')
      }
    }
    const host = eventHostCollectionData.find(
      (singleEventHost) => singleEventHost.attributes.name === singleEvent.attributes.host,
    )
    if (host == null) {
      throw new Error('Host not found')
    }

    communityEvents.push({
      title: singleEvent.attributes.title,
      url: singleEvent.attributes.url,
      dateParams: dateParams,
      host: host.attributes,
      category: singleEvent.attributes.category,
    })
  }
  return communityEvents
}
