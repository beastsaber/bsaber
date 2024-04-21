import type { CommunityEvent, EventDateParams } from '../types'
import { retrieveAllCollectionDataOfType } from '$lib/retrieveCollectionData'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export const retrieveCommunityEvents = async (): Promise<CommunityEvent[]> => {
  const eventCollectionData = await retrieveAllCollectionDataOfType('community-events')
  const eventHostCollectionData = await retrieveAllCollectionDataOfType('community-event-hosts')
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
      startDateUTC: dayjs(startDateTime).utc().format('YYYY-MM-DD'),
    }
    if (singleEvent.attributes.useStartTime) {
      dateParams.startTimeUTC = dayjs(startDateTime).utc().format('HH:mm:ss')
    }
    if (endDateTime != null) {
      dateParams.endDateUTC = dayjs(endDateTime).utc().format('YYYY-MM-DD')
      if (singleEvent.attributes.useEndTime) {
        dateParams.endTimeUTC = dayjs(endDateTime).utc().format('HH:mm:ss')
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
