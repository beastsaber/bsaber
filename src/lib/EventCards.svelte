<script lang="ts">
  import type { CommunityEvent } from '../types'
  import Fa from 'svelte-fa/src/fa.svelte'

  import { faTrophy } from '@fortawesome/free-solid-svg-icons'
  import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons/faCalendarCheck'
  import { faGraduationCap } from '@fortawesome/free-solid-svg-icons/faGraduationCap'
  import { faComments } from '@fortawesome/free-solid-svg-icons/faComments'
  import { faAward } from '@fortawesome/free-solid-svg-icons'
  import { faHeart } from '@fortawesome/free-solid-svg-icons'
  import { isCurrentEvent } from './isCurrentEvent'

  export let events: CommunityEvent[]
  export let maxCards: number = 6 // max amount of cards to show, ideally divisble by 3
  export let keyPrefix: string = ''
  const eventData = events.slice(0, Math.round(maxCards))

  const timeFormatOptions: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }

  const createStartDateTimeText = ({
    dateParams: { startDateTimeUTC, endDateTimeUTC, useStartTime, useEndTime },
  }: CommunityEvent): string => {
    const startDateText = useStartTime
      ? startDateTimeUTC.toLocaleDateString('en-US', timeFormatOptions)
      : new Intl.DateTimeFormat('en-US', timeFormatOptions).format(startDateTimeUTC)
    const startTimeText = useStartTime
      ? startDateTimeUTC.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' })
      : null

    let finalStartDateTimeText = startDateText
    if (startTimeText) {
      finalStartDateTimeText += ` | ${startTimeText}`
    }

    return finalStartDateTimeText
  }

  const createEndDateTimeText = ({
    dateParams: { endDateTimeUTC, useEndTime },
  }: CommunityEvent): string | null => {
    const endDateText = endDateTimeUTC
      ? endDateTimeUTC.toLocaleDateString('en-US', timeFormatOptions)
      : null
    const endTimeText =
      useEndTime && endDateTimeUTC
        ? endDateTimeUTC.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' })
        : null

    let finalEndDateTimeText = ''
    if (endDateText) {
      finalEndDateTimeText += `${endDateText}`
      if (endTimeText) {
        finalEndDateTimeText += ` | ${endTimeText}`
      }
    } else {
      return null
    }

    return finalEndDateTimeText
  }

  // process data to use correct type of icon for the community event
  const processedEventData = eventData.map((event) => {
    const { category } = event
    let faIcon, customIcon
    if (category === 'tournament') {
      faIcon = faTrophy
    } else if (category === 'learning') {
      faIcon = faGraduationCap
    } else if (category === 'social') {
      faIcon = faComments
    } else if (category === 'awards') {
      faIcon = faAward
    } else if (category === 'charity') {
      faIcon = faHeart
    } else {
      faIcon = faCalendarCheck
    }

    return {
      ...event,
      faIcon,
      customIcon,
      isCurrent: isCurrentEvent(event),
      startDateText: createStartDateTimeText(event),
      endDateText: createEndDateTimeText(event),
    }
  })
</script>

{#if processedEventData.length > 0}
  <div class="cards">
    {#each processedEventData as event, index (keyPrefix + '-' + index)}
      <div
        class="card"
        class:current={event.isCurrent}
        class:passed={!event.isCurrent}
        id={keyPrefix + '-' + index}
      >
        <!-- href to be updated with path e.g. '/community-events/event.slug' -->
        <a class="title" href={event.url} rel="external">
          {event.title ?? ''}
        </a>
        <div class="info-container">
          <div class="icon-circle">
            {#if event.faIcon}
              <Fa style="height: 25px; width: 25px;" fw icon={event.faIcon} />
            {:else if event.customIcon}
              <img class="icon" src={event.customIcon} alt="" />
            {/if}
          </div>
          <div class="text-container">
            <!-- host href should be updated with future route, e.g. {`/members/createSlug(event.hostUsername)`}-->
            <span class="host">
              Hosted by <a href={event.host.url}>{event.host.name}</a>
            </span>
            {#if event.endDateText && event.dateParams.useStartTime && event.dateParams.useEndTime}
              <div class="date-first-row" title={Intl.DateTimeFormat().resolvedOptions().timeZone}>
                {event.startDateText}
              </div>
              <div class="date-second-row" title={Intl.DateTimeFormat().resolvedOptions().timeZone}>
                - {event.endDateText}
              </div>
            {:else}
              <div class="date-first-row" title={Intl.DateTimeFormat().resolvedOptions().timeZone}>
                {event.startDateText}
                {#if event.endDateText}
                  - {event.endDateText}
                {/if}
              </div>
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </div>
{:else}
  <div class="no-events">No Upcoming Events Scheduled</div>
{/if}

<style lang="scss">
  @import 'src/scss/variables';

  .no-events {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.25rem;
    color: $color-muted-text;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    width: 100%;
    gap: 1.25rem;

    @media (min-width: 560px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1200px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    font-family: $font-dm-sans;
    padding: 0.75rem;
    gap: 5px;
    border-radius: $rounding-large;
    background-size: 100%;
    background-position: center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: #333333;

    &.passed {
      filter: brightness(0.6);
    }
  }

  .title {
    font-size: 1.125rem;
    font-weight: 700;
    line-height: 1.4375rem;
    margin-top: auto;
    color: white;
    font-weight: bold;
    z-index: 1;
    max-width: fit-content;
  }

  .info-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin-top: auto;
    margin-bottom: auto;
  }

  .icon-circle {
    width: 39px;
    height: 39px;
    border-radius: 50%;
    flex-shrink: 0;
    background: #d9d9d9;
    color: #333333;
    display: flex;
    align-items: center;
    justify-content: center;
    > img.icon {
      height: 25px;
      width: 25px;
    }
  }

  .text-container {
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    line-height: 1.5625rem;
  }

  .date-first-row,
  .date-second-row {
    color: $color-muted-text;
  }

  .date-second-row {
    margin-top: -0.4rem;
  }

  .host a {
    color: $color-danger-red;
  }
</style>
