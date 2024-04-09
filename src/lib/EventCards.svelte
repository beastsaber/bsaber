<script lang="ts">
  import type { CommunityEvent } from '../types'
  import Fa from 'svelte-fa/src/fa.svelte'

  import { faMedal } from '@fortawesome/free-solid-svg-icons/faMedal'
  import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons/faCalendarCheck'
  import { faGraduationCap } from '@fortawesome/free-solid-svg-icons/faGraduationCap'
  import { faComments } from '@fortawesome/free-solid-svg-icons/faComments'

  export let events: CommunityEvent[]
  export let maxCards: number = 6 // max amount of cards to show, ideally divisble by 3
  const eventData = events.slice(0, Math.round(maxCards))

  const createSlug = (username: string) => {
    const lowercaseUsername = username.toLowerCase().trim()
    const slug = lowercaseUsername.replace(/\s+/g, '-')
    return slug
  }

  const createDateText = ({
    dateParams: { startDateUTC, endDateUTC, startTimeUTC, endTimeUTC },
  }: CommunityEvent): string => {
    const startDate = new Date(startDateUTC)
    const endDate = endDateUTC ? new Date(endDateUTC) : null
    const startTime = startTimeUTC ? new Date(`2000-01-01T${startTimeUTC}Z`) : null
    const endTime = endTimeUTC ? new Date(`2000-01-01T${endTimeUTC}Z`) : null

    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' }
    const startDateText = startDate.toLocaleDateString(undefined, options)
    const endDateText = endDate ? endDate.toLocaleDateString(undefined, options) : null
    const startTimeText = startTime
      ? startTime.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' })
      : null
    const endTimeText = endTime
      ? endTime.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' })
      : null

    let finalDateText = ''
    if (startDateText) {
      finalDateText = startDateText
      if (startTimeText) {
        finalDateText += ` | ${startTimeText} UTC`
      }
      if (endDateText) {
        finalDateText += ` - ${endDateText}`
        if (endTimeText) {
          finalDateText += ` | ${endTimeText} UTC`
        }
      }
    }
    return finalDateText
  }

  // process data to use correct type of icon for the community event
  const processedEventData = eventData.map((event) => {
    const { category } = event
    let faIcon, customIcon
    if (category === 'tournament') {
      customIcon = './player-icon.svg'
    } else if (category === 'competition') {
      faIcon = faMedal
    } else if (category === 'learning') {
      faIcon = faGraduationCap
    } else if (category === 'social') {
      faIcon = faComments
    } else {
      faIcon = faCalendarCheck
    }
    return {
      ...event,
      faIcon,
      customIcon,
    }
  })
</script>

<div class="cards">
  {#each processedEventData as event}
    <div class="card">
      <!-- href to be updated with path e.g. '/community-events/event.slug' -->
      <a class="title" href="#">
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
            Hosted by <a href="#">{event.hostUsername}</a>
          </span>
          <span class="date">{createDateText(event)}</span>
        </div>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  @import 'src/scss/variables';

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
    background-color: #333333;
    background-size: 100%;
    background-position: center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  .title {
    font-size: 1.125rem;
    font-weight: 700;
    line-height: 1.4375rem;
    margin-top: auto;
    color: white;
    font-weight: bold;
    z-index: 1;
  }

  .info-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
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

  .date {
    color: $color-muted-text;
  }

  .host a {
    color: $color-danger-red;
  }
</style>
