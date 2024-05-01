import type { CommunityEvent } from '../types'

// Meaning upcoming or currently ongoing events
export const isCurrentEvent = (event: CommunityEvent) => {
  const nowTimestamp = new Date().getTime()
  let relevantUntilTimestamp = null

  // When an end time exists use that
  if (event.dateParams.endDateTimeUTC != null) {
    if (event.dateParams.useEndTime) {
      relevantUntilTimestamp = event.dateParams.endDateTimeUTC.getTime()
    } else {
      const utcStartOfDayOfEndDate = new Date(
        event.dateParams.endDateTimeUTC.getUTCFullYear(),
        event.dateParams.endDateTimeUTC.getUTCMonth(),
        event.dateParams.endDateTimeUTC.getUTCDate(),
      )
      // It's hard to tell when the day ends with all the timezone stuff so we'll just add 24 to the start of the day with UTC
      // the logic is to have it end with the theoretical "latest" timezone
      relevantUntilTimestamp = utcStartOfDayOfEndDate.getTime() + 24 * 60 * 60 * 1000
    }
  }

  if (!event.dateParams.endDateTimeUTC) {
    if (event.dateParams.useStartTime) {
      // If a time is set we'll assume it's a 12 hour event
      relevantUntilTimestamp = event.dateParams.startDateTimeUTC.getTime() + 12 * 60 * 60 * 1000
    } else {
      const utcStartOfDayOfStartDate = new Date(
        event.dateParams.startDateTimeUTC.getUTCFullYear(),
        event.dateParams.startDateTimeUTC.getUTCMonth(),
        event.dateParams.startDateTimeUTC.getUTCDate(),
      )
      // If no time is set we'll assume it's ends with the day. We use the "latest" timezone method again
      relevantUntilTimestamp = utcStartOfDayOfStartDate.getTime() + 24 * 60 * 60 * 1000
    }
  }

  if (relevantUntilTimestamp == null) {
    return false
  }

  return nowTimestamp <= relevantUntilTimestamp
}
